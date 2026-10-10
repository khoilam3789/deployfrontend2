import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('source_thangmay1/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

links = re.findall(r'<a\s+[^>]*href=["\']([^"\']*)["\'][^>]*>(.*?)</a>', text, re.DOTALL)
print(f"Total links found: {len(links)}")
for href, content in links:
    clean_text = re.sub(r'<[^>]+>', '', content).strip()
    clean_text = re.sub(r'\s+', ' ', clean_text)
buttons = re.findall(r'<a\s+[^>]*class=["\'][^"\']*button[^"\']*["\'][^>]*>.*?</a>', text, re.DOTALL)
print(f"\nTotal buttons found: {len(buttons)}")
for b in buttons:
    print(re.sub(r'\s+', ' ', b))

