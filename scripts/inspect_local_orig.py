import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-gpu')
options.add_argument('--window-size=1920,1080')

driver = webdriver.Chrome(options=options)
try:
    print('Loading http://localhost:8080/index.original.html ...')
    driver.get('http://localhost:8080/index.original.html')
    import time
    time.sleep(3)
    
    script = """
    function getFont(sel) {
        var el = document.querySelector(sel);
        if (!el) return 'NOT_FOUND';
        var cs = window.getComputedStyle(el);
        return {
            fontFamily: cs.fontFamily,
            fontWeight: cs.fontWeight,
            fontSize: cs.fontSize,
            lineHeight: cs.lineHeight
        };
    }
    return {
        body: getFont('body'),
        nav_a: getFont('.header-main .nav > li > a'),
        banner_h2: getFont('.banner .section-title-main, .banner h2'),
        banner_p: getFont('.banner p'),
        heading_rt03: getFont('#row-527887637 .heading, .section.rt03 .heading'),
        heading_rt04: getFont('#row-1838586398 .heading, .section.rt04 .heading'),
        button_span: getFont('a.button span'),
        footer_title: getFont('footer h3, footer h4, .footer-widgets h3'),
        post_title: getFont('.post-item .box-text h5, .post-item h5')
    };
    """
    res = driver.execute_script(script)
    for k, v in res.items():
        print(f'{k}: {v}')
        
    driver.save_screenshot('d:/lamho/cuahangvaithun/local_index_original.png')
    print('Saved screenshot to d:/lamho/cuahangvaithun/local_index_original.png')
except Exception as e:
    print('Error inspecting local index.original.html:', e)
finally:
    driver.quit()
