import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

pages = {
    'gioi-thieu.html': 'source_thangmay1/gioi-thieu.html',
    'chuyen-muc-dich-vu.html': 'source_thangmay1/chuyen-muc-dich-vu.html',
    'lien-he.html': 'source_thangmay1/lien-he.html',
}

for name, path in pages.items():
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        c = f.read()
    print(f'==============================')
    print(f'PAGE: {name} (size: {len(c)} bytes)')
    # find page title / banner
    m_title = re.search(r'<div class="page-title[^>]*>(.*?)</div>', c, re.DOTALL)
    if m_title:
        print('PAGE TITLE WRAPPER:', re.sub(r'<[^>]+>', ' ', m_title.group(1)).strip())
    
    # find all headings inside main
    m_main = re.search(r'<main[^>]*>(.*?)</main>', c, re.DOTALL)
    if m_main:
        headings = re.findall(r'<h[1-6][^>]*>(.*?)</h[1-6]>', m_main.group(1), re.DOTALL)
        print('HEADINGS IN MAIN:')
        for h in headings:
            clean_h = re.sub(r'<[^>]+>', '', h).strip()
            if clean_h:
                print('  -', clean_h)
        # find images in main
        imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', m_main.group(1))
        print('IMAGES IN MAIN (first 10):')
        for img in imgs[:10]:
            print('  *', img)
