import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

for name in ['gioi-thieu.html', 'lien-he.html', 'chuyen-muc-dich-vu.html']:
    with open(f'source_thangmay1/{name}', 'r', encoding='utf-8', errors='ignore') as f:
        c = f.read()
    m = re.search(r'(<main id="main"[^>]*>[\s\S]*?</main>)', c)
    if m:
        content = m.group(1)
        print(f'=== MAIN CONTENT OF {name} ({len(content)} chars) ===')
        # Print first 2000 chars of main
        print(content[:2500])
        print('\n... [TRUNCATED] ...\n')
