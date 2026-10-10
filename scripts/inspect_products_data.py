import sys, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

products = json.load(open('server/data/products.json', encoding='utf-8'))
cats = {}
for p in products:
    cid = p.get('categoryId', 'unknown')
    cname = p.get('category', 'Không rõ')
    cats.setdefault((cid, cname), []).append(p)

for (cid, cname), items in cats.items():
    print(f"\nCategory [{cid}] - {cname} ({len(items)} items):")
    for it in items:
        print(f"  - [{it['slug']}] {it['title']} ({it['main_image']})")
