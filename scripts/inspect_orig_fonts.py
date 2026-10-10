import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('source_thangmay1/index.original.html', 'r', encoding='utf-8') as f:
    orig = f.read()

print('File size:', len(orig))

# Search for font links
font_links = re.findall(r'<link[^>]+font[^>]+>', orig, re.IGNORECASE)
for l in font_links:
    print('Font link:', l)

# Search for @font-face
font_faces = re.findall(r'@font-face\s*\{[^}]+\}', orig)
for ff in font_faces:
    print('Font face:', ff)

# Search for font-family
font_fams = re.findall(r'font-family\s*:\s*([^;\}]+)', orig)
print('\nUnique font families in index.original.html:')
for ff in sorted(list(set([f.strip() for f in font_fams]))):
    print(' -', ff)

# Search for custom-css or style tags mentioning font
styles = re.findall(r'<style[^>]*>(.*?)</style>', orig, re.DOTALL)
for s in styles:
    if 'font-family' in s:
        print('\n--- Style with font-family: ---')
        for line in s.split('\n'):
            if 'font' in line:
                print('  ', line.strip())
