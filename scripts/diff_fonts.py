import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('source_thangmay1/index.original.html', 'r', encoding='utf-8') as f:
    orig = f.read()

with open('source_thangmay1/index.html', 'r', encoding='utf-8') as f:
    current = f.read()

# Let's see what font styles or font-faces exist in index.original.html
print("=== ORIG FONT-FACE & FONT-FAMILY ===")
for ff in re.findall(r'@font-face\s*\{[^}]+\}', orig):
    print(ff[:120])

# Look for all font-family definitions in orig
print("\n=== ORIG FONT-FAMILY OCCURRENCES ===")
for m in re.finditer(r'font-family\s*:\s*([^;\}]+)', orig):
    snippet = orig[max(0, m.start()-50):min(len(orig), m.end()+30)]
    print(snippet.replace('\n', ' '))

print("\n=== CURRENT FONT-FAMILY OCCURRENCES ===")
for m in re.finditer(r'font-family\s*:\s*([^;\}]+)', current):
    snippet = current[max(0, m.start()-50):min(len(current), m.end()+30)]
    print(snippet.replace('\n', ' '))
