import io, sys, re, os

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

with open("client/san-pham.html", "r", encoding="utf-8") as f:
    text = f.read()

titles = re.findall(r'class="product-title">([^<]+)</div>', text)
print(f"Total products in san-pham.html: {len(titles)}")
for t in titles[:10]:
    print(" -", t.strip())

# Check categories
for cat in ['cotton', 'ca-sau', 'the-thao', 'me-luoi', 'ni-da-ca']:
    p = f"client/danh-muc-{cat}.html"
    if os.path.exists(p):
        ctext = open(p, encoding='utf-8').read()
        c_titles = re.findall(r'class="product-title">([^<]+)</div>', ctext)
        print(f"Category {cat}: {len(c_titles)} products")
