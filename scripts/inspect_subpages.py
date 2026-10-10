import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

for name in ['gioi-thieu.html', 'chuyen-muc-dich-vu.html', 'lien-he.html']:
    path = f'source_thangmay1/{name}'
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            c = f.read()
        m = re.search(r'<main[^>]*>(.*?)</main>', c, re.DOTALL)
        if m:
            main_text = re.sub(r'<[^>]+>', ' ', m.group(1))
            main_text = ' '.join(main_text.split())[:300]
            print(f'=== {name} === (Len: {len(c)})\nMain text snippet: {main_text}\n')
        else:
            print(f'=== {name} === No <main> found!\n')
    except Exception as e:
        print(f'Error reading {name}:', e)
