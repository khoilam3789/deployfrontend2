import urllib.request, os, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Let's test github raw or cdnjs
urls = {
    'PlusJakartaSans-Bold.ttf': 'https://raw.githubusercontent.com/tokotype/Plus-Jakarta-Sans/master/fonts/ttf/PlusJakartaSans-Bold.ttf',
    'PlusJakartaSans-Regular.ttf': 'https://raw.githubusercontent.com/tokotype/Plus-Jakarta-Sans/master/fonts/ttf/PlusJakartaSans-Regular.ttf',
    'PlusJakartaSans-SemiBold.ttf': 'https://raw.githubusercontent.com/tokotype/Plus-Jakarta-Sans/master/fonts/ttf/PlusJakartaSans-SemiBold.ttf',
    'PlusJakartaSans-Medium.ttf': 'https://raw.githubusercontent.com/tokotype/Plus-Jakarta-Sans/master/fonts/ttf/PlusJakartaSans-Medium.ttf',
}

headers = {'User-Agent': 'Mozilla/5.0'}

os.makedirs('source_thangmay1/css/font', exist_ok=True)
os.makedirs('client/public/css/font', exist_ok=True)

for fname, url in urls.items():
    print(f'Downloading {fname} from {url}...')
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            print(f'Downloaded {fname}: {len(data)} bytes')
            with open(f'source_thangmay1/css/font/{fname}', 'wb') as f:
                f.write(data)
            with open(f'client/public/css/font/{fname}', 'wb') as f:
                f.write(data)
    except Exception as e:
        print(f'Error downloading {fname}:', e)
