import os, time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

media_dir = r"C:\Users\Doan Nam\.gemini\antigravity-ide\brain\5509dce1-6f06-4cf6-8a40-8472ec643e2c\.tempmediaStorage"
chrome_options = Options()
chrome_options.add_argument("--headless=new")
chrome_options.add_argument("--window-size=1440,950")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=chrome_options)
try:
    print("--- 1. TESTING SONG KING STYLE ARCHIVE PAGE (port 8080) ---")
    driver.get("http://localhost:8080/tin-tuc.html")
    time.sleep(2)
    print("Title:", driver.title)
    s1 = os.path.join(media_dir, f"media_songking_archive_{int(time.time()*1000)}.png")
    driver.save_screenshot(s1)
    print("Saved archive screenshot:", s1)

    # Check featured post
    assert "Quy Mô Xưởng Dệt" in driver.page_source, "Featured post must be visible"
    
    # Check date badges (e.g. 18/07, 09/07, 27/06, 28/05)
    assert "18/07" in driver.page_source, "Featured date badge 18/07 must exist"
    assert "09/07" in driver.page_source, "Date badge 09/07 must exist"
    assert "27/06" in driver.page_source, "Date badge 27/06 must exist"
    
    # Check Header menu text
    header_nav = driver.find_element(By.XPATH, "//header//a[contains(text(), 'Tin tức vải thun')]")
    print("Header link found:", header_nav.text, "Href:", header_nav.get_attribute("href"))

    print("\n--- 2. TESTING FACTORY SCALE ARTICLE WITH PHOTOS ---")
    driver.get("http://localhost:8080/tin-tuc-quy-mo-xuong-det-va-nang-luc-san-xuat-vai-thun-tien-phat-dat.html")
    time.sleep(2)
    print("Article Title:", driver.title)
    s2 = os.path.join(media_dir, f"media_factory_article_top_{int(time.time()*1000)}.png")
    driver.save_screenshot(s2)
    print("Saved article top screenshot:", s2)

    # Scroll down to machines & fabric photos
    driver.execute_script("window.scrollTo(0, 1100);")
    time.sleep(1)
    s3 = os.path.join(media_dir, f"media_factory_article_machines_{int(time.time()*1000)}.png")
    driver.save_screenshot(s3)
    print("Saved article machines screenshot:", s3)

    driver.execute_script("window.scrollTo(0, 2200);")
    time.sleep(1)
    s4 = os.path.join(media_dir, f"media_factory_article_raw_fabric_{int(time.time()*1000)}.png")
    driver.save_screenshot(s4)
    print("Saved article raw fabrics screenshot:", s4)

    # Verify all 5 images are loaded on the page
    images = driver.find_elements(By.CSS_SELECTOR, ".article-content img")
    print(f"Found {len(images)} images in article body")
    for img in images:
        print(" - Image src:", img.get_attribute("src"))
    assert len(images) >= 5, "Must have all 5 photos in article content"

    print("\n--- 3. TESTING REACT SPA LISTING (port 3000) ---")
    driver.get("http://localhost:3000/tin-tuc")
    time.sleep(2)
    s5 = os.path.join(media_dir, f"media_react_tin_tuc_{int(time.time()*1000)}.png")
    driver.save_screenshot(s5)
    print("Saved react tin-tuc screenshot:", s5)

    print("\nALL VERIFICATIONS PASSED 100%!")

finally:
    driver.quit()
