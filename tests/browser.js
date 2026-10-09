/* From the repository root: chrome-devtools-axi run < tests/browser.js */
await page.open('http://127.0.0.1:4173/index.html');
await page.wait('[data-gallery-ready="true"]');
const report=await page.eval(async()=>{
  const catalog=window.SCRAPBOOK_COMPONENTS;
  const savedStorage=Object.fromEntries(Object.keys(localStorage).filter(k=>k.startsWith('scrapbook:')).map(k=>[k,localStorage.getItem(k)]));
  try {
  const results=[];
  const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  async function load(item,width,suffix=''){
    const frame=document.createElement('iframe');
    frame.style.cssText='position:fixed;left:-3000px;top:0;border:0;width:'+width+'px;height:1100px;';
    frame.title='Browser test '+item.title;
    const loaded=new Promise((resolve,reject)=>{frame.onload=resolve;frame.onerror=()=>reject(new Error('Frame failed to load'));setTimeout(()=>reject(new Error('Frame load timed out')),10000);});
    frame.src=item.file+suffix;document.body.append(frame);await loaded;await frame.contentDocument.fonts.ready;
    return frame;
  }
  async function exercise(d,w,slug){
    const q=s=>d.querySelector('.demo '+s);
    const all=s=>[...d.querySelectorAll('.demo '+s)];
    const click=s=>{const el=q(s);if(!el)throw new Error('Missing '+s);if(el.disabled)throw new Error('Disabled '+s);el.click();};
    const input=(s,value,event='input')=>{q(s).value=value;q(s).dispatchEvent(new w.Event(event,{bubbles:true}));};
    const expect=(ok,message)=>{if(!ok)throw new Error(message);};
    const contains=(s,value)=>expect(q(s).textContent.includes(value),s+' should contain '+value);
    switch(slug){
      case 'stamp-of-approval':click('#approve');expect(!q('.stamp').hidden,'Stamp visible');click('#reset');expect(q('.stamp').hidden,'Stamp reset');break;
      case 'day-night-patch':click('.patch-toggle');expect(q('.patch-toggle').getAttribute('aria-checked')==='true','Night switch');contains('.scene-caption','stars');break;
      case 'foldout-accordion':q('details:nth-of-type(2)').open=true;expect(q('details:nth-of-type(2)').open,'Answer unfolds');break;
      case 'binder-tabs':click('[data-tab="1"]');contains('.page-title','progress');expect(q('[data-tab="1"]').getAttribute('aria-selected')==='true','Tab selected');break;
      case 'paint-chip-palette':click('[data-color="#b9cd99"]');contains('.status','Meadow');break;
      case 'measuring-tape':input('#spacing',40);contains('#spacing-value','40 px');expect(q('.space-sample h2').style.margin==='40px 0px','Spacing changes');break;
      case 'sticker-tag-composer':input('#new-tag','fresh idea');q('#new-tag').dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));contains('.tag-field','fresh idea');expect(all('.tag-label').length===4,'New sticker');break;
      case 'perforated-quantity':click('#plus');contains('.passengers','03');contains('.ticket-total','€36');break;
      case 'pinwheel-actions':click('.pinwheel-center');click('.blade');contains('.action-result','Keep it safe');break;
      case 'split-decision':click('#delivery-toggle');click('[data-method="paper plane"]');click('#send-note');contains('.status','Sent by paper plane');break;
      case 'pocket-command-palette':click('#open-pocket');input('#command-search','team');click('.command-list button');contains('.status','Meet the team');break;
      case 'train-ticket-stepper':input('#trip-name','Browser adventure');click('#trip-next');click('#trip-next');contains('.trip-summary','Browser adventure');break;
      case 'atlas-minimap':click('[data-place="Lookout"]');contains('.map-place','Lookout');break;
      case 'index-card-pagination':click('#index-next');contains('#index-number','02');contains('#index-title','click');break;
      case 'margin-note-toc':click('[data-chapter="2"]');contains('.chapter-title','The test');break;
      case 'ribbon-dock':click('[data-ribbon="2"]');contains('.ribbon-title','archive');break;
      case 'fortune-fold-menu':click('[data-fortune]');expect(!q('.fortune-answer').hidden,'Fold opened');click('#refold');expect(!q('.fortune-fold').hidden,'Refolded');break;
      case 'project-passport':all('[data-visit]').forEach(x=>x.click());expect(all('.passport-stamps .stamp').length===4,'Four stamps');break;
      case 'timeline-time-machine':input('#memory-range',4);contains('#version-tag','v1.0');break;
      case 'trailhead-mega-menu':click('#trail-toggle');click('[data-trail]');contains('.trail-detail','Mila');break;
      case 'postcard-contact':input('[name=name]','Browser Maker');input('[name=message]','A kind little note.');click('#post-card');contains('.status','saved');break;
      case 'stringline-password':input('#secret','StrongSecret42!');expect(all('.flag.filled').length===4,'Four strength flags');click('#show-secret');expect(q('#secret').type==='text','Reveal secret');break;
      case 'elastic-title':input('#poster-title','A NICE LITTLE IDEA');contains('#live-title','A NICE LITTLE IDEA');click('#align-title');expect(q('.title-preview').style.textAlign==='center','Center poster');break;
      case 'torn-file-pocket':const file=new w.File(['hello'],'little-note.txt',{type:'text/plain'}),transfer=new w.DataTransfer();transfer.items.add(file);q('#file-input').files=transfer.files;q('#file-input').dispatchEvent(new w.Event('change',{bubbles:true}));contains('#file-name','little-note.txt');click('#clear-file');expect(q('.file-result').hidden,'File cleared');break;
      case 'calendar-date-stamp':input('#date-pick','2027-02-10');contains('.date-day','10');contains('.date-month','February');break;
      case 'inkwell-mixer':input('[data-pigment="0"]',0);contains('.ink-hex','#00a4bf');break;
      case 'mood-pie':click('[data-mood="Quiet"]');contains('.mood-result','slower');break;
      case 'budget-envelopes':input('[data-budget="0"]',300);contains('#budget-left','€0');expect(q('[data-budget="0"]').value==='180','Budget cannot overspend');break;
      case 'handwritten-sketchpad':q('#sketch').getContext('2d').fillRect(0,0,20,20);click('#clear-sketch');expect(q('#sketch').getContext('2d').getImageData(0,0,1,1).data[3]===0,'Canvas clears');break;
      case 'field-note-autocomplete':input('#species-search','leaf');click('#species-list button');contains('#specimen-name','Oak leaf');break;
      case 'polaroid-team-flip':click('.polaroid');expect(!q('.portrait-back').hidden,'Portrait back');contains('.portrait-back','Collects ticket stubs');break;
      case 'friendship-constellation':click('[data-person="Theo"]');contains('#star-name','Theo');contains('#star-gift','problems');break;
      case 'desk-availability':input('#desk-state','Focus','change');contains('#desk-detail-1','Headphones');break;
      case 'thank-you-note':input('#thanks-message','You made the browser test feel simple.');click('#write-thanks');contains('#thanks-body','browser test');expect(!q('.thanks-note .stamp').hidden,'Appreciation stamped');break;
      case 'tiny-guestbook':input('#guest-name','Test Visitor');input('#guest-note','A little hello.');click('#sign-book');contains('.guest-lines','Test Visitor');break;
      case 'team-role-wheel':click('[data-role="1"]');contains('#role-title','thing maker');break;
      case 'introduce-yourself-badge':input('#name-edit','Test Maker');contains('#badge-name','Test Maker');click('[data-badge-color="#9dc8e3"]');expect(q('.badge-header').style.background!=='','Badge color changes');break;
      case 'pairing-matchmaker':click('#find-pair');contains('#match-name','Theo');break;
      case 'handshake-invitation':click('[data-answer="yes"]');contains('.reply-copy','Friday');click('#reconsider');expect(!q('.invite-actions').hidden,'Can reconsider');break;
      case 'decision-token-vote':click('[data-add-vote="0"]');click('[data-add-vote="0"]');click('[data-add-vote="1"]');contains('.vote-left','0 tokens');expect(q('[data-add-vote="2"]').disabled,'Token budget respected');click('#reset-votes');contains('.vote-left','3 tokens');break;
      case 'clothesline-kanban':click('[data-move="0"]');expect(q('[data-task="0"]').closest('.kanban-lane').dataset.lane==='1','Task moves');break;
      case 'paper-trail-activity':q('.activity-slip').open=true;expect(q('.activity-slip').open,'Activity evidence expands');break;
      case 'sprint-quilt':all('[data-patch]').forEach(x=>x.click());contains('.quilt-count','9 / 9');contains('.status','whole quilt');break;
      case 'release-stamp-book':all('.release-checks input').forEach(x=>{x.checked=true;x.dispatchEvent(new w.Event('change',{bubbles:true}));});click('#stamp-release');contains('.release-blank','v1.0');break;
      case 'branch-garden':q('.branch-tree details').open=true;contains('.branch-tree details','Team cards');break;
      case 'storyboard-carousel':click('#story-next');contains('.story-page','2 / 4');contains('.story-heading','possibilities');break;
      case 'risk-weather':input('#risk-uncertainty',5);input('#risk-impact',5);contains('.risk-heading','Storm');contains('.status','25 / 25');break;
      case 'dependency-string-board':click('[data-node="0"]');click('[data-node="1"]');expect(all('.string-board line').length===1,'String created');click('#clear-strings');expect(all('.string-board line').length===0,'Strings cleared');break;
      case 'build-conveyor':click('#run-build');await wait(2100);contains('.status','green pipeline');break;
      case 'ship-it-checklist':all('.shipping input').forEach(x=>{x.checked=true;x.dispatchEvent(new w.Event('change',{bubbles:true}));});click('#ship-it');expect(!q('.ship-celebration').hidden,'Ship launched');click('#pack-again');expect(q('#ship-it').disabled,'Checklist reset');break;
      case 'jam-jar-progress':click('#jar-add');contains('#jar-amount','€160');contains('.status','40%');break;
      case 'woven-bar-chart':input('#chart-week','Last week','change');click('[data-bar="0"]');contains('.status','5 tasks');break;
      case 'habit-stamp-week':click('[data-day="0"]');contains('.habit-summary','1 small act');click('#new-habit-week');contains('.habit-summary','0 small acts');break;
      case 'expense-receipt':input('.receipt-line input',30);contains('.receipt-total output','€60.00');input('#expense-name','Tape');click('#add-expense');expect(all('.receipt-line').length===4,'New receipt line');break;
      case 'desk-calculator':click('[data-key="2"]');click('[data-key="+"]');click('[data-key="3"]');click('[data-key="="]');contains('#calc-display','5');break;
      case 'graph-paper-sparklines':click('[data-series="1"]');contains('.spark-total','24 issues');break;
      case 'coffee-ring-donut':click('[data-part="2"]');contains('.coffee-percent','20%');contains('.coffee-category','Together');break;
      case 'footprint-heatmap':click('[data-heat="1"]');contains('#heat-day','October 2');break;
      case 'comparison-window':input('#compare-range',80);expect(q('.compare-before').style.clipPath.includes('80%'),'Comparison reveal moves');break;
      case 'metric-flipboard':click('[data-period="1"]');expect(all('.flip-digits span').map(x=>x.textContent).join('')==='38','Monthly metric');break;
      case 'tomato-timer':input('#timer-length','1','change');click('#timer-start');await wait(1100);expect(q('#tomato-time').textContent!=='01:00','Clock ticks');click('#timer-start');contains('#timer-start','Resume');click('#timer-reset');contains('#tomato-time','01:00');break;
      case 'event-rsvp-ticket':click('#reserve-seat');contains('#rsvp-detail','In the studio');click('#change-rsvp');expect(!q('#rsvp-type').hidden,'RSVP editable');break;
      case 'week-planner':click('[data-plan-day="Fri"]');contains('.status','Friday');expect(q('.focus-sticky').closest('button').dataset.planDay==='Fri','Session moves');break;
      case 'sunrise-focus-dial':input('#energy-level',10);contains('.energy-task','Rest counts');break;
      case 'meeting-sandwich':click('[data-time="1"]');contains('.agenda-total','31 min');all('[data-up]')[1].click();contains('.agenda-item','Show the work');break;
      case 'folded-world-clock':click('[data-zones="1"]');contains('.clock-city','Tokyo');expect(/\d{2}:\d{2}/.test(q('.clock-time').textContent),'Live time');break;
      case 'countdown-tear-calendar':input('#countdown-name','A test milestone');contains('#countdown-label','A test milestone');input('#countdown-date','2020-01-01');contains('.countdown-unit','since');break;
      case 'timesheet-stitch':input('#session-name','Testing');input('#session-minutes',30);click('#add-session');contains('.status','135 minutes');break;
      case 'slow-mail-letter':if(q('.slow-form').hidden)click('#open-letter');input('#future-words','Hello from the browser test.');input('#future-day','2027-01-01');click('#seal-letter');expect(!q('.sealed-letter').hidden,'Letter sealed');click('#open-letter');contains('.opened-words','browser test');break;
      case 'breathing-paper':click('#breathe-start');expect(q('.breathing').classList.contains('inhale'),'Breath begins');click('#breathe-start');contains('.breath-label','pause');break;
      case 'envelope-notification':click('#open-envelope');expect(!q('.envelope-letter').hidden,'Envelope open');click('#read-envelope');click('#close-envelope');expect(q('.envelope-unread').hidden,'Unread removed');break;
      case 'undo-eraser':click('#erase-note');expect(q('.erasable-note').hidden,'Note erased');click('#undo-note');expect(!q('.erasable-note').hidden,'Note restored');break;
      case 'cookie-jar-consent':if(!q('.cookie-banner').hidden)click('[data-consent="necessary"]');else click('#reset-consent');if(!q('.cookie-banner').hidden)click('[data-consent="necessary"]');contains('.status','Only necessary');click('#reset-consent');break;
      case 'red-pen-validation':click('#validate-application');expect(!q('#email-error').hidden,'Invalid email shown');input('#application-name','Test Maker');input('#application-email','maker@example.com');click('#validate-application');contains('.status','Looks good');break;
      case 'mending-error':click('#mend-retry');await wait(750);click('#mend-retry');await wait(750);expect(q('.mending').classList.contains('fixed'),'Error recovered');break;
      case 'paper-crane-empty':input('#first-idea','A browser test garden');click('#create-first');contains('#created-title','browser test garden');break;
      case 'newspaper-modal':click('#open-edition');expect(q('#edition-dialog').open,'Native modal opens');input('#edition-headline','A little browser test passed.');click('#publish-edition');expect(!q('#edition-dialog').open,'Modal closes');contains('.status','browser test passed');break;
      case 'receipt-confirmation':click('#confirm-reservation');expect(!q('.confirmed-actions').hidden,'Receipt confirmed');contains('.status','LITTLE-016');break;
      case 'rumor-thread':input('#reply-input','A thoughtful browser reply.');click('#add-reply');contains('.reply-list','browser reply');expect(q('.thread-replies').open,'Replies opened');break;
      case 'quiet-notification-controls':q('#quiet-all').checked=true;q('#quiet-all').dispatchEvent(new w.Event('change',{bubbles:true}));contains('.quiet-summary','Nothing will knock');expect(q('[data-notify]').disabled,'Quiet mode disables senders');break;
      case 'cassette-player':click('#rewind-tape');contains('#tape-time','00:00');expect(!q('.cassette-player').classList.contains('playing'),'Tape rewinds silently');break;
      case 'flipbook-animation':input('#flip-scrub',7);contains('.flip-frame','08 / 12');click('#flip-play');await wait(200);click('#flip-play');expect(q('#flip-play').textContent==='Play flipbook','Flipbook pauses');break;
      case 'collage-crop-tool':click('[data-ratio="1.6"]');expect(q('.crop-frame').style.aspectRatio.includes('1.6'),'Postcard ratio');input('#crop-x',20);expect(q('.crop-frame img').style.objectPosition==='20% 50%','Crop moves');break;
      case 'stamp-album-gallery':click('[data-album="Coast"]');contains('#album-memory','quiet morning');break;
      case 'margin-highlighter':click('.passage');contains('.highlight-count','1 passages');click('.passage');contains('.highlight-count','0 passages');break;
      case 'field-radio-mixer':input('[data-frequency]',70);contains('.radio-faders output','70%');break;
      case 'zine-bookshelf':click('[data-zine="0"]');click('#read-chapter');contains('.zine-progress','1 / 5');break;
      case 'annotated-landscape':click('.annotation-pin');contains('#annotation-title','slower way home');break;
      case 'caption-typesetter':input('#caption-input','A small walk.');click('[data-caption="1"]');contains('#photo-caption','A small walk.');expect(q('#photo-caption').classList.contains('stamped'),'Caption stamped');break;
      case 'pixel-embroidery':click('[data-cell="0"]');expect(q('[data-cell="0"]').getAttribute('aria-pressed')==='true','Stitch painted');click('#clear-stitches');expect(q('[data-cell="0"]').getAttribute('aria-pressed')==='false','Stitch cleared');break;
      case 'idea-seed-garden':input('#seed-name','A little test seed');click('#plant-seed');expect(all('.idea-flower').length===3,'Idea planted');contains('.status','test seed');break;
      case 'constraint-dice':click('#roll-brief');contains('.brief-output','Make something');expect(all('.brief-die strong').length===3,'Three constraints');break;
      case 'secret-scratchcard':click('#reveal-scratch');expect(q('#scratch-canvas').getContext('2d').getImageData(0,0,1,1).data[3]===0,'Scratch layer revealed');click('#reset-scratch');expect(q('#scratch-canvas').getContext('2d').getImageData(0,0,1,1).data[3]>0,'Scratch layer restored');break;
      case 'pocket-decision-coin':click('#toss-coin');await wait(750);expect(['A','B'].includes(q('.decision-coin span').textContent),'Coin chooses a side');break;
      case 'priority-balance':click('[data-weight="useful:1"]');contains('.useful b','4');contains('.status','Usefulness leads');break;
      case 'wish-jar':input('#wish-input','Make a delightful test');click('#add-wish');contains('.status','5 wishes');click('#draw-wish');expect(q('.drawn-wish').textContent!=='A little surprise is waiting.','Wish drawn');break;
      case 'treasure-map-onboarding':click('[data-treasure="0"]');click('[data-treasure="1"]');click('[data-treasure="2"]');contains('.treasure-clue','lesson is the treasure');break;
      case 'paper-puzzle-gate':click('[data-tile="0"]');click('[data-tile="1"]');click('[data-tile="1"]');click('[data-tile="3"]');click('[data-tile="2"]');click('[data-tile="3"]');expect(!q('.puzzle-unlocked').hidden,'Puzzle solved');break;
      case 'future-self-postcard':input('#reflect-learn','Ask useful questions');input('#reflect-make','A useful small thing');input('#reflect-keep','A sense of wonder');click('#make-reflection');contains('.reflection-promise','sense of wonder');click('#edit-reflection');expect(!q('.reflection-form').hidden,'Reflection editable');break;
      case 'paper-airplane-dispatch':input('#plane-message','A little hello from the test.');click('#launch-plane');await wait(1300);contains('#landed-message','hello from the test');break;
      default:throw new Error('No interaction test for '+slug);
    }
  }
  async function check(item){
    const row={number:item.number,slug:item.slug,desktop:'pending',mobile:'pending',thumbnail:'pending',interaction:'pending',errors:[]};
    for(const width of [900,375]){
      let frame;
      try{
        frame=await load(item,width);const d=frame.contentDocument,w=frame.contentWindow;
        if(d.documentElement.dataset.experimentReady!=='true')throw new Error('Experiment did not initialize');
        if(d.documentElement.scrollWidth>width+2)throw new Error('Horizontal page overflow: '+d.documentElement.scrollWidth+' > '+width);
        const unnamed=[...d.querySelectorAll('button')].filter(b=>!b.textContent.trim()&&!b.getAttribute('aria-label')&&!b.getAttribute('aria-labelledby'));
        if(unnamed.length)throw new Error('Unnamed button');
        const broken=[...d.images].filter(img=>!img.complete||img.naturalWidth===0);if(broken.length)throw new Error('Broken image');
        row[width===900?'desktop':'mobile']='pass';
        if(width===900){const errors=[];w.addEventListener('error',e=>errors.push(e.message));w.addEventListener('unhandledrejection',e=>errors.push(String(e.reason)));await exercise(d,w,item.slug);await wait(20);if(errors.length)throw new Error(errors.join('; '));row.interaction='pass';}
      }catch(error){row.errors.push(width+'px: '+error.message);if(width===900&&row.interaction==='pending')row.interaction='fail';row[width===900?'desktop':'mobile']='fail';}
      finally{frame?.remove();}
    }
    let thumbnail;
    try{
      thumbnail=await load(item,640,'?preview=1&thumbnail=1');
      await new Promise(resolve=>thumbnail.contentWindow.requestAnimationFrame(()=>thumbnail.contentWindow.requestAnimationFrame(resolve)));
      const d=thumbnail.contentDocument,rect=d.querySelector('.demo').getBoundingClientRect();
      if(d.documentElement.dataset.experimentReady!=='true')throw new Error('Thumbnail did not initialize');
      if(rect.top<35||rect.bottom>425||rect.height>382)throw new Error('Thumbnail clips the component: '+JSON.stringify({top:rect.top,bottom:rect.bottom,height:rect.height}));
      row.thumbnail='pass';
    }catch(error){row.thumbnail='fail';row.errors.push('thumbnail: '+error.message);}
    finally{thumbnail?.remove();}
    return row;
  }
  for(let i=0;i<catalog.length;i+=6)results.push(...await Promise.all(catalog.slice(i,i+6).map(check)));
  const galleryWidths=[];
  for(const width of [320,375,768,1600]){
    let frame;
    try{frame=await load({file:'index.html',title:'Gallery layout'},width);const d=frame.contentDocument;
      if(d.documentElement.dataset.galleryReady!=='true')throw new Error('Gallery did not initialize');
      if(d.documentElement.scrollWidth>width)throw new Error('Gallery overflows at '+width+'px');
      if(d.querySelector('.hero h1 span').getBoundingClientRect().right>width)throw new Error('Hero headline clips at '+width+'px');
      galleryWidths.push(width);
    }finally{frame?.remove();}
  }
  return {total:results.length,passed:results.filter(r=>r.errors.length===0).length,failures:results.filter(r=>r.errors.length),layouts:results.filter(r=>r.desktop==='pass').length+results.filter(r=>r.mobile==='pass').length,interactions:results.filter(r=>r.interaction==='pass').length,thumbnails:results.filter(r=>r.thumbnail==='pass').length,galleryWidths};
  } finally {
    Object.keys(localStorage).filter(k=>k.startsWith('scrapbook:')).forEach(k=>localStorage.removeItem(k));
    Object.entries(savedStorage).forEach(([key,value])=>localStorage.setItem(key,value));
  }
});
console.log(JSON.stringify(report,null,2));
if(report.failures.length)throw new Error('Component browser tests failed.');
await page.click('[data-category="Projects"]');
const projects=await page.eval(()=>document.querySelectorAll('.component-card').length);
if(projects!==10)throw new Error('Projects filter should show ten components.');
console.log('projects',projects);
await page.click('[data-category="All"]');
await page.fill('#component-search','stamp');
const search=await page.eval(()=>document.getElementById('results-summary').textContent);
if(!search.startsWith('8 '))throw new Error('Stamp search should find eight components.');
console.log('search',search);
await page.fill('#component-search','');
await page.click('[data-open="stamp-of-approval"]');
await page.wait('#experiment-dialog[open]');
const modal=await page.eval(()=>JSON.stringify({title:document.getElementById('experiment-title').textContent,hash:location.hash}));
if(!modal.includes('Stamp of approval')||!modal.includes('#stamp-of-approval'))throw new Error('Modal and deep link should identify the chosen component.');
console.log('modal',modal);
await page.click('#viewport-mobile');
const phone=await page.eval(()=>document.getElementById('experiment-frame').getBoundingClientRect().width);
if(phone>390)throw new Error('Phone preview should be no wider than 390px.');
console.log('phone',phone);
await page.click('#view-source');
const source=await page.eval(()=>document.getElementById('experiment-source').textContent.includes('<!doctype html>'));
if(!source)throw new Error('Source view should show the full HTML document.');
console.log('source',source);
await page.click('#experiment-close');
const originalFavorite=await page.eval(()=>document.querySelector('[data-favorite="stamp-of-approval"]').getAttribute('aria-pressed'));
await page.click('[data-favorite="stamp-of-approval"]');
await page.open('http://127.0.0.1:4173/index.html');
await page.wait('[data-gallery-ready="true"]');
const persistedFavorite=await page.eval(()=>document.querySelector('[data-favorite="stamp-of-approval"]').getAttribute('aria-pressed'));
if(persistedFavorite===originalFavorite)throw new Error('Shortlist change should survive a reload.');
await page.click('[data-favorite="stamp-of-approval"]');
for(let i=0;i<5;i++)await page.click('#load-more');
const allCards=await page.eval(()=>document.querySelectorAll('.component-card').length);
if(allCards!==100)throw new Error('All 100 experiments should be browsable.');
console.log('shortlist persistence: pass; all cards:',allCards);
console.log('BROWSER_TESTS_COMPLETE');
