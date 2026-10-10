import os
import sys
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

media_dir = r"C:\Users\Doan Nam\.gemini\antigravity-ide\brain\5509dce1-6f06-4cf6-8a40-8472ec643e2c\.tempmediaStorage"
os.makedirs(media_dir, exist_ok=True)

chrome_options = Options()
chrome_options.add_argument("--headless=new")
chrome_options.add_argument("--window-size=1440,900")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-gpu")

driver = webdriver.Chrome(options=chrome_options)
driver.set_page_load_timeout(30)

try:
    print("--- 1. TESTING TIN TUC STANDALONE PAGE (port 8080) ---")
    driver.get("http://localhost:8080/tin-tuc.html")
    time.sleep(2)
    print("Title:", driver.title)
    assert "Tin Tức" in driver.title or "Vải Thun" in driver.title
    screenshot_1 = os.path.join(media_dir, f"media_{int(time.time()*1000)}.png")
    driver.save_screenshot(screenshot_1)
    print("Saved tin-tuc listing screenshot:", screenshot_1)

    # Check articles present
    articles = driver.find_elements(By.CSS_SELECTOR, ".post-card")
    print(f"Found {len(articles)} article cards on tin-tuc.html")
    assert len(articles) >= 4, "Should have at least 4 news articles"

    # Click first article
    first_title = articles[0].find_element(By.CSS_SELECTOR, "h3 a")
    first_title_text = first_title.text
    print("Clicking first article:", first_title_text)
    driver.execute_script("arguments[0].click();", first_title)
    time.sleep(2)
    print("Current URL:", driver.current_url)
    assert "tin-tuc-" in driver.current_url, "URL should be an article detail page"
    screenshot_2 = os.path.join(media_dir, f"media_{int(time.time()*1000)}.png")
    driver.save_screenshot(screenshot_2)
    print("Saved article detail screenshot:", screenshot_2)

    # Check breadcrumb in article
    breadcrumbs = driver.find_elements(By.CSS_SELECTOR, ".tpd-breadcrumbs a")
    print(f"Found {len(breadcrumbs)} breadcrumb links")

    print("\n--- 2. TESTING HEADER NAVIGATION FROM HOMEPAGE ---")
    driver.get("http://localhost:8080/index.html")
    time.sleep(2)
    news_nav_link = driver.find_element(By.XPATH, "//header//a[contains(text(), 'Tin tức') or contains(text(), 'Tin Tức')]")
    print("News Nav Href:", news_nav_link.get_attribute("href"))
    assert "tin-tuc.html" in news_nav_link.get_attribute("href"), "Header link must point to tin-tuc.html, not #tin-tuc"
    driver.execute_script("arguments[0].click();", news_nav_link)
    time.sleep(2)
    print("Navigated to:", driver.current_url)
    assert "tin-tuc.html" in driver.current_url

    print("\n--- 3. TESTING ADMIN LOGIN & DASHBOARD (port 3000) ---")
    driver.get("http://localhost:3000/admin/login")
    time.sleep(2)
    print("Admin login title:", driver.title)
    screenshot_3 = os.path.join(media_dir, f"media_{int(time.time()*1000)}.png")
    driver.save_screenshot(screenshot_3)
    print("Saved admin login screenshot:", screenshot_3)

    # Fill login form
    username_input = driver.find_element(By.NAME, "username") if driver.find_elements(By.NAME, "username") else driver.find_element(By.XPATH, "//input[@type='text']")
    password_input = driver.find_element(By.NAME, "password") if driver.find_elements(By.NAME, "password") else driver.find_element(By.XPATH, "//input[@type='password']")
    submit_btn = driver.find_element(By.XPATH, "//button[@type='submit']")

    username_input.clear()
    username_input.send_keys("admin")
    password_input.clear()
    password_input.send_keys("TienPhatDat@2026")
    submit_btn.click()

    time.sleep(3)
    print("After login URL:", driver.current_url)
    screenshot_4 = os.path.join(media_dir, f"media_{int(time.time()*1000)}.png")
    driver.save_screenshot(screenshot_4)
    print("Saved admin dashboard screenshot:", screenshot_4)

    # Check dashboard elements
    page_text = driver.page_source
    assert "Hệ Thống Quản Trị" in page_text or "Tiến Phát Đạt" in page_text or "Tổng Sản Phẩm" in page_text, "Should be on admin dashboard"

    # Click Products tab if present
    product_links = driver.find_elements(By.XPATH, "//a[contains(text(), 'Sản phẩm') or contains(text(), 'Quản lý sản phẩm')]")
    if product_links:
        product_links[0].click()
        time.sleep(2)
        print("Navigated to Products management:", driver.current_url)
        screenshot_5 = os.path.join(media_dir, f"media_{int(time.time()*1000)}.png")
        driver.save_screenshot(screenshot_5)
        print("Saved admin products screenshot:", screenshot_5)

    # Click Posts tab if present
    post_links = driver.find_elements(By.XPATH, "//a[contains(text(), 'Bài viết') or contains(text(), 'Tin tức')]")
    if post_links:
        post_links[0].click()
        time.sleep(2)
        print("Navigated to Posts management:", driver.current_url)
        screenshot_6 = os.path.join(media_dir, f"media_{int(time.time()*1000)}.png")
        driver.save_screenshot(screenshot_6)
        print("Saved admin posts screenshot:", screenshot_6)

    print("\nALL VERIFICATIONS PASSED SUCCESSFULLY!")

finally:
    driver.quit()
