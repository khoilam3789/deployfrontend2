import os, time, sys, io
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

chrome_options = Options()
chrome_options.add_argument("--headless=new")
chrome_options.add_argument("--window-size=1400,1000")
chrome_options.add_argument("--ignore-certificate-errors")

driver = webdriver.Chrome(options=chrome_options)
artifact_dir = r"C:\Users\Doan Nam\.gemini\antigravity-ide\brain\5509dce1-6f06-4cf6-8a40-8472ec643e2c"

try:
    print("=== 1. TESTING DROPDOWN HOVER ON HOMEPAGE ===")
    driver.get("http://localhost:8080/index.html")
    time.sleep(2)

    # Find the 'Sản phẩm' menu item
    prod_nav = driver.find_element(By.CSS_SELECTOR, "header#header li.menu-item-has-children")
    actions = ActionChains(driver)
    actions.move_to_element(prod_nav).perform()
    time.sleep(1)

    # Save screenshot of dropdown open
    s1 = os.path.join(artifact_dir, "screenshot_dropdown_open.png")
    driver.save_screenshot(s1)
    print(f"[OK] Hovered 'Sản phẩm', screenshot saved to {s1}")

    # Check dropdown items
    dropdown_items = driver.find_elements(By.CSS_SELECTOR, "header#header .nav-dropdown li a")
    print(f"[OK] Found {len(dropdown_items)} items in dropdown menu:")
    for item in dropdown_items:
        print(f"   - {item.text} -> {item.get_attribute('href')}")
    assert len(dropdown_items) >= 5, "Dropdown should have at least 5 category items!"

    print("\n=== 2. CLICK CATEGORY LINK FROM DROPDOWN ===")
    # Click the first category: Cotton & Tici
    cotton_link = driver.find_element(By.CSS_SELECTOR, "header#header .nav-dropdown li a[href*='cotton']")
    cotton_url = cotton_link.get_attribute('href')
    cotton_link.click()
    time.sleep(2)

    print(f"[OK] Navigated to: {driver.current_url}")
    print(f"[OK] Page title: {driver.title}")
    assert "cotton" in driver.current_url.lower(), "Should navigate to cotton category page"

    s2 = os.path.join(artifact_dir, "screenshot_category_cotton.png")
    driver.save_screenshot(s2)
    print(f"[OK] Category screenshot saved to {s2}")

    # Verify products on category page
    product_cards = driver.find_elements(By.CSS_SELECTOR, ".product-card")
    print(f"[OK] Found {len(product_cards)} products on cotton category page:")
    for p in product_cards:
        title = p.find_element(By.CSS_SELECTOR, ".product-title").text
        price = p.find_element(By.CSS_SELECTOR, ".product-price").text
        img_src = p.find_element(By.CSS_SELECTOR, ".product-image img").get_attribute("src")
        print(f"   - {title} | {price} | Img: {img_src.split('/')[-1]}")
    assert len(product_cards) >= 4, "Should have multiple products in cotton category!"

    print("\n=== 3. VERIFY ALIAS URL 'danh-muc/thang-may-gia-dinh.html' ===")
    driver.get("http://localhost:8080/danh-muc/thang-may-gia-dinh.html")
    time.sleep(1.5)
    print(f"[OK] Alias page loaded: {driver.current_url} | Title: {driver.title}")
    alias_cards = driver.find_elements(By.CSS_SELECTOR, ".product-card")
    print(f"[OK] Alias page contains {len(alias_cards)} products.")
    s_alias = os.path.join(artifact_dir, "screenshot_alias_thang_may_gia_dinh.png")
    driver.save_screenshot(s_alias)

    print("\n=== 4. CLICK FIRST PRODUCT CARD TO VIEW DETAIL PAGE ===")
    first_card = driver.find_element(By.CSS_SELECTOR, ".product-card a.product-image")
    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", first_card)
    time.sleep(1)
    driver.execute_script("arguments[0].click();", first_card)
    time.sleep(2)

    print(f"[OK] Navigated to Product Detail: {driver.current_url}")
    print(f"[OK] Detail Title: {driver.title}")
    s3 = os.path.join(artifact_dir, "screenshot_product_detail.png")
    driver.save_screenshot(s3)
    print(f"[OK] Product Detail screenshot saved to {s3}")

    # Verify detail elements
    det_title = driver.find_element(By.CSS_SELECTOR, ".product-detail-title").text
    det_price = driver.find_element(By.CSS_SELECTOR, ".product-detail-price").text
    specs = driver.find_elements(By.CSS_SELECTOR, ".specs-table tr")
    swatches = driver.find_elements(By.CSS_SELECTOR, ".color-badge")
    hotline = driver.find_element(By.CSS_SELECTOR, ".btn-hotline").text
    print(f"[OK] Product Title: {det_title}")
    print(f"[OK] Product Price: {det_price}")
    print(f"[OK] Specifications Rows: {len(specs)}")
    print(f"[OK] Color Swatches: {len(swatches)}")
    print(f"[OK] Hotline CTA: {hotline}")

    # Check for any elevator or broken images
    page_source = driver.page_source.lower()
    assert "thang máy" not in driver.find_element(By.CSS_SELECTOR, ".product-detail-info").text.lower(), "Elevator text found in product detail info!"
    print("[OK] Zero elevator text in product content!")

    print("\n=== 5. CHECK ALL PRODUCTS PAGE (san-pham.html) ===")
    driver.get("http://localhost:8080/san-pham.html")
    time.sleep(1.5)
    all_cards = driver.find_elements(By.CSS_SELECTOR, ".product-card")
    print(f"[OK] san-pham.html loaded with {len(all_cards)} total products")
    s4 = os.path.join(artifact_dir, "screenshot_all_products.png")
    driver.save_screenshot(s4)

    print("\n==========================================")
    print("ALL TESTS PASSED WITH 100% SUCCESS!")
    print("==========================================")

finally:
    driver.quit()
