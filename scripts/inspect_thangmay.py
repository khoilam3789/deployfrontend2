import re
import json

with open('source_thangmay1/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find all image sources
img_matches = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
print(f"Total img tags: {len(img_matches)}")
for i, src in enumerate(img_matches):
    print(f"{i}: {src}")

# Find all background images
bg_matches = re.findall(r'url\(["\']?([^"\')]+)["\']?\)', html)
print(f"\nTotal background urls: {len(bg_matches)}")
for i, bg in enumerate(set(bg_matches)):
    print(f"bg {i}: {bg}")
