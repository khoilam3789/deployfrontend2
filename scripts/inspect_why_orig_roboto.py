import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('source_thangmay1/index.original.html', 'r', encoding='utf-8') as f:
    orig = f.read()

# Check how style.css is linked in index.original.html
import re
print('style.css link in orig:')
for m in re.finditer(r'<link[^>]+style\.css[^>]*>', orig):
    print(' ', m.group(0))

# Check where style.css is on disk
import os
print('css/style.css on disk exists?', os.path.exists('source_thangmay1/css/style.css'))
