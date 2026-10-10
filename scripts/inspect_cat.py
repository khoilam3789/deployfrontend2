import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

text = open('source_thangmay1/danh-muc-thang-may-gia-dinh.html', encoding='utf-8').read()
m = re.search(r'<main id=["\']main["\'][\s\S]*?</main>', text)
if m:
    print('Main length:', len(m.group(0)))
    print(m.group(0)[:1500])
    print('\n... Products in category ...\n')
    titles = re.findall(r'<p class=["\']name product-title[^>]*>.*?<a[^>]*>(.*?)</a>', m.group(0), re.DOTALL)
    print('Found products:', len(titles))
    for t in titles[:10]:
        print(' -', t.strip())
else:
    print('No main tag found')
