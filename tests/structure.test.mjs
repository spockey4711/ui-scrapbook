import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,access} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=fileURLToPath(new URL('../',import.meta.url));
const sandbox={window:{}};
vm.runInNewContext(await readFile(root+'assets/catalog.js','utf8'),sandbox);
const components=sandbox.window.SCRAPBOOK_COMPONENTS;
const categories=sandbox.window.SCRAPBOOK_CATEGORIES;
test('exactly 100 numbered HTML components plus one gallery',async()=>{
  const files=(await readdir(root+'components')).filter(x=>x.endsWith('.html'));
  assert.equal(files.length,100);assert.equal(components.length,100);
  assert.equal(new Set(components.map(c=>c.slug)).size,100);
  assert.equal(new Set(components.map(c=>c.title)).size,100);
  assert.deepEqual(Array.from(components,c=>c.number),Array.from({length:100},(_,i)=>i+1));
  await access(root+'index.html');
});
test('ten distinct chapters, with ten experiments in each',()=>{
  assert.equal(categories.length,10);
  for(const c of categories)assert.equal(components.filter(x=>x.category===c.name).length,10);
});
test('all generated files match their catalog and use real, local assets',async()=>{
  for(const c of components){
    const file=root+c.file;
    const html=await readFile(file,'utf8');
    assert.equal(html,c.source,c.slug);
    assert.match(html,/<!doctype html>/i);assert.match(html,/<html lang="en">/);
    assert.match(html,/name="viewport"/);assert.match(html,/class="demo"/);
    assert.match(html,/data(?:set)?\.experimentReady/);
    assert.match(html,/role="status"/);
    assert.ok(c.hint.length>15,c.slug+' needs an interaction hint');
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(ids.length,new Set(ids).size,c.slug+' contains duplicate IDs');
    for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
      if(/^(https?:|data:|about:)/.test(match[1]))continue;
      await access(resolve(dirname(file),match[1]));
    }
    for(const form of html.matchAll(/<form\b[^>]*>([\s\S]*?)<\/form>/g))assert.match(form[1],/<button type="submit"/,c.slug+' form needs a visible submit button');
    assert.doesNotMatch(html,/\b(?:TODO|FIXME)\b/);
  }
});
test('all individual scripts and gallery scripts parse',async()=>{
  for(const c of components)for(const script of c.source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new Function(script[1]);
  for(const file of ['assets/gallery.js','assets/runtime.js'])new Function(await readFile(root+file,'utf8'));
});
test('gallery supports offline local opening, without runtime services',async()=>{
  const script=await readFile(root+'assets/gallery.js','utf8');
  assert.doesNotMatch(script,/\bfetch\s*\(/);
  const html=await readFile(root+'index.html','utf8');
  assert.doesNotMatch(html,/(?:src|href)="https?:/);
  for(const file of ['assets/fonts/bricolage.woff2','assets/fonts/caveat.woff2'])assert.ok((await readFile(root+file)).length>10000);
});
