import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('source_thangmay1/index.original.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("Original HTML length:", len(html))

# 1. Fix CSS links to point to local files
css_replacements = [
    (r"https://thangmay1\.mauthemewp\.com/wp-content/themes/flatsome/assets/css/flatsome\.css\?ver=[^'\"]+", "css/flatsome.css"),
    (r"https://thangmay1\.mauthemewp\.com/wp-content/themes/flatsome/assets/css/flatsome-shop\.css\?ver=[^'\"]+", "css/flatsome-shop.css"),
    (r"https://thangmay1\.mauthemewp\.com/wp-content/themes/themeweb/style\.css\?ver=[^'\"]+", "css/style.css"),
    (r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/woocommerce/assets/css/brands\.css\?ver=[^'\"]+", "css/brands.css"),
    (r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/woocommerce/assets/client/blocks/wc-blocks\.css\?ver=[^'\"]+", "css/wc-blocks.css"),
    (r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/ajax-load-more/build/frontend/ajax-load-more\.min\.css\?ver=[^'\"]+", "css/ajax-load-more.min.css"),
    (r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/contact-form-7/includes/css/styles\.css\?ver=[^'\"]+", "css/styles.css"),
    (r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/themewpgiare-showdemo/assets/showdemo\.css\?ver=[^'\"]+", "css/showdemo.css"),
    (r"https://thangmay1\.mauthemewp\.com/wp-content/themes/flatsome/assets/css/icons/fl-icons\.(eot|woff2|woff|ttf|svg)[^'\"]*", r"fonts/fl-icons.\1"),
]
for pat, rep in css_replacements:
    html = re.sub(pat, rep, html)

# 2. Fix JS links to point to local files
js_replacements = [
    (r"https://thangmay1\.mauthemewp\.com/wp-includes/js/jquery/jquery\.min\.js\?ver=[^'\"]+", "js/jquery.min.js"),
    (r"https://thangmay1\.mauthemewp\.com/wp-includes/js/jquery/jquery-migrate\.min\.js\?ver=[^'\"]+", "js/jquery-migrate.min.js"),
    (r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/woocommerce/assets/js/jquery-blockui/jquery\.blockUI\.min\.js\?ver=[^'\"]+", "js/jquery.blockUI.min.js"),
    (r"https://thangmay1\.mauthemewp\.com/wp-content/plugins/woocommerce/assets/js/js-cookie/js\.cookie\.min\.js\?ver=[^'\"]+", "js/js.cookie.min.js"),
    (r"https://thangmay1\.mauthemewp\.com/wp-content/themes/flatsome/assets/js/flatsome\.js\?ver=[^'\"]+", "js/flatsome.js"),
    (r"https://thangmay1\.mauthemewp\.com/wp-content/themes/flatsome/assets/js/woocommerce\.js\?ver=[^'\"]+", "js/woocommerce.js"),
]
for pat, rep in js_replacements:
    html = re.sub(pat, rep, html)

# Add flickity js & css for flawless slider
html = html.replace("</head>", '<link rel="stylesheet" href="css/flickity.min.css">\n<script src="js/flickity.pkgd.min.js"></script>\n</head>')

# 3. Replace Logo
html = re.sub(
    r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2025/04/logo-theme-wp-gia-re-1024x269-1\.png',
    'images/fabric/logo.png',
    html
)
html = html.replace('alt="Mẫu web thang máy avalift"', 'alt="Cửa Hàng Vải Thun Tiến Phát Đạt"')

# 4. Replace Slider images
html = re.sub(
    r'<div class="banner has-hover bg-zoom" id="banner-1180612697">([\s\S]*?)https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/Rectangle\.png',
    r'<div class="banner has-hover bg-zoom" id="banner-1180612697">\1images/fabric/1-1.png',
    html
)
html = re.sub(
    r'<div class="banner has-hover" id="banner-1227041837">([\s\S]*?)https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/Rectangle\.png',
    r'<div class="banner has-hover" id="banner-1227041837">\1images/fabric/2-3.png',
    html
)

# 5. Fix Why Choose Us icons to local images
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/Rectangle-19\.png', 'images/Rectangle-19.png', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2025/04/tc1-7084\.png', 'images/tc1-7084.png', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2025/04/icon-02\.png', 'images/icon-02.png', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2025/04/tc2-9201\.png', 'images/tc2-9201.png', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2025/04/tc3-9217\.png', 'images/tc3-9217.png', html)

# 6. Replace 4 Product Category Images
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/thangmaugiadinh\.png', 'images/fabric/vải-cottton-2c.jpg', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/cat-02\.png', 'images/fabric/vải-thun-cá-sấu-pe-4c-450x450.jpg', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/cat-03\.png', 'images/fabric/vải-thun-poly-2da-4c-450x450.jpg', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/cat-04\.png', 'images/fabric/vải-thun-nỉ-pe-2c-cào-lông--450x450.jpg', html)

# 7. Replace Product Showcase Cards in Tab
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/Rectangle-5\.png', 'images/fabric/screenshot_1705137401-450x450.png', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/Rectangle-10\.png', 'images/fabric/cá-sấu-cotton-lục-giác-may-áo-polo-450x450.jpg', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/Rectangle-11\.png', 'images/fabric/vải-thun-cá-sấu-poli-thái-4c-450x450.jpg', html)

# 8. Replace About Section images
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/anh-00\.png', 'images/fabric/3-1.png', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/anh-01\.png', 'images/fabric/localbrand.jpg', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/anh-02\.png', 'images/fabric/www.reallygreatsite.com_.png', html)

# 9. Replace Services 4 Cards images
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/image-3-1-2\.png', 'images/fabric/vải-cottton-2c.jpg', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/image-3-2-1\.png', 'images/fabric/vải-thun-cá-sấu-cotton-4c--450x450.jpg', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/image-3-3-1\.png', 'images/fabric/vải-thun-cá-sấu-poli-thái-4c-450x450.jpg', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/image-3-3\.png', 'images/fabric/vải-thun-bóng-cào-tricot-450x450.jpg', html)

# 10. Replace Projects / Thực tế images
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/2023/05/Rectangle-12\.png', 'images/fabric/1-1.png', html)

# 11. Fix mobile menu & contact icon images to local
html = re.sub(r'/wp-content/uploads/2024/04/vtw-menu\.png', 'images/vtw-menu.png', html)
html = re.sub(r'/wp-content/uploads/2024/04/gui-yeu-cau-icon\.png', 'images/gui-yeu-cau-icon.png', html)
html = re.sub(r'/wp-content/uploads/2024/04/button-contact-3399-2\.jpg', 'images/button-contact-3399-2.jpg', html)
html = re.sub(r'/wp-content/uploads/2024/04/messenger-icon\.png', 'images/messenger-icon.png', html)
html = re.sub(r'/wp-content/uploads/2024/04/zalo-150x150-1\.png', 'images/zalo-150x150-1.png', html)

# Replace any remaining thangmay1 remote images
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/[^"\']+/Rectangle\.png', 'images/fabric/1-1.png', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/[^"\']+/Rectangle-5\.png', 'images/fabric/screenshot_1705137401-450x450.png', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/[^"\']+/Rectangle-10\.png', 'images/fabric/3-1.png', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/[^"\']+/Rectangle-11\.png', 'images/fabric/2-3.png', html)
html = re.sub(r'https://thangmay1\.mauthemewp\.com/wp-content/uploads/[^"\']+/Rectangle-12\.png', 'images/fabric/1-1.png', html)

# 12. TEXT REPLACEMENTS (Careful, preserving all tags and classes)

# Title
html = re.sub(r'<title>.*?</title>', '<title>Cửa Hàng Vải Thun Tiến Phát Đạt - Chuyên Cung Cấp Sỉ & Lẻ Vải Thun May Mặc Toàn Quốc</title>', html, flags=re.DOTALL)

# Topbar
html = html.replace('9:00 sáng tới 6:00 chiều', '7:30 sáng tới 18:00 chiều (Thứ 2 - Thứ 7)')
html = html.replace('123.456.789', '0938.591.207')
html = html.replace('tel:123.456.789', 'tel:0938591207')

# Slider text
html = html.replace('Giải pháp thang máy cho mọi công trình', 'Giải Pháp Vải Thun Cho Mọi Xưởng May')
html = html.replace('Khám phá bộ sưu tập giải pháp thang máy của chúng tôi.', 'Khám phá bộ sưu tập 26 mẫu vải thun cao cấp của Tiến Phát Đạt.')

# Why choose us text
html = html.replace('AN TOÀN VƯỢT TRỘI', 'CHẤT LƯỢNG VƯỢT TRỘI')
html = html.replace('CÔNG NGHỆ HIỆN ĐẠI', 'ĐA DẠNG BẢNG MÀU')
html = html.replace('DỊCH VỤ TẬN TÂM', 'GIÁ GỐC TẬN XƯỞNG')
html = html.replace('TIẾT KIỆM NGÂN SÁCH', 'GIAO HÀNG TOÀN QUỐC')

# Counter text
html = html.replace('Công Trình', 'Khách Hàng Xưởng May')
html = html.replace('Năm Kinh Nghiệm', 'Năm Kinh Nghiệm Phân Phối')
html = html.replace('Tỉnh Thành Lắp Đặt', 'Tỉnh Thành Giao Hàng')
html = html.replace('Sản Phẩm Đã Bán', 'Mét Vải Cung Ứng / Tháng')

# Categories section
html = html.replace('Các Loại thang máy', 'Các Loại Vải Thun Tiêu Biểu')
html = html.replace('Thang máy gia đình', 'Vải Thun Cotton & Tici')
html = html.replace('Thang máy khách sạn', 'Vải Thun Cá Sấu Polo')
html = html.replace('Thang máy nhà hàng', 'Thun Lạnh & Thể Thao')
html = html.replace('Thang máy tải hàng', 'Vải Mè, Nỉ & Da Cá')

# About section
html = html.replace('Đơn vị cung cấp thi công thang máy số 1 việt nam', 'Đơn Vị Cung Cấp Vải Thun May Mặc Uy Tín Tại TP.HCM')

# Services section
html = html.replace('Dịch vụ của chúng tôi', 'Dịch Vụ Cung Cấp Vải Thun')
html = html.replace('Lắp Đặt MớiThang Máy', 'Cung Cấp Sỉ & Lẻ Vải Thun')
html = html.replace('Bảo trì thang máy', 'Dệt & Nhuộm Theo Yêu Cầu')
html = html.replace('Cải tạo thang máy', 'Bảng Màu & Cắt Mẫu Miễn Phí')
html = html.replace('Bảo Dưỡng & Phục Hồi Đá', 'Giao Hàng Xưởng May Toàn Quốc')

# Projects section
html = html.replace('Công Trình Thực Tế', 'Kho Vải & Đơn Hàng Thực Tế')
html = html.replace('CÔNG TRÌNH THỰC TẾ', 'KHO VẢI & ĐƠN HÀNG THỰC TẾ')

# Footer company info
html = html.replace('CÔNG TY TNHH TPEC VIỆT NAM', 'CỬA HÀNG VẢI THUN TIẾN PHÁT ĐẠT')
html = html.replace('[ Hà Nội ] Số 8 BT2, ngõ 66 đường Kim Giang, Đại Kim, Hoàng Mai, Hà Nội', '[ TP.HCM ] 33 Lê Cảnh Tuân, P. Phú Thọ Hòa, Q. Tân Phú, TP. Hồ Chí Minh')
html = html.replace('[ Quảng Ninh ] Số 26,Tổ 1, Khu 6, p. Hồng Hà, tp. Hạ Long, Quảng Ninh', 'Chuyên cung cấp sỉ & lẻ các loại vải thun may mặc, thời trang, local brand trên toàn quốc')
html = html.replace('0862 164 168', '0938.591.207')
html = html.replace('0999999999', '0938.591.207')
html = html.replace('TPEC.COM.VN', 'vaithuntienphatdat.com')
html = html.replace('tpecelevator@gmail.com', 'vaithuntienphatdat@gmail.com')

# Footer products list
html = html.replace('Thang máy kính đẹp, hiện đại', 'Vải Cotton 100% 4 Chiều')
html = html.replace('Thang máy Fuji Nhật Bản', 'Vải Thun Cá Sấu PE')
html = html.replace('Thang máy không hố pit', 'Vải Thun Lạnh Poly 2 Da')
html = html.replace('Thang máy Mitsubishi', 'Vải Mè Lưới Thể Thao')
html = html.replace('Thang máy NIPPON', 'Vải Nỉ Pe Cào Lông, Da Cá')

# Floating buttons
html = html.replace('http://zalo.me/0999999999', 'https://zalo.me/0938591207')
html = html.replace('https://zalo.me/0999999999', 'https://zalo.me/0938591207')
html = html.replace('tel:0999999999', 'tel:0938591207')
html = html.replace('http://m.me/AAAA.vn', 'https://zalo.me/0938591207')

# 13. Remove spam theme demo bar at bottom
html = re.sub(r'<div\s+class="twp-showdemo-bar"[\s\S]*?</div>\s*</div>', '', html)

# 14. Inject script to ensure Flickity runs and hide spin loader
fix_script = """
<script>
jQuery(document).ready(function($) {
  $('.loading-spin').hide();
  if (typeof $.fn.flickity !== 'undefined') {
    $('.slider').each(function() {
      var $s = $(this);
      if (!$s.hasClass('flickity-enabled')) {
        $s.flickity({
          cellAlign: 'center',
          imagesLoaded: true,
          wrapAround: true,
          autoPlay: 6000,
          pauseAutoPlayOnHover: true,
          prevNextButtons: true,
          pageDots: true,
          adaptiveHeight: true
        });
      }
    });
  }
});
</script>
</body>
"""
html = html.replace('</body>', fix_script)

# Save to source_thangmay1/index.html
with open('source_thangmay1/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done! HTML size:", len(html))
