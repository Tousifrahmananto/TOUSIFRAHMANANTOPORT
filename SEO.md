# Portfolio search and AI discovery

Checked and implemented locally on 20 October 2026. Production site: https://tousifrahmanantoportfolio.vercel.app/.

## Evidence from the live audit

The homepage returned HTTP 200. Its original HTTP response had an empty React root. Firecrawl could read the rendered portfolio after JavaScript ran, so this was a dependency on rendering rather than proof that Google could not index the page. The project notes were available only through interactive modals. The head contained a title, description and basic Open Graph tags but no canonical, social preview image or JSON-LD. Both `/robots.txt` and `/sitemap.xml` returned 404. A deliberately nonexistent URL returned the homepage with HTTP 200, creating a soft-404 risk.

Scope: the homepage, its rendered content and outgoing links, those discovery endpoints, one nonexistent route and the local build source. This was not a backlink, ranking or traffic audit. No Search Console or Bing account was accessed. No conclusion about current index coverage or real-user Core Web Vitals is supported by this audit.

## Implemented

- Build-time HTML for the homepage and all eight existing projects. The same React components provide static content and hydrated interactions, with no new runtime dependency.
- Real project URLs at `/work/{id}/`. Existing homepage clicks still open the modal. Each modal also links to its full page. Without JavaScript, the project link navigates directly to the notes.
- Per-page titles, descriptions, absolute canonical URLs, Open Graph tags and Twitter summary cards. A 1200 × 630 PNG uses the portfolio's existing fonts and cobalt palette.
- Person/ProfilePage and SoftwareSourceCode structured data with matching public content, source repositories and GitHub/LinkedIn identity links. Project pages include breadcrumb structured data and a visible breadcrumb. Schema validity does not promise a Google rich result.
- Generated `sitemap.xml` containing the nine real pages. Hash sections and the error page are not listed. No invented last-modified dates.
- Generated `robots.txt` permits public crawling and declares the sitemap. The wildcard permission includes search crawlers such as Googlebot, Bingbot and OAI-SearchBot. No new explicit training policy has been added.
- An optional `llms.txt` reading index generated from the same project data. It is a convenience for tools that choose to read it, not a guaranteed AI ranking signal. Google does not use it for ranking.
- Removed the blanket SPA rewrite so Vercel can serve generated project pages and return real 404s for unknown routes. A noindex error page is generated. The legacy projects/hobbies redirects are retained.
- Backend-focused introduction, current CV details for the four selected projects, current MediPay/AFK demo URLs and the current downloadable application CV. Existing additional portfolio projects remain available. No CGPA was added.

The factual source for updated career/project claims is `D:/CV/Tousif_Rahman_Anto_Application_CV.tex`. The downloadable PDF was copied from `D:/CV/output/pdf/Tousif_Rahman_Anto_Application_CV.pdf`. The older additional projects retain their previously reviewed repository descriptions.

## Build and verify

```powershell
npm run build
npm run check:seo
npm run preview -- --port 4180
```

The check reads all nine generated HTML pages, parses JSON-LD, checks unique titles, canonical URLs, real content, local assets and project links, social tags, sitemap membership, current demo URLs and 404 configuration. Keep it in the release process after content changes.

Browser verification passed: existing filters, modal opening/Escape/focus restoration, skills keyboard controls, email copy feedback, clean section URLs, five responsive widths, reduced motion, scroll reveals and image loading. Additional checks passed for eight direct project pages at 320/390/1440px, no hydration/console errors and homepage-to-project navigation with JavaScript disabled. Local Vite preview is not evidence of Vercel's production status codes; verify those after deployment.

## Launch steps still required

1. Deploy the reviewed changes to the existing Vercel project. Build command remains `npm run build`, output remains `dist`. Do not restore the blanket rewrite to `/index.html`.
2. Check the production homepage source for the actual name, introduction and project links before scripts run. Check a project URL, `/robots.txt`, `/sitemap.xml` and `/images/portfolio-social.png`. Confirm an invented URL returns HTTP 404 rather than 200. Confirm the older `/projects` and `/hobbies` redirects still work.
3. Add or verify the URL-prefix property `https://tousifrahmanantoportfolio.vercel.app/` in [Google Search Console](https://search.google.com/search-console/). Use the ownership file or meta tag Google supplies; do not invent a verification token. Submit `sitemap.xml`, inspect the homepage and important project URLs and request indexing. Confirm Search Console's generative AI inclusion control is enabled where offered. Inspect the rendered HTML and Google-selected canonical after crawling.
4. Add or import the site in [Bing Webmaster Tools](https://www.bing.com/webmasters/). Complete ownership verification and submit the same sitemap. These account steps have not been performed.
5. Check Vercel deployment protection, firewall and bot rules if public crawler requests are blocked. A permissive robots file cannot override a firewall challenge or authentication gate.
6. Review Search Console indexing/performance and Bing reports after crawling. Track relevant queries such as the exact name, backend developer Dhaka, Node.js developer Bangladesh and individual project names. These are relevance targets, not measured search-volume claims. Update GitHub/LinkedIn portfolio links consistently when making authorized profile changes.

If the domain changes, update the origin in `scripts/prerender.mjs`, regenerate the build and submit the new sitemap. Canonicals, schema, social URLs and discovery files derive from that origin.

## Primary guidance

- [Google: generative AI search optimization](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): useful original content, crawl/index eligibility and technical clarity; no special AI text file requirement or guaranteed inclusion.
- [Google: JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics): prerendering, crawlable links, canonicals and meaningful HTTP status codes.
- [Google: ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page).
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots): OAI-SearchBot supports search discovery; GPTBot training controls are separate.

No ranking, AI citation, indexing deadline or traffic increase is guaranteed. No paid directory submissions, fabricated reviews, hidden keyword copy or analytics trackers were added. Production deployment, ownership verification and live crawler access still need verification.
