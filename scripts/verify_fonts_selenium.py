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
    driver.get('http://localhost:8080/index.html')
    # Wait for document ready
    import time
    time.sleep(2)
    
    # Check computed fonts
    h1_font = driver.execute_script("return window.getComputedStyle(document.querySelector('h1') || document.querySelector('.heading') || document.body).fontFamily;")
    body_font = driver.execute_script("return window.getComputedStyle(document.body).fontFamily;")
    nav_font = driver.execute_script("var el = document.querySelector('.header-main .nav > li > a'); return el ? window.getComputedStyle(el).fontFamily : 'not found';")
    banner_font = driver.execute_script("var el = document.querySelector('.banner h1, .banner h2, .banner .text-inner h2'); return el ? window.getComputedStyle(el).fontFamily : 'not found';")
    
    print('Computed body font:', body_font)
    print('Computed h1/heading font:', h1_font)
    print('Computed nav font:', nav_font)
    print('Computed banner font:', banner_font)
    
    driver.save_screenshot('d:/lamho/cuahangvaithun/selenium_preview_port8080.png')
    print('Saved screenshot to d:/lamho/cuahangvaithun/selenium_preview_port8080.png')

    # Also test port 3000
    try:
        driver.get('http://localhost:3000/')
        time.sleep(2)
        driver.save_screenshot('d:/lamho/cuahangvaithun/selenium_preview_port3000.png')
        print('Saved screenshot to d:/lamho/cuahangvaithun/selenium_preview_port3000.png')
    except Exception as e3:
        print('Port 3000 error:', e3)

finally:
    driver.quit()
