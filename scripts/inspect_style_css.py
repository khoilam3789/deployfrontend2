import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('source_thangmay1/css/style.css', 'r', encoding='utf-8', errors='ignore') as f:
    style_css = f.read()

font_faces = re.findall(r'@font-face\s*\{[^}]+\}', style_css)
print('Font-faces in style.css:', len(font_faces))
for ff in font_faces:
    print(ff)

print('\nRules in style.css using font-family:')
for line in style_css.split('\n'):
    if 'font-family' in line:
        print(' ', line.strip())
