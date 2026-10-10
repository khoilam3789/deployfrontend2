import os
import glob
import re

def get_standard_main_menu():
    return """<div id="main-menu" class="mobile-sidebar no-scrollbar mfp-hide">
	<div class="sidebar-menu no-scrollbar ">
					<ul class="nav nav-sidebar nav-vertical nav-uppercase" data-tab="1">
				<li class="menu-item"><a href="index.html">Trang chủ</a></li>
<li class="menu-item"><a href="gioi-thieu.html">Giới thiệu</a></li>
<li class="menu-item menu-item-has-children"><a href="san-pham.html">Sản phẩm</a>
<ul class="sub-menu nav-sidebar-ul children">
	<li class="menu-item"><a href="danh-muc-cotton.html">Vải Cotton &amp; Tici</a></li>
	<li class="menu-item"><a href="danh-muc-ca-sau.html">Vải Cá Sấu Polo</a></li>
	<li class="menu-item"><a href="danh-muc-the-thao.html">Thun Lạnh &amp; Thể Thao</a></li>
	<li class="menu-item"><a href="danh-muc-me-luoi.html">Vải Thun Mè &amp; Lưới Nhún</a></li>
	<li class="menu-item"><a href="danh-muc-ni-da-ca.html">Vải Nỉ Bông &amp; Da Cá</a></li>
	<li class="menu-item"><a href="san-pham.html" style="color: #F58634 !important; font-weight: 700;">Xem Tất Cả 26 Mẫu Vải &rarr;</a></li>
</ul>
</li>
<li class="menu-item"><a href="chuyen-muc-dich-vu.html">Dịch vụ</a></li>
<li class="menu-item"><a href="du-an.html">Kho Vải</a></li>
<li class="menu-item"><a href="lien-he.html">Liên hệ</a></li>
<li class="menu-item"><a href="san-pham.html">Mẫu Vải</a></li>
		</ul>
	</div>
</div>"""

def get_standard_contact_footer():
    return """<div id="azt-contact-footer">
<a href="#" data-open="#main-menu" data-pos="left" data-bg="main-menu-overlay">
<img src="images/vtw-menu.png" alt="menu"><span class="azt-contact-footer-btn-label">Menu</span>
</a>
<a href="lien-he.html">
<span>
<img src="images/gui-yeu-cau-icon.png" alt="Kho theme">
<span class="azt-contact-footer-btn-label">Liên hệ</span>
</span>
</a>
<a id="azt-contact-footer-btn-center" href="tel:0938.591.207">
<span class="azt-contact-footer-btn-center-icon">
<span class="phone-vr-circle-fill"></span>
<img src="images/button-contact-3399-2.jpg" alt="Gọi ngay">
</span>
<span>
<span class="azt-contact-footer-btn-label">
<span>Gọi ngay</span>
</span>
</span>
</a>
<a href="https://facebook.com/" target="_blank" rel="noopener">
<span>
<img src="images/messenger-icon.png" alt="Messenger">
<span class="azt-contact-footer-btn-label">Messenger</span>
</span>
</a>
<a href="https://zalo.me/0938591207" target="_blank" rel="noopener">
<span>
<img class="zalo-icon" src="images/zalo-150x150-1.png" alt="Zalo">
<span class="azt-contact-footer-btn-label">Zalo</span>
</span>
</a>
</div>"""

def fix_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig_content = content

    # 1. Replace #main-menu block
    main_menu_pattern = re.compile(r'<div id="main-menu" class="mobile-sidebar[^"]*">.*?</div>\s*</div>\s*</div>', re.DOTALL)
    # Check if nested div count
    main_menu_pattern_simple = re.compile(r'<div id="main-menu" class="mobile-sidebar[^>]*>.*?</div>\s*</div>', re.DOTALL)
    
    if main_menu_pattern_simple.search(content):
        content = main_menu_pattern_simple.sub(get_standard_main_menu(), content, count=1)

    # 2. Replace azt-contact-footer block
    contact_footer_pattern = re.compile(r'<div id="azt-contact-footer">.*?</div>\s*(?=<style|<!--|<script|$)', re.DOTALL)
    if contact_footer_pattern.search(content):
        content = contact_footer_pattern.sub(get_standard_contact_footer() + '\n', content, count=1)

    # 3. Replace any lingering href="/lien-he"
    content = content.replace('href="/lien-he"', 'href="lien-he.html"')
    content = content.replace('href="/lien-he/"', 'href="lien-he.html"')

    # 4. In header navigation, replace broken or outdated links
    # Replace header nav #san-pham links if any
    content = re.sub(r'<a href="#san-pham" class="nav-top-link[^"]*">Sản phẩm', r'<a href="san-pham.html" class="nav-top-link">Sản phẩm', content)
    content = re.sub(r'<a href="#san-pham" class="nav-top-link[^"]*">S.*?n ph.*?m', r'<a href="san-pham.html" class="nav-top-link">Sản phẩm', content)

    # 5. Fix broken scripts starting with #wp-content or #wp-includes in all pages
    content = content.replace('src="#wp-content/themes/flatsome/assets/js/flatsome.js?ver=3.19.6"', 'src="js/flatsome.js"')
    content = content.replace('src="#wp-content/themes/flatsome/assets/js/woocommerce.js?ver=3.19.6"', 'src="js/woocommerce.js"')
    content = content.replace('src="#wp-includes/js/hoverIntent.min.js?ver=1.10.2"', 'src="js/hoverIntent.min.js"')
    content = content.replace('src="#wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart.min.js?ver=9.8.2"', 'src="js/add-to-cart.min.js"')
    content = content.replace('src="#wp-content/plugins/woocommerce/assets/js/frontend/woocommerce.min.js?ver=9.8.2"', 'src="js/woocommerce.min.js"')
    content = content.replace('src="#wp-content/themes/flatsome/inc/extensions/flatsome-live-search/flatsome-live-search.js?ver=3.19.6"', 'src="js/flatsome-live-search.js"')
    content = content.replace('src="#wp-content/plugins/woocommerce/assets/js/sourcebuster/sourcebuster.min.js?ver=9.8.2"', 'src="js/sourcebuster.min.js"')
    content = content.replace('src="#wp-content/plugins/woocommerce/assets/js/frontend/order-attribution.min.js?ver=9.8.2"', 'src="js/order-attribution.min.js"')

    # Remove emoji loader that fails with Unexpected token '<'
    content = re.sub(r'<script id="wp-emoji-settings"[\s\S]*?//# sourceURL=#wp-includes/js/wp-emoji-loader\.min\.js\s*</script>', '', content)

    # 6. Ensure mobile-drawer.js is injected
    if 'mobile-drawer.js' not in content:
        content = content.replace('</body>', '<script src="js/mobile-drawer.js"></script>\n</body>')

    if content != orig_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")
    else:
        print(f"No changes needed: {filepath}")

# Run on all top-level html files
all_html = glob.glob('client/*.html')
print(f"Auditing and updating {len(all_html)} files...")
for f in sorted(all_html):
    fix_html_file(f)

print("Audit and fix completed!")
