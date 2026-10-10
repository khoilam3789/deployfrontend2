import urllib.request, re, sys, io, os

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Google fonts css endpoint
# Requesting with user agent that gets woff2 or ttf
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
req = urllib.request.Request('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap', headers=headers)

with urllib.request.urlopen(req) as resp:
    css_content = resp.read().decode('utf-8')
    print('Google Fonts CSS received length:', len(css_content))
    print(css_content[:500])

# Also let's check SVN-Unthrift: what is SVN-Unthrift?
# SVN-Unthrift is a Vietnamese calligraphic / brush display font (Unthrift font việt hóa bởi Styleno.1 Fonts)
