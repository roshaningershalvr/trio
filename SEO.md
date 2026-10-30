# TRIO technical SEO

## Configuration and maintenance

`seo.config.json` is the source for production origin, homepage metadata, existing sharing image, Google verification token, and the explicit list of publicly indexable page paths. There is currently one public page (`/`); section anchors are not separate pages. When adding a public route, give it unique route-head metadata and its own canonical URL, then add its path to `publicPages`. Do not add utility, authenticated, redirected or noindex routes.

`npm run build` runs `scripts/generate-seo.mjs` automatically and generates `public/sitemap.xml` and `public/robots.txt`. No lastmod is emitted because an accurate per-page modification date is unavailable. No extra dependencies were added. The metadata uses TanStack Router's route `head`, with `HeadContent` in the root shell. JSON-LD describes the Movie, its verified production organization, and this official WebSite; no release date, reviews, awards, or ratings are invented.

The requested title/description are used verbatim. Existing visible content supplies film, Christian-film, Bible Way Galaxy and J³ context. No keyword stuffing or obsolete meta-keywords tag is added.

## Google Search Console: manual setup

1. Open https://search.google.com/search-console/ and add a **URL prefix** property: `https://trio-thechristianfilm.vercel.app/`.
2. Select **HTML tag** verification. Copy only the value inside `content="..."` from Google's tag.
3. Paste that value into **googleSiteVerification** in root `seo.config.json` (currently empty). Do not paste the entire tag and do not invent a token.
4. Commit and deploy. Check the homepage HTML contains `<meta name="google-site-verification" content="YOUR_ACTUAL_TOKEN">`, then click **Verify** in Search Console. Keep the token configured afterward.
5. Under **Sitemaps**, submit `sitemap.xml`.
6. Use **URL Inspection** for the homepage, run **Test live URL**, and request indexing when eligible.
7. Monitor Page indexing, Crawl stats, Core Web Vitals, and search performance. Verification/indexing/ranking is not guaranteed by deploying metadata.

Search Console is not connected or verified by this change. Reference: https://support.google.com/webmasters/answer/9008080
Sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
Framework head management: https://tanstack.com/router/latest/docs/guide/document-head-management

## Validation

- `npm run build`: successful (client + SSR + Nitro).
- `python scripts/validate-seo.py http://127.0.0.1:4174`: successful against rendered local HTTP responses.
- After deployment: `python scripts/validate-seo.py https://trio-thechristianfilm.vercel.app`.
- Validator checks 200 homepage, exact title/canonical/description/social image, unique key metadata, JSON-LD syntax and graph references, unchanged favicon, hero eager/high-priority loading, image alt attributes and local files, internal anchor targets, XML sitemap URLs, permissive robots and sitemap reference, and actual 404 with noindex header.
- Only metadata, static crawl resources, build tooling, error indexing headers, and image loading attributes are changed. No CSS, text content, assets, visual layout, typography, animations, or event handlers are changed. No browser screenshot comparison or real-device audit was performed.
- Core Web Vitals require real-user measurement; no Lighthouse/field scores are claimed. The existing large JS bundle warning remains; visual effects and functionality have been preserved.

## Existing issues found

- Canonical pointed at a temporary Lovable preview domain: corrected to production.
- No sitemap or sitemap robots reference: generated at every production build.
- Primary hero image was lazy-loaded: now eager with high fetch priority.
- Social metadata lacked og:url and had different titles/descriptions: standardized.
- JSON-LD lacked official URL and image and included an unverified creation date: replaced with verified graph.
- Unknown/error URLs needed explicit noindex protection: error responses now carry X-Robots-Tag and fallback error HTML has noindex.
- Opening intro and hero both have title headings; these are existing visible components, retained to respect the no-visual-change requirement.
