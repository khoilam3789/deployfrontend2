import urllib.request, os, sys, io, shutil

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

font_downloads = {
    'PlusJakartaSans-Regular.ttf': 'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU7NSg.ttf',
    'PlusJakartaSans-Medium.ttf': 'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_m07NSg.ttf',
    'PlusJakartaSans-SemiBold.ttf': 'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_d0nNSg.ttf',
    'PlusJakartaSans-Bold.ttf': 'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_TknNSg.ttf',
    'PlusJakartaSans-ExtraBold.ttf': 'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KUnNSg.ttf',
}

dirs = [
    'source_thangmay1/css/font',
    'source_thangmay1/fonts',
    'client/public/css/font',
    'client/public/fonts',
]

for d in dirs:
    os.makedirs(d, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0'}

for fname, url in font_downloads.items():
    print(f'Downloading {fname}...')
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = resp.read()
        print(f'Downloaded {fname}: {len(data)} bytes')
        for d in dirs:
            target_path = os.path.join(d, fname)
            with open(target_path, 'wb') as f:
                f.write(data)
            print(f'  Saved to {target_path}')

print('All Plus Jakarta Sans fonts successfully saved!')
