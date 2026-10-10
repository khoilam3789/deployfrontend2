import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

for css_path in ['source_thangmay1/css/flatsome.css', 'source_thangmay1/css/style.css']:
    try:
        with open(css_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        fams = re.findall(r'font-family\s*:\s*([^;\}]+)', content)
        print(f'=== {css_path} font families ({len(fams)}) ===')
        for f in set(fams):
            print('  ', f.strip())
    except Exception as e:
        print(f'Error reading {css_path}:', e)
