import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-gpu')
options.add_argument('--window-size=1920,1080')
options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

driver = webdriver.Chrome(options=options)
try:
    print('Navigating to https://thangmay1.mauthemewp.com/ ...')
    driver.get('https://thangmay1.mauthemewp.com/')
    import time
    time.sleep(3)
    
    print('Page title:', driver.title)
    
    # Check computed fonts on actual elements
    script = """
    return {
        body: window.getComputedStyle(document.body).fontFamily,
        h1: document.querySelector('h1') ? window.getComputedStyle(document.querySelector('h1')).fontFamily : null,
        h2: document.querySelector('h2') ? window.getComputedStyle(document.querySelector('h2')).fontFamily : null,
        h3: document.querySelector('h3') ? window.getComputedStyle(document.querySelector('h3')).fontFamily : null,
        heading: document.querySelector('.heading') ? window.getComputedStyle(document.querySelector('.heading')).fontFamily : null,
        nav_link: document.querySelector('.header-main .nav > li > a') ? window.getComputedStyle(document.querySelector('.header-main .nav > li > a')).fontFamily : null,
        banner_title: document.querySelector('.banner h1, .banner h2, .banner .text-inner h2') ? window.getComputedStyle(document.querySelector('.banner h1, .banner h2, .banner .text-inner h2')).fontFamily : null,
        button: document.querySelector('.button, a.button, .button span') ? window.getComputedStyle(document.querySelector('.button, a.button, .button span')).fontFamily : null,
        p: document.querySelector('p') ? window.getComputedStyle(document.querySelector('p')).fontFamily : null
    };
    """
    fonts = driver.execute_script(script)
    for k, v in fonts.items():
        print(f'{k}: {v}')
        
    driver.save_screenshot('d:/lamho/cuahangvaithun/orig_live_thangmay1.png')
    print('Saved live original screenshot to d:/lamho/cuahangvaithun/orig_live_thangmay1.png')
except Exception as e:
    print('Error inspecting live thangmay1:', e)
finally:
    driver.quit()
