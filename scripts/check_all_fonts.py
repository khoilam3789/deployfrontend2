import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-gpu')
options.add_argument('--window-size=1920,1080')

driver = webdriver.Chrome(options=options)
try:
    for port in [8080, 3000]:
        driver.get(f'http://localhost:{port}/index.html' if port == 8080 else f'http://localhost:{port}/')
        time.sleep(2)
        
        # Check fonts of multiple elements
        script = """
        function getF(el) {
            if (!el) return 'NULL';
            var s = window.getComputedStyle(el);
            return s.fontFamily + ' | wt:' + s.fontWeight + ' | sz:' + s.fontSize;
        }
        return {
            body: getF(document.body),
            h1: getF(document.querySelector('h1')),
            h2: getF(document.querySelector('h2')),
            nav: getF(document.querySelector('.header-main .nav > li > a')),
            banner: getF(document.querySelector('.banner h2, .banner .section-title-main')),
            btn: getF(document.querySelector('a.button span, .button')),
            section_title: getF(document.querySelector('.section-title-main, .heading')),
            product_title: getF(document.querySelector('.product-title, .box-text h5')),
            post_title: getF(document.querySelector('.post-item h5, .post-item .box-text h5'))
        };
        """
        data = driver.execute_script(script)
        print(f'=== PORT {port} FONTS ===')
        for k, v in data.items():
            print(f'  {k}: {v}')
            
        driver.save_screenshot(f'd:/lamho/cuahangvaithun/full_check_port_{port}.png')
        print(f'Saved d:/lamho/cuahangvaithun/full_check_port_{port}.png')
finally:
    driver.quit()
