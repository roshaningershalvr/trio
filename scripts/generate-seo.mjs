import { readFileSync, writeFileSync } from "node:fs";
const config = JSON.parse(readFileSync(new URL("../seo.config.json", import.meta.url), "utf8"));
const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
if (new URL(config.siteUrl).protocol !== "https:") throw new Error("SEO origin must use HTTPS");
const urls = [...new Set(config.publicPages)].map((path) => {
  const url = new URL(path, config.siteUrl);
  if (url.origin !== new URL(config.siteUrl).origin || url.hash || url.search) throw new Error(`Invalid canonical path: ${path}`);
  return `  <url><loc>${escapeXml(url.href)}</loc></url>`;
});
writeFileSync(new URL("../public/sitemap.xml", import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
writeFileSync(new URL("../public/robots.txt", import.meta.url), `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap.xml", config.siteUrl).href}\n`);
console.log(`Generated sitemap with ${urls.length} canonical page(s).`);
