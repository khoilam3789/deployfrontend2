import sys, io, re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('client/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Header nav
print("=== HEADER NAV LINKS ===")
nav = re.search(r'<ul\s+class="[^"]*header-nav[^"]*"[\s\S]*?</ul>', text)
if nav:
    links = re.findall(r'<a\s+[^>]*href="([^"]*)"[^>]*>(.*?)</a>', nav.group(0), re.DOTALL)
    for h, c in links:
        t = re.sub(r'<[^>]+>', '', c).strip()
        print(f"{h:40} | {t}")

# 2. Offcanvas Mobile Menu
print("\n=== OFFCANVAS MOBILE MENU LINKS ===")
mobile = re.search(r'<div id="main-menu"[\s\S]*?</div>\s*</div>', text)
if mobile:
    links = re.findall(r'<a\s+[^>]*href="([^"]*)"[^>]*>(.*?)</a>', mobile.group(0), re.DOTALL)
    for h, c in links:
        t = re.sub(r'<[^>]+>', '', c).strip()
        print(f"{h:40} | {t}")

# 3. Mobile footer dock
print("\n=== MOBILE FOOTER DOCK ===")
footer_dock = re.search(r'<div id="azt-contact-footer"[\s\S]*?</div>', text)
if footer_dock:
    links = re.findall(r'<a\s+[^>]*href="([^"]*)"[^>]*>(.*?)</a>', footer_dock.group(0), re.DOTALL)
    for h, c in links:
        t = re.sub(r'<[^>]+>', '', c).strip()
        print(f"{h:40} | {t}")
