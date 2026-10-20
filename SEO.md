# Portfolio search and AI discovery

Latest user preference, 20 October 2026: **https://www.tousifrahmananto.me/** is the canonical portfolio URL. The build and checks now use the www domain. This supersedes the earlier non-www preference in the migration history below. Redirect the non-www and old Vercel hosts to the www domain, preserving paths. Use the www sitemap for search-console submission. The downloadable résumé has been rebuilt with this URL; deployment is still required for local changes.

Checked and implemented locally on 20 October 2026. Production site: https://tousifrahmanantoportfolio.vercel.app/.

Custom-domain migration update: both `https://tousifrahmananto.me/` and `https://www.tousifrahmananto.me/` served the portfolio over HTTPS when checked on 20 October 2026. The live HTML still declared the old Vercel canonical at that point. The build origin and SEO checks now use `https://tousifrahmananto.me`; deploy these changes to update canonical URLs, structured data IDs, social metadata, sitemap, robots.txt and llms.txt together. Historical audit URLs below refer to the original deployment. Configure permanent redirects from www and the original Vercel hostname to the apex custom domain in Vercel, preserving paths. Add and verify the custom domain in Google Search Console and Bing, submit its new sitemap and update external profile links. These dashboard and external-profile changes have not been performed by this code update. Public DNS still resolved to Cloudflare proxy IPs at the time of the check; confirm gray-cloud DNS-only settings or allow cached records to expire.

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

### Exact-name search follow-up, 20 October 2026

The user supplied Search Console evidence that the homepage is indexed, Google selected the inspected URL as canonical and ProfilePage markup is valid. That confirms indexing, not placement for the name query. A public search check returned the Millennium Fellowship biography and LinkedIn profile; the portfolio was not returned in that check. Results can differ by search service and user context, so this is not a definitive Google ranking measurement.

Added named WebSite structured data linked to the Person/ProfilePage graph and the verified Millennium Fellowship biography to Person.sameAs. The same external biography is now visibly linked from the Fellowship credential. Preserved the homepage design while retaining a literal space between Tousif and Rahman across its heading line break. Build and SEO checks passed.

The GitHub public profile API reported the correct full name but an empty website field. Add the canonical portfolio URL there and to LinkedIn's Featured/contact links when profile editing is available and authorized. These external profile changes have not been applied as part of this follow-up. Deploy the local website changes before requesting another homepage recrawl. Avoid duplicate name-targeted pages or keyword repetition. No first-position or exact-date ranking promise is supported.

- [Google: generative AI search optimization](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): useful original content, crawl/index eligibility and technical clarity; no special AI text file requirement or guaranteed inclusion.
- [Google: JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics): prerendering, crawlable links, canonicals and meaningful HTTP status codes.
- [Google: ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page).
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots): OAI-SearchBot supports search discovery; GPTBot training controls are separate.

No ranking, AI citation, indexing deadline or traffic increase is guaranteed. No paid directory submissions, fabricated reviews, hidden keyword copy or analytics trackers were added. Production deployment, ownership verification and live crawler access still need verification.
