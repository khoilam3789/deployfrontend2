import os, time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

media_dir = r"C:\Users\Doan Nam\.gemini\antigravity-ide\brain\5509dce1-6f06-4cf6-8a40-8472ec643e2c\.tempmediaStorage"
chrome_options = Options()
chrome_options.add_argument("--headless=new")
chrome_options.add_argument("--window-size=1440,900")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=chrome_options)
try:
    # 1. Login
    driver.get("http://localhost:3000/admin/login")
    time.sleep(1.5)
    u = driver.find_element(By.XPATH, "//input[@type='text']")
    p = driver.find_element(By.XPATH, "//input[@type='password']")
    btn = driver.find_element(By.XPATH, "//button[@type='submit']")
    
    # Select all and replace
    u.send_keys(Keys.CONTROL + "a")
    u.send_keys(Keys.BACKSPACE)
    u.send_keys("admin")
    
    p.send_keys(Keys.CONTROL + "a")
    p.send_keys(Keys.BACKSPACE)
    p.send_keys("TienPhatDat@2026")
    
    driver.execute_script("arguments[0].click();", btn)
    time.sleep(3)
    print("Logged in, URL:", driver.current_url)

    # 2. Click sidebar link: Quản lý Sản phẩm
    prod_link = driver.find_element(By.XPATH, "//a[contains(@href, '/admin/products')]")
    driver.execute_script("arguments[0].click();", prod_link)
    time.sleep(2)
    print("Navigated to products, URL:", driver.current_url)
    s1 = os.path.join(media_dir, f"media_products_{int(time.time()*1000)}.png")
    driver.save_screenshot(s1)
    print("Saved products screenshot:", s1)

    # 3. Click sidebar link: Quản lý Bài viết
    post_link = driver.find_element(By.XPATH, "//a[contains(@href, '/admin/posts')]")
    driver.execute_script("arguments[0].click();", post_link)
    time.sleep(2)
    print("Navigated to posts, URL:", driver.current_url)
    s2 = os.path.join(media_dir, f"media_posts_{int(time.time()*1000)}.png")
    driver.save_screenshot(s2)
    print("Saved posts screenshot:", s2)

    # 4. Click sidebar link: Yêu cầu Báo giá
    quote_link = driver.find_element(By.XPATH, "//a[contains(@href, '/admin/quotes')]")
    driver.execute_script("arguments[0].click();", quote_link)
    time.sleep(2)
    print("Navigated to quotes, URL:", driver.current_url)
    s3 = os.path.join(media_dir, f"media_quotes_{int(time.time()*1000)}.png")
    driver.save_screenshot(s3)
    print("Saved quotes screenshot:", s3)

    print("ALL ADMIN SUBPAGES VERIFIED!")

finally:
    driver.quit()
