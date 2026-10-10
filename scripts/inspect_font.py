import urllib.request, re, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

req = urllib.request.Request(
    'https://thangmay1.mauthemewp.com/',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
)
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print('Fetched HTML length:', len(html))
        fonts = re.findall(r'fonts[^\'\"\s\)]+', html)
        print('Font occurrences in HTML:')
        for f in set(fonts):
            if 'font' in f.lower() or 'woff' in f or 'ttf' in f:
                print('  ', f)
        font_families = re.findall(r'font-family\s*:\s*([^;\}]+)', html)
        print('Font families in HTML:')
        for ff in set(font_families):
            print('  ', ff.strip())
        
        # Also check style.css or flatsome.css links
        css_links = re.findall(r'href=[\'\"]([^\'\"]+\.css[^\'\"]*)[\'\"]', html)
        print('CSS links count:', len(css_links))
        for c in css_links:
            print('  CSS:', c)
except Exception as e:
    print('Error:', e)
