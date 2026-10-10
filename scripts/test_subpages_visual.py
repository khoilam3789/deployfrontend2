import os, time, sys, io
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

chrome_options = Options()
chrome_options.add_argument("--headless=new")
chrome_options.add_argument("--window-size=1400,1000")
chrome_options.add_argument("--ignore-certificate-errors")

driver = webdriver.Chrome(options=chrome_options)
artifact_dir = r"C:\Users\Doan Nam\.gemini\antigravity-ide\brain\5509dce1-6f06-4cf6-8a40-8472ec643e2c"

print("--- TESTING HEADER NAVIGATION CLICK ON ALL LINKS ---")
driver.get("http://localhost:8080/index.html")
time.sleep(2)

nav_tests = [
    ("Giới thiệu", "a[href='gioi-thieu.html']", "gioi-thieu.html", "screenshot_nav_gioithieu.png"),
    ("Dịch vụ", "a[href='chuyen-muc-dich-vu.html']", "chuyen-muc-dich-vu.html", "screenshot_nav_dichvu.png"),
    ("Kho Vải", "a[href='du-an.html']", "du-an.html", "screenshot_nav_duan.png"),
    ("Liên hệ", "a[href='lien-he.html']", "lien-he.html", "screenshot_nav_lienhe.png"),
    ("Trang chủ", "a[href='index.html']", "index.html", "screenshot_nav_home.png")
]

for name, selector, expected_url, sname in nav_tests:
    driver.get("http://localhost:8080/index.html")
    time.sleep(1)
    
    # Locate link in header
    elem = driver.find_element(By.CSS_SELECTOR, f"header#header {selector}")
    href = elem.get_attribute("href")
    elem.click()
    time.sleep(2)
    
    cur_url = driver.current_url
    spath = os.path.join(artifact_dir, sname)
    driver.save_screenshot(spath)
    
    assert expected_url in cur_url, f"FAILED: Expected {expected_url} in {cur_url}"
    print(f"[OK] Header link '{name}' -> clicked -> {cur_url} (Title: {driver.title})")

print("\n--- ALL 5 HEADER NAVIGATION BUTTONS CLICKED AND VERIFIED SUCCESSFULLY! ---")
driver.quit()
