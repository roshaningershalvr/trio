"""Validate rendered SEO: python scripts/validate-seo.py [origin]."""
import json, sys, urllib.request, urllib.error, urllib.parse, xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
config = json.loads(Path("seo.config.json").read_text(encoding="utf-8"))
origin = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:4173"
class Document(HTMLParser):
    def __init__(self):
        super().__init__(); self.tags=[]; self.jsonld=[]; self.record=False; self.buffer=""
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs); self.tags.append((tag, attrs))
        if tag == "script" and attrs.get("type") == "application/ld+json": self.record=True; self.buffer=""
    def handle_data(self, data):
        if self.record: self.buffer+=data
    def handle_endtag(self, tag):
        if tag == "script" and self.record: self.jsonld.append(json.loads(self.buffer)); self.record=False

def get(path):
    try:
        response=urllib.request.urlopen(urllib.request.Request(origin+path,headers={"User-Agent":"TRIO-SEO-validation"}),timeout=60)
    except urllib.error.HTTPError as error: response=error
    return response.status, response.headers, response.read().decode("utf-8", errors="replace")
status, headers, body = get("/"); assert status == 200, status
assert "noindex" not in headers.get("X-Robots-Tag", "").lower()
doc=Document(); doc.feed(body)
metas=[attrs for tag,attrs in doc.tags if tag=="meta"]
for key, value in [("description",config["description"]),("og:title",config["socialTitle"]),("og:url",config["siteUrl"]),("og:image",urllib.parse.urljoin(config["siteUrl"],config["socialImage"]))]:
    matches=[m.get("content") for m in metas if m.get("name",m.get("property")) == key]
    assert matches == [value], (key,matches)
assert config["title"] in body
assert not any("noindex" in m.get("content","") for m in metas if m.get("name")=="robots")
canonical=[a["href"] for t,a in doc.tags if t=="link" and a.get("rel")=="canonical"]
assert canonical == [config["siteUrl"]], canonical
assert any(t=="link" and a.get("rel")=="icon" and a.get("href")=="/favicon.png" for t,a in doc.tags)
assert len(doc.jsonld)==1
nodes=doc.jsonld[0]["@graph"]
assert {n["@type"] for n in nodes} == {"Movie","Organization","WebSite"}
websites=[n for n in nodes if n["@type"]=="WebSite"]
assert len(websites)==1 and websites[0]["name"]=="TRIO" and websites[0]["url"]==config["siteUrl"]
assert next(n for n in nodes if n["@type"]=="Movie")["productionCompany"]["@id"]==config["siteUrl"]+"#organization"
ids={a["id"] for _,a in doc.tags if "id" in a}
for tag,a in doc.tags:
    if tag=="a" and a.get("href","").startswith("#") and a["href"]!="#": assert a["href"][1:] in ids, a["href"]
    if tag=="img":
        assert "alt" in a
        if a.get("src","").startswith("/"): assert (Path("public")/urllib.parse.unquote(a["src"]).lstrip("/")).is_file(), a["src"]
hero=[a for t,a in doc.tags if t=="img" and "hero-media" in a.get("class","")]
assert len(hero)==1 and hero[0].get("loading")=="eager" and hero[0].get("fetchpriority")=="high"
status,headers,body=get("/sitemap.xml"); assert status==200
locations=[n.text for n in ET.fromstring(body).findall("{*}url/{*}loc")]; assert locations==[urllib.parse.urljoin(config["siteUrl"],p) for p in config["publicPages"]]
status,headers,body=get("/robots.txt"); assert status==200 and "Disallow: /" not in body and config["siteUrl"]+"sitemap.xml" in body
status,headers,body=get("/seo-validation-missing-page"); assert status==404, status
assert "noindex" in headers.get("X-Robots-Tag", ""), dict(headers)
print("PASS: HTTP status, canonical, unique metadata, social metadata, JSON-LD, favicon, image alt/paths, eager hero, internal anchors, sitemap, robots.txt, and noindex 404.")
