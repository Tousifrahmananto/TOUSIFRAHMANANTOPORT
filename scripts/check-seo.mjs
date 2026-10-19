import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const origin = 'https://tousifrahmanantoportfolio.vercel.app';
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(urls.length, 9, 'Homepage and all eight project pages must be discoverable');
const titles = new Set();
for (const url of urls) {
  const path = new URL(url).pathname;
  const html = await readFile(`dist${path}index.html`, 'utf8');
  assert(html.includes(`<link rel="canonical" href="${url}"`), `Canonical mismatch: ${url}`);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `Expected one h1: ${url}`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title && !titles.has(title), `Missing or duplicate title: ${url}`);
  titles.add(title);
  assert(html.includes('name="description" content="'), `Missing description: ${url}`);
  assert(html.includes('name="twitter:card" content="summary_large_image"'), `Missing social card: ${url}`);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1] ?? 'null');
  assert(schema?.['@graph']?.some((item) => item['@type'] === 'Person'), `Missing person: ${url}`);
  assert(!html.includes('<div id="root"></div>'), `Empty app shell: ${url}`);
  assert(html.includes(path === '/' ? 'id="project-medipay"' : 'The challenge'), `Missing static content: ${url}`);
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/(?:assets|images|fonts|documents)\/[^"#?]+)"/g)) await stat(`dist${asset}`);
  for (const [, href] of html.matchAll(/href="(\/work\/[^"#?]+)"/g)) await stat(`dist${href}index.html`);
}
const home = await readFile('dist/index.html', 'utf8');
assert(home.includes('https://saas-project-client-beta.vercel.app/'));
assert(home.includes('https://afk-productions-frontend.vercel.app/dashboard'));
assert(!home.includes('CGPA'));
assert((await stat('dist/images/portfolio-social.png')).size > 1000, 'Missing social preview');
assert((await readFile('dist/robots.txt', 'utf8')).includes(`Sitemap: ${origin}/sitemap.xml`));
assert((await readFile('dist/404.html', 'utf8')).includes('noindex, follow'));
assert(!sitemap.includes('404.html'));
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
assert(!config.rewrites?.some((rule) => rule.destination === '/index.html'), 'Catch-all rewrite creates soft 404s');
console.log(`PASS: ${urls.length} static pages, unique metadata, structured data, links/assets, crawler discovery and 404 configuration.`);
