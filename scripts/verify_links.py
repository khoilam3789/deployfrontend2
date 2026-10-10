import os
import re

pages_to_check = [
    'client/index.html',
    'client/san-pham.html',
    'client/danh-muc-cotton.html',
    'client/danh-muc-ca-sau.html',
    'client/danh-muc-the-thao.html',
    'client/danh-muc-me-luoi.html',
    'client/danh-muc-ni-da-ca.html',
    'client/gioi-thieu.html',
    'client/lien-he.html',
    'client/du-an.html',
    'client/chuyen-muc-dich-vu.html'
]

broken = []

for page in pages_to_check:
    if not os.path.exists(page):
        continue
    with open(page, 'r', encoding='utf-8') as f:
        html = f.read()
    # Find all <a> tags href
    a_hrefs = re.findall(r'<a\s+[^>]*href=["\']([^"\'#][^"\']*)["\']', html, re.IGNORECASE)
    for h in set(a_hrefs):
        if h.startswith(('http://', 'https://', 'tel:', 'mailto:', 'javascript:')):
            continue
        clean_h = h.split('?')[0]
        if clean_h.startswith('//'):
            continue
        target1 = os.path.normpath(os.path.join(os.path.dirname(page), clean_h))
        target2 = os.path.normpath(os.path.join('client', clean_h))
        target3 = os.path.normpath(os.path.join('client/public', clean_h))
        if not (os.path.exists(target1) or os.path.exists(target2) or os.path.exists(target3)):
            broken.append((page, h))

print(f"Total checked pages: {len(pages_to_check)}")
if broken:
    print(f"Found {len(broken)} broken <a> links:")
    for b in sorted(broken):
        print(f" - [{b[0]}] -> {b[1]}")
else:
    print("ALL <a> navigation links point to existing files!")
