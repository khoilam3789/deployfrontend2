import shutil
import os

shutil.copyfile('client/index.html', 'client/index.react.html')
print('Backed up client/index.html')

with open('source_thangmay1/index.html', 'r', encoding='utf-8') as f:
    clone_html = f.read()

# Add <base href="/"> right after <head>
clone_html = clone_html.replace('<head>', '<head>\n<base href="/">')

with open('client/index.html', 'w', encoding='utf-8') as f:
    f.write(clone_html)

print('Updated client/index.html successfully! Size:', os.path.getsize('client/index.html'))
