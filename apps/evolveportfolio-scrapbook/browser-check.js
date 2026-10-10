// Run against the published Pages preview: chrome-devtools-axi run < browser-check.js
await page.open('https://spockey4711.github.io/ui-scrapbook/previews/evolveportfolio-scrapbook/');
await page.wait('app-hero');
const report = await page.eval(async () => {
  const report = { layouts: [], interactions: [], errors: [] };
  const base = new URL(document.querySelector('base').href);
  const previous = document.cookie
    .split(';')
    .find((x) => x.trim().startsWith('evolve_notice_seen='))
    ?.trim();
  const expect = (ok, message) => {
    if (!ok) throw new Error(message);
  };
  const settle = (w) =>
    new Promise((resolve) => w.requestAnimationFrame(() => w.requestAnimationFrame(resolve)));
  async function load(path, width) {
    const frame = document.createElement('iframe');
    frame.style.cssText = `position:fixed;left:0;top:0;width:${width}px;height:1000px;border:0;z-index:100;`;
    frame.src = base.href + '#' + path;
    const loaded = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Frame load timed out: ' + path)), 20000);
      frame.onload = () => {
        const d = frame.contentDocument;
        const ready = () => {
          if (!d.querySelector('main h1')) return false;
          clearTimeout(timer);
          observer.disconnect();
          resolve(frame);
          return true;
        };
        const observer = new MutationObserver(ready);
        observer.observe(d, { childList: true, subtree: true });
        ready();
      };
    });
    document.body.append(frame);
    try {
      await loaded;
      await frame.contentDocument.fonts.ready;
      await settle(frame.contentWindow);
      return frame;
    } catch (error) {
      frame.remove();
      throw error;
    }
  }
  try {
    document.cookie = 'evolve_notice_seen=1; Path=/; SameSite=Lax';
    for (const width of [320, 375, 768, 1024, 1600]) {
      for (const path of [
        '/',
        '/team',
        '/contact',
        '/dashboard',
        '/design',
        '/privacy',
        '/missing-page',
      ]) {
        const frame = await load(path, width);
        try {
          const d = frame.contentDocument;
          expect(
            d.documentElement.scrollWidth <= width + 1,
            `${path} overflows at ${width}: ${d.documentElement.scrollWidth}`,
          );
          expect(d.querySelectorAll('main h1').length === 1, `${path}: one h1`);
          expect(d.querySelectorAll('nav a').length === 4, `${path}: navigation`);
          expect(
            [...d.images].every((i) => i.complete && i.naturalWidth > 0),
            `${path}: broken image`,
          );
          expect(
            [...d.querySelectorAll('button')].every(
              (b) => b.textContent.trim() || b.getAttribute('aria-label'),
            ),
            `${path}: unnamed button`,
          );
          for (const a of d.querySelectorAll('nav a')) {
            const r = a.getBoundingClientRect();
            expect(
              r.left >= 0 && r.right <= width + 1 && r.height >= 44,
              `${path}: navigation target at ${width}`,
            );
          }
          report.layouts.push(`${width} ${path}`);
        } catch (e) {
          report.errors.push(e.message);
        } finally {
          frame.remove();
        }
      }
    }
    for (const path of ['/', '/team', '/dashboard', '/privacy']) {
      const frame = await load(path, 375),
        d = frame.contentDocument,
        w = frame.contentWindow;
      try {
        if (path === '/') {
          const card = d.querySelector('app-scrapbook-polaroid button');
          card.focus();
          card.click();
          await settle(w);
          expect(card.getAttribute('aria-pressed') === 'true', 'Polaroid back');
          expect(card.textContent.includes('freigegebene Fotos'), 'Polaroid placeholder note');
          card.click();
          await settle(w);
          expect(card.getAttribute('aria-pressed') === 'false', 'Polaroid front');
          const discover = d.querySelector('.hero-bottom a');
          discover.click();
          await settle(w);
          expect(d.querySelector('app-hero'), 'Discover anchor stays on home');
          expect(w.location.hash.endsWith('#team-preview'), 'Discover fragment preserved');
          const nav = d.querySelector('nav a[href$="#/team"]');
          nav.click();
          await settle(w);
          expect(d.querySelector('app-team-page'), 'Angular route navigation');
          report.interactions.push('polaroid toggle, route navigation');
        } else if (path === '/team') {
          const button = d.querySelector('.profile-toggle');
          button.click();
          await settle(w);
          expect(button.getAttribute('aria-expanded') === 'true', 'Personal note expanded');
          expect(!d.getElementById(button.getAttribute('aria-controls')).hidden, 'Note visible');
          button.click();
          await settle(w);
          expect(button.getAttribute('aria-expanded') === 'false', 'Personal note collapsed');
          report.interactions.push('personal note expand/collapse');
        } else if (path === '/dashboard') {
          const selects = d.querySelectorAll('.dashboard-toolbar select');
          const metric = () => d.querySelector('.metric-value').textContent.trim();
          const initialMetric = metric();
          selects[1].value = '7';
          selects[1].dispatchEvent(new w.Event('change', { bubbles: true }));
          await settle(w);
          expect(metric() === initialMetric, 'Period must not change current open issues');
          selects[0].selectedIndex = 1;
          selects[0].dispatchEvent(new w.Event('change', { bubbles: true }));
          await settle(w);
          expect(metric() !== initialMetric, 'Project filter changes issue total');
          const state = d.querySelector('#demo-state');
          for (const value of ['error', 'empty', 'partial', 'loading', 'ready']) {
            state.value = value;
            state.dispatchEvent(new w.Event('change', { bubbles: true }));
            await settle(w);
            expect(state.value === value, 'Demo state: ' + value);
            if (value === 'error') expect(d.querySelector('[role="alert"]'), 'Error visible');
            if (value === 'partial')
              expect(d.querySelector('.metrics'), 'Partial keeps successful metrics');
            if (value === 'loading')
              expect(d.querySelector('[aria-busy="true"]'), 'Loading indicated');
          }
          report.interactions.push('dashboard project/period filters, 5 data states');
        } else {
          const reopen = [...d.querySelectorAll('button')].find((b) =>
            b.textContent.includes('Cookie'),
          );
          expect(reopen, 'Cookie reopen control');
          reopen.click();
          await settle(w);
          expect(d.querySelector('.cookie-note'), 'Cookie notice reopened');
          d.querySelector('.cookie-note button').click();
          await settle(w);
          expect(!d.querySelector('.cookie-note'), 'Cookie notice dismissed');
          expect(d.cookie.includes('evolve_notice_seen=1'), 'Cookie stored');
          report.interactions.push('cookie reopen, dismiss, storage');
        }
      } catch (e) {
        report.errors.push(path + ': ' + e.message);
      } finally {
        frame.remove();
      }
    }
  } finally {
    document.cookie = previous
      ? previous + '; Path=/; SameSite=Lax'
      : 'evolve_notice_seen=; Max-Age=0; Path=/';
  }
  document.documentElement.dataset.browserTestReport = JSON.stringify(report);
  return report;
});
await page.eval(() => {
  document.querySelector('app-scrapbook-polaroid button').focus();
});
await page.press('Enter');
const keyboardFlip = await page.eval(() =>
  document.querySelector('app-scrapbook-polaroid button').getAttribute('aria-pressed'),
);
if (keyboardFlip !== 'true') report.errors.push('Keyboard Enter did not flip the Polaroid');
else report.interactions.push('real keyboard Enter activation');
console.log(JSON.stringify(report, null, 2));
if (report.errors.length) throw new Error(report.errors.length + ' browser checks failed');
