/* Shared, dependency-free interaction helpers. Individual experiments own their state. */
'use strict';
const root = document.querySelector('.demo');
const $ = (selector) => root.querySelector(selector);
const $$ = (selector) => [...root.querySelectorAll(selector)];
const on = (selector, event, handler) => $$(selector).forEach(element => element.addEventListener(event, handler));
const say = (message) => {
  const status = document.querySelector('#live-status');
  status.textContent = message;
  status.hidden = false;
  clearTimeout(say.timer);
  say.timer = setTimeout(() => { status.hidden = true; }, 3500);
};
const text = (selector, value) => { $(selector).textContent = value; };
const pick = (items) => items[Math.floor(Math.random() * items.length)];
const store = {
  get(key, fallback = null) { try { return JSON.parse(localStorage.getItem('scrapbook:' + key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem('scrapbook:' + key, JSON.stringify(value)); return true; } catch { return false; } }
};
const download = (name, contents, type = 'text/plain') => {
  const url = URL.createObjectURL(new Blob([contents], {type}));
  const link = document.createElement('a');
  link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
const pressed = (selector, target) => $$(selector).forEach(item => item.setAttribute('aria-pressed', String(item === target)));
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
if (document.documentElement.classList.contains('thumbnail')) {
  const fit = () => { root.style.transform = 'scale(' + Math.min(1, 380 / Math.max(1, root.offsetHeight)) + ')'; };
  new ResizeObserver(fit).observe(root);
  document.fonts.ready.then(fit);
}
document.documentElement.dataset.ready = 'true';
