import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('source_thangmay1/index.original.html', 'r', encoding='utf-8') as f:
    orig = f.read()

# Look at all font links in <head>
head = orig[:orig.find('</head>')]
for line in head.split('\n'):
    if any(k in line.lower() for k in ['font', 'family', 'roboto', 'sans', 'typography', 'google']):
        print('HEAD:', line.strip())

# Look at custom-css
custom_css_match = re.search(r'<style id="custom-css"[^>]*>(.*?)</style>', orig, re.DOTALL)
if custom_css_match:
    print('\n=== CUSTOM-CSS FONT DECLARATIONS ===')
    for line in custom_css_match.group(1).split(';'):
        if 'font' in line.lower():
            print(' ', line.strip())
