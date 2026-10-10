import urllib.request, os, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

urls = [
    'https://thangmay1.mauthemewp.com/wp-content/themes/flatsome-child/font/PlusJakartaSans-Bold.ttf',
    'https://thangmay1.mauthemewp.com/wp-content/themes/flatsome-child/font/PlusJakartaSans-Regular.ttf',
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://thangmay1.mauthemewp.com/'
}

for u in urls:
    filename = u.split('/')[-1]
    print(f'Fetching {filename}...')
    req = urllib.request.Request(u, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            print(f'Success! {filename}: {len(data)} bytes')
            os.makedirs('source_thangmay1/css/font', exist_ok=True)
            with open(f'source_thangmay1/css/font/{filename}', 'wb') as f:
                f.write(data)
    except Exception as e:
        print(f'Failed {filename}:', e)
