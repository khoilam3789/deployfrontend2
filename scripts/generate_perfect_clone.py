import re
import os
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

with open('source_thangmay1/index.original.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("Original length:", len(html))

# ==============================================================================
# 1. STRIP ALL SRCSET & SIZES ATTRIBUTES (Browser will only use local src!)
# ==============================================================================
html = re.sub(r'\s+srcset="[^"]*"', '', html)
html = re.sub(r'\s+sizes="[^"]*"', '', html)

# ==============================================================================
# 2. FIX ASSET PATHS (CSS, JS, Fonts & Icons)
# ==============================================================================
# CSS
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-content/themes/flatsome/assets/css/flatsome\.css\?ver=[^'\"]+", "css/flatsome.css", html)
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-content/themes/flatsome/assets/css/flatsome-shop\.css\?ver=[^'\"]+", "css/flatsome-shop.css", html)
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-content/themes/themeweb/style\.css\?ver=[^'\"]+", "css/style.css", html)
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/woocommerce/assets/css/brands\.css\?ver=[^'\"]+", "css/brands.css", html)
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/woocommerce/assets/client/blocks/wc-blocks\.css\?ver=[^'\"]+", "css/wc-blocks.css", html)
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/ajax-load-more/build/frontend/ajax-load-more\.min\.css\?ver=[^'\"]+", "css/ajax-load-more.min.css", html)
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/contact-form-7/includes/css/styles\.css\?ver=[^'\"]+", "css/styles.css", html)
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/themewpgiare-showdemo/assets/showdemo\.css\?ver=[^'\"]+", "css/showdemo.css", html)

# FIX FONT fl-icons PROPER SYNTAX (Resolves icon squares □ □ □ □ and search icon)
fl_icons_old = """@font-face {
				font-family: "fl-icons";
				font-display: block;
				src: url(https://thangmay1.mauthemewp.com/wp-content/themes/flatsome/assets/css/icons/fl-icons.eot?v=3.19.6);
				src:
					url(https://thangmay1.mauthemewp.com/wp-content/themes/flatsome/assets/css/icons/fl-icons.eot#iefix?v=3.19.6) format("embedded-opentype"),
					url(https://thangmay1.mauthemewp.com/wp-content/themes/flatsome/assets/css/icons/fl-icons.woff2?v=3.19.6) format("woff2"),
					url(https://thangmay1.mauthemewp.com/wp-content/themes/flatsome/assets/css/icons/fl-icons.ttf?v=3.19.6) format("truetype"),
					url(https://thangmay1.mauthemewp.com/wp-content/themes/flatsome/assets/css/icons/fl-icons.woff?v=3.19.6) format("woff"),
					url(https://thangmay1.mauthemewp.com/wp-content/themes/flatsome/assets/css/icons/fl-icons.svg?v=3.19.6#fl-icons) format("svg");
			}"""

fl_icons_new = """@font-face {
	font-family: "fl-icons";
	font-display: block;
	src: url("fonts/fl-icons.woff2") format("woff2"),
	     url("fonts/fl-icons.woff") format("woff"),
	     url("fonts/fl-icons.ttf") format("truetype");
}"""
html = html.replace(fl_icons_old, fl_icons_new)

# JS
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-includes/js/jquery/jquery\.min\.js\?ver=[^'\"]+", "js/jquery.min.js", html)
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-includes/js/jquery/jquery-migrate\.min\.js\?ver=[^'\"]+", "js/jquery-migrate.min.js", html)
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/woocommerce/assets/js/jquery-blockui/jquery\.blockUI\.min\.js\?ver=[^'\"]+", "js/jquery.blockUI.min.js", html)
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/woocommerce/assets/js/js-cookie/js\.cookie\.min\.js\?ver=[^'\"]+", "js/js.cookie.min.js", html)
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-content/themes/flatsome/assets/js/flatsome\.js\?ver=[^'\"]+", "js/flatsome.js", html)
html = re.sub(r"https://thangmay1\.mauthemewp\.com/wp-content/themes/flatsome/assets/js/woocommerce\.js\?ver=[^'\"]+", "js/woocommerce.js", html)

# Add Font Awesome 6.5.1 + Roboto Google Fonts + Flickity in <head>
head_addons = '''
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="css/flickity.min.css">
<script src="js/flickity.pkgd.min.js"></script>
</head>
'''
html = html.replace('</head>', head_addons)

# Remove remote roboto woff2 references to prevent network errors
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/fonts/roboto/[^"\')]+', '', html)

# ==============================================================================
# 3. REPLACE LOGO & METADATA (Desktop & Mobile)
# ==============================================================================
html = html.replace(
    'https://thangmay1.mauthemewp.com/wp-content/uploads/2025/04/logo-theme-wp-gia-re-1024x269-1.png',
    'images/fabric/logo_transparent.png?v=3'
)
html = html.replace('Mẫu web thang máy avalift - Theme web, theme wordpress, theme web bán hàng, theme web tổng hợp, mẫu web bán hàng, mẫu web đẹp. Chỉ cần 5 phút cài đặt là có ngay website hoàn chỉnh, dễ dàng tùy biến và thay đổi thông tin trên web', 'Cửa Hàng Vải Thun Tiến Phát Đạt - Chuyên Cung Cấp Sỉ & Lẻ Vải Thun May Mặc Toàn Quốc')
html = html.replace('Mẫu web thang máy avalift', 'Cửa Hàng Vải Thun Tiến Phát Đạt')
html = re.sub(r'https%3A%2F%2Fthangmay1\.mauthemewp\.com%2F', '', html)
html = html.replace('https:\\/\\/thangmay1.mauthemewp.com\\/wp-json\\/', '\\/wp-json\\/')

# ==============================================================================
# 4. REPLACE HERO SLIDER BANNERS WITH REAL TEXTILE WAREHOUSE & SWATCH PHOTOS
# ==============================================================================
# Slide 1 (banner-1180612697) - Industrial Fabric Warehouse
html = re.sub(
    r'(<div class="banner has-hover bg-zoom" id="banner-1180612697">[\s\S]*?<div class="banner-bg fill"\s*>[\s\S]*?<img[^>]+src=")[^"]+(")',
    r'\1images/fabric/hero_warehouse.jpg\2',
    html
)
# Slide 2 (banner-1227041837) - Fabric Swatches & Rolls Flatlay
html = re.sub(
    r'(<div class="banner has-hover" id="banner-1227041837">[\s\S]*?<div class="banner-bg fill"\s*>[\s\S]*?<img[^>]+src=")[^"]+(")',
    r'\1images/fabric/hero_swatches.jpg\2',
    html
)

# ==============================================================================
# 5. REPLACE WHY CHOOSE US ICONS & BACKGROUND
# ==============================================================================
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/Rectangle-19.png', 'images/Rectangle-19.png')
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2025/04/tc1-7084.png', 'images/tc1-7084.png')
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2025/04/icon-02.png', 'images/icon-02.png')
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2025/04/tc3-9217.png', 'images/tc3-9217.png')
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2025/04/tc2-9201.png', 'images/tc2-9201.png')

# ==============================================================================
# 6. REPLACE 4 CATEGORY IMAGES
# ==============================================================================
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/thangmaugiadinh.png', 'images/fabric/vải-cottton-2c-768x1024.jpg')
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/cat-02.png', 'images/fabric/vải-thun-cá-sấu-pe-4c-450x450.jpg')
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/cat-03.png', 'images/fabric/vải-thun-poly-2da-4c-450x450.jpg')
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/cat-04.png', 'images/fabric/vải-thun-nỉ-pe-2c-cào-lông--450x450.jpg')

# ==============================================================================
# 7. ABOUT SECTION: FIX TEXT CONTRAST & BACKGROUND
# ==============================================================================
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/Rectangle-5.png', 'images/fabric/screenshot_1705137401-450x450.png')
# Replace Rectangle-10 behind row_po with a soft warehouse backdrop instead of black logos
html = re.sub(
    r'(<div class="img has-hover x md-x lg-x y md-y lg-y" id="image_1593446815">[\s\S]*?<img[^>]+src=")[^"]+(")',
    r'\1images/fabric/hero_warehouse.jpg\2 style="opacity: 0.85; filter: brightness(0.95);"',
    html
)

# Style row_po into a LUXURIOUS WHITE CARD (resolves dark text clashing with background!)
about_style_old = """<style>
#row-527887637 > .col > .col-inner {
  padding: 0px 0px 0px 0px;
}
</style>"""

about_style_new = """<style>
#row-527887637 {
  margin-top: 25px;
  margin-bottom: 25px;
}
#row-527887637 > .col > .col-inner {
  background: rgba(255, 255, 255, 0.96) !important;
  padding: 35px 40px !important;
  border-radius: 16px !important;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12) !important;
  border-left: 5px solid #F58634 !important;
}
#row-527887637 .heading {
  color: #111827 !important;
  font-size: 26px !important;
  font-weight: 800 !important;
  line-height: 1.35 !important;
  margin-bottom: 15px !important;
}
#text-2123392687 p {
  color: #374151 !important;
  font-size: 15px !important;
  line-height: 1.75 !important;
}
</style>"""
html = html.replace(about_style_old, about_style_new)

# ==============================================================================
# 8. SERVICES SECTION: REMOVE BLUE TRIANGLE BACKGROUND (Replace with clean subtle gradient)
# ==============================================================================
html = re.sub(
    r'(<section class="section rt04"[^>]*>[\s\S]*?<div class="section-bg fill"\s*>)([\s\S]*?)(</div>)',
    r'\1<div class="fill" style="background: linear-gradient(180deg, #F8F9FA 0%, #EEF2F6 100%);"></div>\3',
    html
)

# ==============================================================================
# 9. PROJECTS SECTION: REMOVE BLUE TRIANGLE BACKGROUND (Replace with clean light background)
# ==============================================================================
html = re.sub(
    r'(<section class="section rt05"[^>]*>[\s\S]*?<div class="section-bg fill"\s*>)([\s\S]*?)(</div>)',
    r'\1<div class="fill" style="background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);"></div>\3',
    html
)

# 3 Project cards
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/anh-00.png', 'images/fabric/localbrand-1024x512.jpg')
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/anh-01.png', 'images/fabric/áo-polo-cá-sấu-cotton-đẹp.jpg')
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/anh-02.png', 'images/fabric/vải-mè-trái-banh-thể-thao.jpg')

# ==============================================================================
# 10. REPLACE CONTACT SECTION LEFT IMAGE (Real Fabric Swatches)
# ==============================================================================
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/Rectangle-12.png', 'images/fabric/hero_swatches.jpg')

# ==============================================================================
# 11. REPLACE NEWS SECTION 5 CARDS IMAGES
# ==============================================================================
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/image-3-1-2.png', 'images/fabric/bảng-màu-cotton-4c.jpg')
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/image-3-2-1.png', 'images/fabric/vải-mè-trái-banh-2c-450x450.jpg')
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/image-3-3-1.png', 'images/fabric/screenshot_1705137401-450x450.png')
# image-3-3.png appears twice: 1st card and 5th card
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/image-3-3.png', 'images/fabric/cá-sấu-cotton-lục-giác-may-áo-polo-450x450.jpg', 1)
html = html.replace('https://thangmay1.mauthemewp.com/wp-content/uploads/2023/05/image-3-3.png', 'images/fabric/bảng-màu-bo-gân-tici.jpg', 1)

# ==============================================================================
# 12. REPLACE MOBILE FOOTER ICONS
# ==============================================================================
html = html.replace('/wp-content/uploads/2024/04/vtw-menu.png', 'images/vtw-menu.png')
html = html.replace('/wp-content/uploads/2024/04/gui-yeu-cau-icon.png', 'images/gui-yeu-cau-icon.png')
html = html.replace('/wp-content/uploads/2024/04/button-contact-3399-2.jpg', 'images/button-contact-3399-2.jpg')
html = html.replace('/wp-content/uploads/2024/04/messenger-icon.png', 'images/messenger-icon.png')
html = html.replace('/wp-content/uploads/2024/04/zalo-150x150-1.png', 'images/zalo-150x150-1.png')
html = html.replace('/wp-content/uploads/2024/04/mb-footer-bg.svg', 'images/mb-footer-bg.svg')

# ==============================================================================
# 13. TEXT REPLACEMENTS - HEADER & TOPBAR
# ==============================================================================
# Title
html = re.sub(
    r'<title>.*?</title>',
    '<title>Cửa Hàng Vải Thun Tiến Phát Đạt - Chuyên Cung Cấp Sỉ & Lẻ Vải Thun May Mặc Toàn Quốc</title>',
    html,
    flags=re.DOTALL
)

# Topbar
html = html.replace('CÔNG TY ĐẦU TƯ VÀ PHÁT TRIỂN ABC KÍNH CHÀO QUÝ KHÁCH', 'CỬA HÀNG VẢI THUN TIẾN PHÁT ĐẠT KÍNH CHÀO QUÝ KHÁCH')
html = html.replace('9:00 sáng tới 6:00 chiều', '7:30 sáng tới 18:00 chiều (Thứ 2 - Thứ 7)')
html = html.replace('123.456.789', '0938.591.207')
html = html.replace('tel:123.456.789', 'tel:0938591207')

# Menus (Desktop & Mobile)
menu_thangmay = """<li id="menu-item-1949" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-97 current_page_item menu-item-1949 active menu-item-design-default"><a href="https://thangmay1.mauthemewp.com/" aria-current="page" class="nav-top-link">Trang chủ</a></li>
<li id="menu-item-2997" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2997 menu-item-design-default"><a href="https://thangmay1.mauthemewp.com/gioi-thieu/" class="nav-top-link">Giới thiệu</a></li>
<li id="menu-item-3149" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-3149 menu-item-design-default has-dropdown"><a href="#" class="nav-top-link" aria-expanded="false" aria-haspopup="menu">Sản phẩm<i class="icon-angle-down" ></i></a>
<ul class="sub-menu nav-dropdown nav-dropdown-default">
	<li id="menu-item-3150" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-3150"><a href="https://thangmay1.mauthemewp.com/danh-muc/thang-may-gia-dinh/">Thang máy gia đình</a></li>
	<li id="menu-item-3151" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-3151"><a href="https://thangmay1.mauthemewp.com/danh-muc/thang-may-khach-san/">Thang máy khách sạn</a></li>
	<li id="menu-item-3152" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-3152"><a href="https://thangmay1.mauthemewp.com/danh-muc/thang-may-nha-hang/">Thang máy nhà hàng</a></li>
	<li id="menu-item-3153" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-3153"><a href="https://thangmay1.mauthemewp.com/danh-muc/thang-may-tai-hang/">Thang máy tải hàng</a></li>
</ul>
</li>
<li id="menu-item-3314" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3314 menu-item-design-default"><a href="https://thangmay1.mauthemewp.com/chuyen-muc/dich-vu/" class="nav-top-link">Dịch vụ</a></li>
<li id="menu-item-3225" class="menu-item menu-item-type-taxonomy menu-item-object-project menu-item-3225 menu-item-design-default"><a href="https://thangmay1.mauthemewp.com/project/du-an-da-thuc-hien/" class="nav-top-link">Dự án</a></li>
<li id="menu-item-3000" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3000 menu-item-design-default"><a href="https://thangmay1.mauthemewp.com/lien-he/" class="nav-top-link">Liên hệ</a></li>
<li id="menu-item-3001" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-3001 menu-item-design-default"><a href="#" class="nav-top-link">FAQ</a></li>"""

menu_vaithun = """<li id="menu-item-1949" class="menu-item menu-item-type-post_type menu-item-home current-menu-item active menu-item-design-default"><a href="#" class="nav-top-link">Trang chủ</a></li>
<li id="menu-item-2997" class="menu-item menu-item-design-default"><a href="#gioi-thieu" class="nav-top-link">Giới thiệu</a></li>
<li id="menu-item-3149" class="menu-item menu-item-has-children menu-item-design-default has-dropdown"><a href="#san-pham" class="nav-top-link" aria-expanded="false" aria-haspopup="menu">Sản phẩm<i class="icon-angle-down" ></i></a>
<ul class="sub-menu nav-dropdown nav-dropdown-default">
	<li id="menu-item-3150" class="menu-item"><a href="#san-pham">Vải Cotton &amp; Tici</a></li>
	<li id="menu-item-3151" class="menu-item"><a href="#san-pham">Vải Cá Sấu Polo</a></li>
	<li id="menu-item-3152" class="menu-item"><a href="#san-pham">Thun Lạnh &amp; Thể Thao</a></li>
	<li id="menu-item-3153" class="menu-item"><a href="#san-pham">Vải Mè, Nỉ &amp; Da Cá</a></li>
</ul>
</li>
<li id="menu-item-3314" class="menu-item menu-item-design-default"><a href="#dich-vu" class="nav-top-link">Dịch vụ</a></li>
<li id="menu-item-3225" class="menu-item menu-item-design-default"><a href="#kho-hang" class="nav-top-link">Kho Vải</a></li>
<li id="menu-item-3000" class="menu-item menu-item-design-default"><a href="#lien-he" class="nav-top-link">Liên hệ</a></li>
<li id="menu-item-3001" class="menu-item menu-item-design-default"><a href="#tin-tuc" class="nav-top-link">Tin tức</a></li>"""
html = html.replace(menu_thangmay, menu_vaithun)

# Mobile sidebar menu
sidebar_thangmay = """<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-97 current_page_item menu-item-1949"><a href="https://thangmay1.mauthemewp.com/" aria-current="page">Trang chủ</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2997"><a href="https://thangmay1.mauthemewp.com/gioi-thieu/">Giới thiệu</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-3149"><a href="#">Sản phẩm</a>
<ul class="sub-menu nav-sidebar-ul children">
	<li class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-3150"><a href="https://thangmay1.mauthemewp.com/danh-muc/thang-may-gia-dinh/">Thang máy gia đình</a></li>
	<li class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-3151"><a href="https://thangmay1.mauthemewp.com/danh-muc/thang-may-khach-san/">Thang máy khách sạn</a></li>
	<li class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-3152"><a href="https://thangmay1.mauthemewp.com/danh-muc/thang-may-nha-hang/">Thang máy nhà hàng</a></li>
	<li class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-3153"><a href="https://thangmay1.mauthemewp.com/danh-muc/thang-may-tai-hang/">Thang máy tải hàng</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3314"><a href="https://thangmay1.mauthemewp.com/chuyen-muc/dich-vu/">Dịch vụ</a></li>
<li class="menu-item menu-item-type-taxonomy menu-item-object-project menu-item-3225"><a href="https://thangmay1.mauthemewp.com/project/du-an-da-thuc-hien/">Dự án</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3000"><a href="https://thangmay1.mauthemewp.com/lien-he/">Liên hệ</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-3001"><a href="#">FAQ</a></li>"""

sidebar_vaithun = """<li class="menu-item current-menu-item"><a href="#">Trang chủ</a></li>
<li class="menu-item"><a href="#gioi-thieu">Giới thiệu</a></li>
<li class="menu-item menu-item-has-children"><a href="#san-pham">Sản phẩm</a>
<ul class="sub-menu nav-sidebar-ul children">
	<li class="menu-item"><a href="#san-pham">Vải Cotton &amp; Tici</a></li>
	<li class="menu-item"><a href="#san-pham">Vải Cá Sấu Polo</a></li>
	<li class="menu-item"><a href="#san-pham">Thun Lạnh &amp; Thể Thao</a></li>
	<li class="menu-item"><a href="#san-pham">Vải Mè, Nỉ &amp; Da Cá</a></li>
</ul>
</li>
<li class="menu-item"><a href="#dich-vu">Dịch vụ</a></li>
<li class="menu-item"><a href="#kho-hang">Kho Vải</a></li>
<li class="menu-item"><a href="#lien-he">Liên hệ</a></li>
<li class="menu-item"><a href="#tin-tuc">Tin tức</a></li>"""
html = html.replace(sidebar_thangmay, sidebar_vaithun)

# ==============================================================================
# 14. TEXT REPLACEMENTS - HERO SLIDER
# ==============================================================================
# Slide 1
html = html.replace('Giải pháp thang máy cho mọi công trình', 'Giải Pháp Vải Thun Cho Mọi Xưởng May')
html = html.replace('Khám phá bộ sưu tập giải pháp thang máy của chúng tôi.', 'Khám phá 26 mẫu vải thun cao cấp của Tiến Phát Đạt với giá xuất xưởng tốt nhất.')

# Slide 2 (banner-1227041837)
slide2_old = """<div class="container section-title-container" ><h2 class="section-title section-title-normal"><b></b><span class="section-title-main" >Giải pháp thang máy cho mọi công trình</span><b></b></h2></div>
<p>Khám phá bộ sưu tập giải pháp thang máy của chúng tôi.</p>
<a class="button primary"  >
		<span>Xem sản phẩm</span>
	</a>"""

slide2_new = """<div class="container section-title-container" ><h2 class="section-title section-title-normal"><b></b><span class="section-title-main" >Tổng Kho Phân Phối Vải Thun Tân Phú</span><b></b></h2></div>
<p>Cung ứng ổn định, giao hàng toàn quốc, đổi trả 100% cây lỗi dệt nhuộm.</p>
<a href="#san-pham" class="button primary"  >
		<span>Xem Sản Phẩm</span>
	</a>"""
html = html.replace(slide2_old, slide2_new)

# ==============================================================================
# 15. TEXT REPLACEMENTS - WHY CHOOSE US
# ==============================================================================
html = html.replace('AN TOÀN VƯỢT TRỘI', 'CHẤT LƯỢNG VƯỢT TRỘI')
html = html.replace('CÔNG NGHỆ HIỆN ĐẠI', 'ĐA DẠNG BẢNG MÀU')
html = html.replace('DỊCH VỤ TẬN TÂM', 'GIÁ GỐC TẬN XƯỞNG')
html = html.replace('TIẾT KIỆM NGÂN SÁCH', 'GIAO HÀNG TOÀN QUỐC')

# Replace the 4 Lorem ipsum texts in Why Choose Us
why_texts = [
    'Sợi dệt cao cấp, mình vải dày dặn, co giãn 4 chiều mềm mại, bền màu và không bai nhão hay xù lông sau khi giặt.',
    'Hơn 60+ tông màu thời trang luôn sẵn cây tại kho, liên tục cập nhật theo xu hướng thời trang và Local Brand.',
    'Phân phối trực tiếp từ nhà máy dệt nhuộm không qua trung gian, chính sách chiết khấu cực tốt cho đơn hàng số lượng lớn.',
    'Đóng gói cẩn thận, hỗ trợ vận chuyển nhanh trong ngày tại TP.HCM và gửi chành xe uy tín đến các tỉnh thành cả nước.'
]

def replace_why_lorem(match):
    global why_idx
    if why_idx < len(why_texts):
        res = f'<p>{why_texts[why_idx]}</p>'
        why_idx += 1
        return res
    return match.group(0)

why_idx = 0
why_section_regex = r'(<section class="section hide-for-small" id="section_813282702">[\s\S]*?</section>)'
why_section_match = re.search(why_section_regex, html)
if why_section_match:
    why_html = why_section_match.group(0)
    why_html = re.sub(r'<p>Lorem ipsum dolor sit amet consectetur[\s\S]*?</p>', replace_why_lorem, why_html)
    html = html[:why_section_match.start()] + why_html + html[why_section_match.end():]

# ==============================================================================
# 16. TEXT REPLACEMENTS - COUNTER SECTION
# ==============================================================================
html = html.replace('class="count-up"><strong>117</strong>', 'class="count-up"><strong>1,200</strong>')
html = html.replace('Công Trình', 'Khách Hàng Xưởng May')
html = html.replace('15 +', '15 +')
html = html.replace('Năm Kinh Nghiệm', 'Năm Kinh Nghiệm Phân Phối')
html = html.replace('60 +', '63 +')
html = html.replace('Tỉnh Thành Lắp Đặt', 'Tỉnh Thành Giao Hàng')
html = html.replace('4,800 +', '50,000 +')
html = html.replace('Sản Phẩm Đã Bán', 'Mét Vải Xuất Kho / Tháng')

# ==============================================================================
# 17. TEXT REPLACEMENTS - CATEGORIES SECTION
# ==============================================================================
html = html.replace('<section class="section" id="section_1006084584">', '<section class="section" id="san-pham">')
html = html.replace('Các Loại thang máy', 'Các Dòng Vải Thun Tiêu Biểu')

cat_desc_old = """<p>Là một trong những nhà sản xuất giải pháp thang máy tiết kiệm không gian lớn nhất thế giới, được thiết kế để lắp đặt nhanh chóng và dễ dàng. Chúng tôi cung cấp thang máy cho mọi ứng dụng và bất kể bạn cần thang máy cho gia đình , trường học, văn phòng, khách sạn hay nhà kho, chúng tôi đều có mẫu thang máy hoàn hảo cho bạn. Trong những năm qua, chúng tôi đã bán và lắp đặt hơn 70.000 thang máy, được hàng triệu người trên thế giới sử dụng. Chúng tôi muốn thang máy của mình xây dựng cầu nối giữa các cấp độ và thế hệ, giúp mọi người gặp gỡ và kết nối dễ dàng hơn.</p>"""
cat_desc_new = """<p>Cửa hàng Vải Thun Tiến Phát Đạt tự hào là tổng kho phân phối sỉ &amp; lẻ các loại vải thun may mặc hàng đầu tại TP.HCM. Với hơn 15 năm kinh nghiệm, chúng tôi cung cấp đa dạng các dòng vải như Cotton, Tici, Cá Sấu, Thun Lạnh, Mè Thể Thao... Sẵn sàng đáp ứng mọi số lượng từ đơn hàng cây lẻ đến hàng trăm cây cho các xưởng may, công ty thời trang và Local Brand toàn quốc với chất lượng ổn định và giá gốc tận xưởng.</p>"""

html = html.replace(cat_desc_old, cat_desc_new, 1)

# Category titles
html = html.replace('Thang máy gia đình', 'Vải Cotton & Tici')
html = html.replace('Thang máy khách sạn', 'Vải Cá Sấu Polo')
html = html.replace('Thang máy nhà hàng', 'Thun Lạnh & Thể Thao')
html = html.replace('Thang máy tải hàng', 'Vải Mè, Nỉ & Da Cá')

# ==============================================================================
# 18. TEXT REPLACEMENTS - ABOUT SECTION
# ==============================================================================
html = html.replace('<section class="section rt03 hide-for-small" id="section_226873784">', '<section class="section rt03 hide-for-small" id="gioi-thieu">')
html = html.replace('Đơn vị cung cấp thi công thang máy số 1 việt nam', 'Đơn Vị Cung Cấp Vải Thun May Mặc Uy Tín Tại TP.HCM')

about_desc_new = """<p>Với kho vải quy mô lớn tọa lạc tại trung tâm quận Tân Phú, Tiến Phát Đạt không ngừng nâng cao chất lượng dịch vụ dệt nhuộm và cung ứng nguyên phụ liệu may mặc. Chúng tôi cam kết chất lượng vải chuẩn định lượng GSM, màu sắc tươi sáng, độ bền màu cao, co giãn 4 chiều thoải mái và tuyệt đối không xù lông. Đội ngũ nhân viên tận tâm sẵn sàng tư vấn, gửi bảng màu và cắt mẫu thử miễn phí đến tận tay khách hàng.</p>"""
html = html.replace(cat_desc_old, about_desc_new, 1)

# ==============================================================================
# 19. TEXT REPLACEMENTS - SERVICES SECTION (4 alternating cards)
# ==============================================================================
html = html.replace('<section class="section rt04" id="section_506742176">', '<section class="section rt04" id="dich-vu">')
html = html.replace('Dịch vụ của chúng tôi', 'Dịch Vụ Cung Cấp Vải Thun')
html = html.replace('Xem tất cả các dịch vụ', 'Xem tất cả dịch vụ')

# Service cards 1..4
service_old = """<h2>Lắp Đặt Mới<br />Thang Máy</h2>
<p>There are many variations of passages of Lorem Ipsum available majority</p>"""
service_new = """<h2>Cung Cấp Sỉ &amp; Lẻ<br />Vải Thun</h2>
<p>Sẵn kho số lượng lớn các dòng vải cotton, tici, cá sấu, poly đáp ứng mọi đơn hàng lớn nhỏ.</p>"""
html = html.replace(service_old, service_new)

service2_old = """<h2>Bảo trì thang máy </h2>
<p>There are many variations of passages of Lorem Ipsum available majority</p>"""
service2_new = """<h2>Dệt &amp; Nhuộm<br />Theo Yêu Cầu</h2>
<p>Nhận dệt nhuộm theo bảng màu pantone, định lượng GSM và khổ vải riêng của từng thương hiệu.</p>"""
html = html.replace(service2_old, service2_new)

service3_old = """<h2>Cải tạo thang máy</h2>
<p>There are many variations of passages of Lorem Ipsum available majority</p>"""
service3_new = """<h2>Cắt Mẫu &amp;<br />Gửi Bảng Màu</h2>
<p>Gửi catalog mẫu vải và bảng màu tận nơi miễn phí cho xưởng may, nhà thiết kế trên toàn quốc.</p>"""
html = html.replace(service3_old, service3_new)

service4_old = """<h2>Bảo Dưỡng &amp; Phục Hồi Đá</h2>
<p>There are many variations of passages of Lorem Ipsum available majority</p>"""
service4_new = """<h2>Giao Hàng Xưởng<br />May Toàn Quốc</h2>
<p>Vận chuyển nhanh chóng bằng chành xe hoặc giao tận xưởng, hỗ trợ phí ship cho đơn hàng lớn.</p>"""
html = html.replace(service4_old, service4_new)

# ==============================================================================
# 20. TEXT REPLACEMENTS - PROJECTS SECTION (3 cards)
# ==============================================================================
html = html.replace('<section class="section rt05" id="section_1977599740">', '<section class="section rt05" id="kho-hang">')
html = html.replace('Công trình thực tế', 'Kho Vải &amp; Đơn Hàng Thực Tế')
html = html.replace('CÔNG TRÌNH THỰC TẾ', 'KHO VẢI &amp; ĐƠN HÀNG THỰC TẾ')

# Card 1 (text-box-1630193730)
project_card1_old = """<div class="container section-title-container" ><h3 class="section-title section-title-bold"><b></b><span class="section-title-main" >Vinhome riverside</span><b></b></h3></div>
<p><strong>Chủng loại:</strong> Cáp kéo</p>
<p><strong>Model:</strong> LEHY-IIB</p>
<p><strong>Số lượng:</strong> 6</p>
<p><strong>Số điểm dừng:</strong> 16 điểm</p>
<p><strong>Tải trọng:</strong> 550</p>"""

project_card1_new = """<div class="container section-title-container" ><h3 class="section-title section-title-bold"><b></b><span class="section-title-main" >Kho Vải Quận Tân Phú</span><b></b></h3></div>
<p><strong>Chủng loại:</strong> Thun Cotton &amp; Tici</p>
<p><strong>Quy cách:</strong> Cây vải 20kg - 25kg</p>
<p><strong>Số lượng:</strong> Sẵn kho 500+ cây</p>
<p><strong>Màu sắc:</strong> Đầy đủ 60+ tông màu</p>
<p><strong>Xuất xưởng:</strong> Giao ngay trong ngày</p>"""
html = html.replace(project_card1_old, project_card1_new)

# Card 2 (text-box-1904106302)
project_card2_new = """<div class="container section-title-container" ><h3 class="section-title section-title-bold"><b></b><span class="section-title-main" >Cung Ứng Local Brand</span><b></b></h3></div>
<p><strong>Chủng loại:</strong> Cá Sấu Poly &amp; Lục Giác</p>
<p><strong>Quy cách:</strong> Khổ 1m8 - 2m2, co giãn 4c</p>
<p><strong>Đơn hàng:</strong> Cung ứng xưởng may Polo</p>
<p><strong>Tiêu chuẩn:</strong> Chống xù lông, bền màu</p>
<p><strong>Bảo hành:</strong> Đổi trả cây lỗi 100%</p>"""
html = html.replace(project_card1_old, project_card2_new)

# Card 3 (text-box-223298396)
project_card3_new = """<div class="container section-title-container" ><h3 class="section-title section-title-bold"><b></b><span class="section-title-main" >Xưởng May Đồ Thể Thao</span><b></b></h3></div>
<p><strong>Chủng loại:</strong> Mè Trái Banh &amp; Thun Lạnh Poly</p>
<p><strong>Quy cách:</strong> Dệt kim chuyên dụng thể thao</p>
<p><strong>Đơn vị may:</strong> Quần áo bóng đá &amp; đồng phục</p>
<p><strong>Đặc tính:</strong> Thoát ẩm, co giãn tối đa</p>
<p><strong>Giao nhận:</strong> Chành xe &amp; tận xưởng</p>"""
html = html.replace(project_card1_old, project_card3_new)

# ==============================================================================
# 21. TEXT REPLACEMENTS - CONTACT SECTION
# ==============================================================================
html = html.replace('<section class="section" id="section_1939356484">', '<section class="section" id="lien-he">')

# ==============================================================================
# 22. TEXT REPLACEMENTS - NEWS SECTION (5 news cards)
# ==============================================================================
html = html.replace('<section class="section rt07" id="section_1489270001">', '<section class="section rt07" id="tin-tuc">')

news_data = [
    {
        "title": "Bí quyết chọn vải thun may áo polo form chuẩn, không xù lông",
        "excerpt": "Chia sẻ kinh nghiệm lựa chọn chất liệu vải thun cá sấu poly thái, cá sấu cotton 4 chiều giúp áo polo đứng form, thoáng mát và bền bỉ."
    },
    {
        "title": "So sánh vải cotton 100% 4 chiều và vải Tici 65/35 may áo thun",
        "excerpt": "Phân tích chi tiết độ co giãn, độ bền màu, khả năng thấm hút mồ hôi và giá thành giữa vải cotton 100% và Tici dành cho xưởng may."
    },
    {
        "title": "Xu hướng chọn vải thun thể thao, mè lưới hot nhất hiện nay",
        "excerpt": "Tổng hợp các dòng vải mè hạt mưa, mè caro, thun lạnh poly 2 da được các thương hiệu thời trang thể thao và Local Brand ưa chuộng."
    },
    {
        "title": "Kinh nghiệm mở xưởng may và nhập sỉ vải thun tận gốc tại TP.HCM",
        "excerpt": "Hướng dẫn cách kiểm tra cây vải, định lượng gsm, khổ vải và tối ưu chi phí nguyên phụ liệu may mặc cho người mới bắt đầu."
    },
    {
        "title": "Bảng màu vải thun bo gân, vải nỉ chân cua cào lông mùa thu đông",
        "excerpt": "Cập nhật hơn 50 mã màu thời trang hot trend cho dòng vải nỉ PE, vải bo gân may áo sweater, hoodie và set bộ thu đông."
    }
]

card_urls = [
    'lam-the-nao-de-bao-ve-mot-phong-tam-voi-be-mat-da-cam-thach-7/',
    'lam-the-nao-de-bao-ve-mot-phong-tam-voi-be-mat-da-cam-thach/',
    'lam-the-nao-de-bao-ve-mot-phong-tam-voi-be-mat-da-cam-thach-2/',
    'lam-the-nao-de-bao-ve-mot-phong-tam-voi-be-mat-da-cam-thach-3/',
    'lam-the-nao-de-bao-ve-mot-phong-tam-voi-be-mat-da-cam-thach-6/',
]

for i, item in enumerate(news_data):
    html = re.sub(
        r'<h5 class="post-title is-large ">\s*<a href="[^"]*' + re.escape(card_urls[i]) + r'" class="plain">[^<]+</a>\s*</h5>',
        f'<h5 class="post-title is-large "><a href="#tin-tuc" class="plain">{item["title"]}</a></h5>',
        html
    )
    html = re.sub(
        r'<a href="[^"]*' + re.escape(card_urls[i]) + r'" class="plain" aria-label="[^"]*">',
        f'<a href="#tin-tuc" class="plain" aria-label="{item["title"]}">',
        html
    )

for item in news_data:
    html = re.sub(
        r'<p class="from_the_blog_excerpt ">\s*Với tâm thế cửa trên[\s\S]*?</p>',
        f'<p class="from_the_blog_excerpt ">{item["excerpt"]}</p>',
        html,
        count=1
    )

# ==============================================================================
# 23. TEXT REPLACEMENTS - FOOTER & FLOATING BUTTONS
# ==============================================================================
html = html.replace('CÔNG TY TNHH TPEC VIỆT NAM', 'CỬA HÀNG VẢI THUN TIẾN PHÁT ĐẠT')
html = re.sub(
    r'<p><b>\[ Hà Nội \]</b>[\s\S]*?Kim Giang[\s\S]*?</p>',
    '<p><b>[ Địa chỉ kho ]</b> 33 Lê Cảnh Tuân, P. Phú Thọ Hòa, Q. Tân Phú, TP. Hồ Chí Minh</p>',
    html
)
html = re.sub(
    r'<p><b>\[ Quảng Ninh \]</b>[\s\S]*?Hạ Long[\s\S]*?</p>',
    '<p><b>[ Cung ứng ]</b> Chuyên phân phối sỉ &amp; lẻ vải thun may mặc, thời trang, local brand toàn quốc</p>',
    html
)
html = html.replace('0862 164 168', '0938.591.207')
html = html.replace('0999999999', '0938.591.207')
html = html.replace('TPEC.COM.VN', 'vaithuntienphatdat.com')
html = html.replace('tpecelevator@gmail.com', 'vaithuntienphatdat@gmail.com')

# Footer products list
html = html.replace('<p>Thang máy gia đình</p>', '<p>Vải Cotton 100% 4 Chiều</p>')
html = html.replace('<p>Thang máy kính đẹp, hiện đại</p>', '<p>Vải Thun Cá Sấu PE 4 Chiều</p>')
html = html.replace('<p>Thang máy Fuji Nhật Bản</p>', '<p>Vải Thun Lạnh Poly 2 Da</p>')
html = html.replace('<p>Thang máy không hố pit</p>', '<p>Vải Mè Lưới Thể Thao</p>')
html = html.replace('<p>Thang máy Mitsubishi</p>', '<p>Vải Nỉ PE Cào Lông, Da Cá</p>')
html = html.replace('<p>Thang máy NIPPON</p>', '<p>Vải Bo Gân Tici &amp; Khác</p>')

# Footer copyright
html = html.replace('Copyright © 2026  Themeweb All Rights Reserved', 'Copyright © 2026 Cửa Hàng Vải Thun Tiến Phát Đạt. All Rights Reserved.')

# Floating buttons
html = html.replace('http://zalo.me/0999999999', 'https://zalo.me/0938591207')
html = html.replace('https://zalo.me/0999999999', 'https://zalo.me/0938591207')
html = html.replace('tel:0999999999', 'tel:0938591207')
html = html.replace('http://m.me/AAAA.vn', 'https://zalo.me/0938591207')

# Replace google map iframe to center on 33 Lê Cảnh Tuân, Tân Phú, TP.HCM
map_url = "https://maps.google.com/maps?q=33%20L%C3%AA%20C%E1%BA%A3nh%20Tu%C3%A2n%2C%20Ph%C3%BA%20Th%E1%BB%8D%20H%C3%B2a%2C%20T%C3%A2n%20Ph%C3%BA%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=15&ie=UTF8&iwloc=&output=embed"
html = re.sub(r'src="https://www\.google\.com/maps/embed\?[^"]+"', f'src="{map_url}"', html)

# ==============================================================================
# 24. REMOVE SPAM DEMO BAR AT BOTTOM & CLEAN LINKS
# ==============================================================================
html = re.sub(r'<div\s+class="twp-showdemo-bar"[\s\S]*?</div>\s*</div>', '', html)

html = re.sub(r'https://thangmay1\.mauthemewp\.com/category/dich-vu/', '#dich-vu', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/project/du-an-da-thuc-hien/', '#kho-hang', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/gioi-thieu/', '#gioi-thieu', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/lien-he/', '#lien-he', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/danh-muc/[^"\']+', '#san-pham', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/', '#', html)

# ==============================================================================
# 25. INJECT RUNTIME ENHANCEMENT SCRIPT & ICON CSS FIX
# ==============================================================================
enhancement_script = """
<style>
/* CSS fix for social icons and search button */
.top-bar-nav .icon-facebook:before, .social-icons .icon-facebook:before { content: "\\f39e" !important; font-family: "Font Awesome 6 Brands" !important; font-weight: 400 !important; }
.top-bar-nav .icon-instagram:before, .social-icons .icon-instagram:before { content: "\\f16d" !important; font-family: "Font Awesome 6 Brands" !important; font-weight: 400 !important; }
.top-bar-nav .icon-tiktok:before, .social-icons .icon-tiktok:before { content: "\\e07b" !important; font-family: "Font Awesome 6 Brands" !important; font-weight: 400 !important; }
.top-bar-nav .icon-youtube:before, .social-icons .icon-youtube:before { content: "\\f167" !important; font-family: "Font Awesome 6 Brands" !important; font-weight: 400 !important; }
.header-search i.icon-search:before, i.icon-search:before { content: "\\f002" !important; font-family: "Font Awesome 6 Free" !important; font-weight: 900 !important; font-style: normal !important; }
.header-search a.is-small { display: inline-flex !important; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; border: 1px solid #d1d5db; color: #4b5563; transition: all 0.25s ease; text-decoration: none; }
.header-search a.is-small:hover { background-color: #F58634; color: #ffffff !important; border-color: #F58634; }
.header-search a.is-small i { line-height: 1; display: inline-block; }
.social-icons { display: inline-flex !important; align-items: center !important; }
.social-icons a { display: inline-flex !important; align-items: center !important; justify-content: center !important; margin: 0 4px !important; color: #cbd5e1 !important; transition: color 0.2s ease !important; font-size: 15px !important; }
.social-icons a:hover { color: #F58634 !important; }

/* FIX 1: Heading Dịch Vụ Cung Cấp Vải Thun - High contrast dark text */
#dich-vu .heading, 
.section.rt04 .heading, 
#row-1838586398 .heading, 
#col-25748151 .heading,
#row-1838586398 h2,
#dich-vu h2,
#section_506742176 .heading { 
  color: #111827 !important; 
  font-weight: 800 !important;
}

/* FIX 2: Header Dark Translucent Frosted Glass Panel */
#header .header-main {
  background: rgba(24, 30, 38, 0.88) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25) !important;
  transition: all 0.3s ease !important;
}

#header.stuck .header-main {
  background: rgba(18, 23, 30, 0.96) !important;
  backdrop-filter: blur(16px) !important;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.35) !important;
}

/* Nav links on dark panel: crisp white with clear contrast */
.header-main .nav > li > a {
  color: #f8fafc !important;
  font-weight: 600 !important;
  letter-spacing: 0.3px !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5) !important;
  transition: all 0.2s ease !important;
}

.header-main .nav > li > a:hover,
.header-main .nav > li.active > a,
.header-main .nav > li.current-menu-item > a {
  color: #F58634 !important;
}

/* Logo on dark panel: smooth shadow, transparent background */
.header-main #logo img {
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) !important;
}

/* Search button on dark panel */
.header-search a.is-small {
  background: rgba(255, 255, 255, 0.12) !important;
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  color: #ffffff !important;
}

.header-search a.is-small:hover {
  background: #F58634 !important;
  border-color: #F58634 !important;
  color: #ffffff !important;
}
</style>
<script>
jQuery(document).ready(function($) {
  // Hide spinner once loaded
  $('.loading-spin').fadeOut(300);

  // Safely trigger Flickity resize after DOM settles
  setTimeout(function() {
    $('.slider').each(function() {
      var $slider = $(this);
      if ($slider.data('flickity')) {
        $slider.flickity('resize');
      } else if (typeof $.fn.flickity !== 'undefined' && !$slider.hasClass('flickity-enabled')) {
        $slider.flickity({
          cellAlign: 'center',
          imagesLoaded: true,
          wrapAround: true,
          autoPlay: 6000,
          pauseAutoPlayOnHover: true,
          prevNextButtons: true,
          pageDots: true
        });
      }
    });
  }, 350);

  // Smooth scroll for anchor links
  $('a[href^="#"]').on('click', function(e) {
    var href = $(this).attr('href');
    if (href && href.length > 1 && href !== '#') {
      var target = $(href);
      if (target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 90
        }, 700);
      }
    }
  });

  // Handle contact form submission nicely
  $('form.wpcf7-form').on('submit', function(e) {
    e.preventDefault();
    alert('Cảm ơn Quý khách! Cửa Hàng Vải Thun Tiến Phát Đạt đã tiếp nhận thông tin và sẽ liên hệ tư vấn trong ít phút qua số điện thoại đã cung cấp.');
    this.reset();
  });
});
</script>
</body>
"""
html = html.replace('</body>', enhancement_script)

with open('source_thangmay1/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Generated clean clone index.html successfully! Size:", len(html))
