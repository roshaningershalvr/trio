import config from "../../seo.config.json";

export const seo = config;
const imageUrl = new URL(seo.socialImage, seo.siteUrl).href;
export const homeSeo = {
  meta: [
    { title: seo.title },
    { name: "description", content: seo.description },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { property: "og:title", content: seo.socialTitle },
    { property: "og:description", content: seo.socialDescription },
    { property: "og:url", content: seo.siteUrl },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "TRIO" },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: imageUrl },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1000" },
    { property: "og:image:height", content: "1000" },
    { property: "og:image:alt", content: "TRIO official website artwork — Bible Way Galaxy" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seo.socialTitle },
    { name: "twitter:description", content: seo.socialDescription },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: "TRIO official website artwork — Bible Way Galaxy" },
  ],
  links: [{ rel: "canonical", href: seo.siteUrl }],
  scripts: [{
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", "@id": `${seo.siteUrl}#organization`, name: "Bible Way Galaxy" },
        {
          "@type": "Movie", "@id": `${seo.siteUrl}#film`, name: "TRIO",
          description: seo.description, url: seo.siteUrl, image: imageUrl,
          productionCompany: { "@id": `${seo.siteUrl}#organization` },
          director: { "@type": "Person", name: "Jeshurun Paul Moses" },
          genre: ["Christian", "Thriller"],
        },
        {
          "@type": "WebSite", "@id": `${seo.siteUrl}#website`, name: "TRIO",
          url: seo.siteUrl, description: seo.description,
          publisher: { "@id": `${seo.siteUrl}#organization` },
          about: { "@id": `${seo.siteUrl}#film` },
        },
      ],
    }).replace(/</g, "\\u003c"),
  }],
};
