import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('source_thangmay1/index.original.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'PlusJakartaSans' in line:
        start = max(0, i - 30)
        end = min(len(lines), i + 35)
        for j in range(start, end):
            print(f'{j+1}: {lines[j].rstrip()}')
