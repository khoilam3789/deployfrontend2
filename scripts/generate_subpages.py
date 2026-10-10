import os, re, sys, io, shutil

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Read source_thangmay1/index.html to extract common layout blocks
with open('source_thangmay1/index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# 1. Extract Head (everything up to </head>)
head_match = re.search(r'(<!DOCTYPE html>[\s\S]*?</head>)', index_html)
common_head = head_match.group(1) if head_match else ''

# 2. Extract Header (<body ...>...<header id="header">...</header>)
# In Flatsome, header structure starts with <body>, #wrapper, #header:
header_match = re.search(r'(<body[\s\S]*?</header>)', index_html)
if not header_match:
    header_match = re.search(r'(<div id="top-bar"[\s\S]*?</header>)', index_html)
common_header = header_match.group(1) if header_match else ''

header_style_override = """
<style id="header-panel-subpage-override">
/* Persistent Header Dark Frosted Panel across all subpages */
#header,
.header-wrapper,
#header .header-main {
  background: rgba(24, 30, 38, 0.96) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35) !important;
}
.header-main .nav > li > a {
  color: #f8fafc !important;
  font-weight: 600 !important;
  letter-spacing: 0.3px !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5) !important;
}
.header-main .nav > li > a:hover,
.header-main .nav > li.active > a,
.header-main .nav > li.current-menu-item > a,
.header-main .nav > li > a.active {
  color: #F58634 !important;
}
.header-main #logo img {
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) !important;
}
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
"""
common_head = common_head.replace('</head>', header_style_override + '\n</head>')

# 3. Extract Footer (<footer id="footer"[\s\S]*?</footer>)
footer_match = re.search(r'(<footer id="footer"[\s\S]*?</footer>)', index_html)
common_footer = footer_match.group(1) if footer_match else ''

# 4. Extract bottom scripts and closing tags (from after footer to </html>)
closing_match = re.search(r'</footer>([\s\S]*?</html>)', index_html)
common_closing = closing_match.group(1) if closing_match else '</body></html>'

print('Extracted common layout blocks successfully!')
print(f'Head: {len(common_head)} | Header: {len(common_header)} | Footer: {len(common_footer)} | Closing: {len(common_closing)}')

def build_header(active_nav='home'):
    h = common_header
    # Replace active states on header-nav
    # First remove any current active
    h = h.replace('current-menu-item active', '')
    
    # Update navigation menu URLs so they point to full pages
    h = re.sub(r'href="#"\s+class="nav-top-link">Trang chủ', 'href="index.html" class="nav-top-link">Trang chủ', h)
    h = re.sub(r'href="#gioi-thieu"', 'href="gioi-thieu.html"', h)
    h = re.sub(r'href="#dich-vu"', 'href="chuyen-muc-dich-vu.html"', h)
    h = re.sub(r'href="#kho-hang"', 'href="du-an.html"', h)
    h = re.sub(r'href="#lien-he"', 'href="lien-he.html"', h)
    h = re.sub(r'href="#san-pham"', 'href="index.html#san-pham"', h)
    h = re.sub(r'href="#tin-tuc"', 'href="index.html#tin-tuc"', h)
    
    # Add active class to corresponding menu item
    if active_nav == 'gioi-thieu':
        h = h.replace('href="gioi-thieu.html"', 'href="gioi-thieu.html" class="active"')
        h = re.sub(r'(<li[^>]*><a[^>]*href="gioi-thieu\.html")', r'<li class="current-menu-item active"><a href="gioi-thieu.html"', h)
    elif active_nav == 'dich-vu':
        h = re.sub(r'(<li[^>]*><a[^>]*href="chuyen-muc-dich-vu\.html")', r'<li class="current-menu-item active"><a href="chuyen-muc-dich-vu.html"', h)
    elif active_nav == 'kho-vai':
        h = re.sub(r'(<li[^>]*><a[^>]*href="du-an\.html")', r'<li class="current-menu-item active"><a href="du-an.html"', h)
    elif active_nav == 'lien-he':
        h = re.sub(r'(<li[^>]*><a[^>]*href="lien-he\.html")', r'<li class="current-menu-item active"><a href="lien-he.html"', h)
    elif active_nav == 'home':
        h = re.sub(r'(<li[^>]*><a[^>]*href="index\.html")', r'<li class="current-menu-item active"><a href="index.html"', h)
        
    return h

# ==============================================================================
# 1. BUILD GIOI-THIEU.HTML (ABOUT PAGE)
# ==============================================================================
def generate_gioi_thieu():
    title = "Giới Thiệu - Cửa Hàng Vải Thun Tiến Phát Đạt"
    head = common_head.replace(re.search(r'<title>.*?</title>', common_head).group(0), f'<title>{title}</title>')
    header = build_header('gioi-thieu')
    
    main_content = """
    <main id="main" class="">
        <!-- Page Title Banner -->
        <div class="page-header-wrapper">
            <div class="page-title dark featured-title" style="background: linear-gradient(rgba(18, 24, 33, 0.85), rgba(18, 24, 33, 0.90)), url('images/fabric/hero_warehouse.jpg') center/cover no-repeat; padding: 75px 0 55px; border-bottom: 2px solid #F58634;">
                <div class="page-title-inner container flex-row medium-flex-wrap" style="align-items: center; justify-content: space-between;">
                    <div class="flex-col">
                        <h1 class="entry-title uppercase mb-0" style="font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">Giới Thiệu</h1>
                        <p style="color: #cbd5e1; margin-top: 8px; font-size: 15px; margin-bottom: 0;">Nguồn Cung Cấp Sỉ & Lẻ Vải Thun May Mặc Uy Tín Tại TP. Hồ Chí Minh</p>
                    </div>
                    <div class="flex-col">
                        <nav class="breadcrumbs" style="color: #94a3b8; font-size: 14px;">
                            <a href="index.html" style="color: #e2e8f0; text-decoration: none;">Trang chủ</a> <span class="divider" style="margin: 0 6px;">/</span> <span class="current" style="color: #F58634; font-weight: 600;">Giới thiệu</span>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <div id="content" class="content-area page-wrapper py-5" role="main" style="padding: 60px 0; background: #ffffff;">
            <div class="container">
                <!-- Section 1: About Story & Image -->
                <div class="row row-large align-middle" style="display: flex; flex-wrap: wrap; margin-bottom: 60px;">
                    <div class="col medium-6 small-12 large-6" style="padding: 20px;">
                        <span style="color: #F58634; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 10px;">VỀ CHÚNG TÔI</span>
                        <h2 style="font-size: 32px; font-weight: 800; color: #111827; line-height: 1.3; margin-bottom: 20px;">Cửa Hàng Vải Thun Tiến Phát Đạt</h2>
                        <div style="width: 60px; height: 3px; background: #F58634; margin-bottom: 25px;"></div>
                        
                        <p style="font-size: 15px; line-height: 1.8; color: #374151; text-align: justify; margin-bottom: 18px;">
                            Tọa lạc tại địa chỉ <strong>33 Lê Cảnh Tuân, P. Phú Thọ Hòa, Q. Tân Phú, TP.HCM</strong> – trung tâm của khu vực giao thương dệt may sầm uất nhất miền Nam, <strong>Cửa Hàng Vải Thun Tiến Phát Đạt</strong> tự hào là đối tác cung ứng vải thun hàng đầu cho hàng trăm xưởng may gia công, nhà thiết kế và các thương hiệu thời trang Local Brand trên khắp cả nước.
                        </p>
                        <p style="font-size: 15px; line-height: 1.8; color: #374151; text-align: justify; margin-bottom: 25px;">
                            Với phương châm <em>"Chất lượng tạo niềm tin - Giá xuất xưởng tận gốc"</em>, chúng tôi luôn kiểm soát chặt chẽ từng cây vải xuất kho: sợi dệt kim đều đặn, định lượng GSM chuẩn xác, độ đàn hồi tự nhiên và độ bền màu vượt trội qua nhiều lần giặt. Kho hàng rộng rãi với hơn <strong>60+ tông màu có sẵn</strong> sẵn sàng đáp ứng nhanh chóng từ đơn hàng vài mét cắt mẫu đến hàng chục tấn vải theo lô.
                        </p>

                        <!-- Highlights Check Grid -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 30px;">
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #1f2937;">
                                <i class="fa-solid fa-circle-check" style="color: #F58634;"></i> Vải Cotton 2C & 4C
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #1f2937;">
                                <i class="fa-solid fa-circle-check" style="color: #F58634;"></i> Cá Sấu Polo Cao Cấp
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #1f2937;">
                                <i class="fa-solid fa-circle-check" style="color: #F58634;"></i> Thun Lạnh Thể Thao
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #1f2937;">
                                <i class="fa-solid fa-circle-check" style="color: #F58634;"></i> Vải Mè & Lưới Nhún
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #1f2937;">
                                <i class="fa-solid fa-circle-check" style="color: #F58634;"></i> Vải Nỉ & Da Cá Dày
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #1f2937;">
                                <i class="fa-solid fa-circle-check" style="color: #F58634;"></i> Bo Gân Phụ Liệu Đồng Bộ
                            </div>
                        </div>

                        <!-- CTA buttons -->
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <a href="tel:0938591207" class="button primary" style="background: #F58634; border-radius: 4px; padding: 12px 24px; font-weight: 700; font-size: 14px; text-transform: uppercase;">
                                <i class="fa-solid fa-phone" style="margin-right: 6px;"></i> Hotline: 0938.591.207
                            </a>
                            <a href="https://zalo.me/0938591207" target="_blank" class="button secondary" style="background: #0084ff; border-radius: 4px; padding: 12px 24px; font-weight: 700; font-size: 14px; text-transform: uppercase;">
                                <i class="fa-solid fa-comments" style="margin-right: 6px;"></i> Tư Vấn Zalo 24/7
                            </a>
                        </div>
                    </div>

                    <div class="col medium-6 small-12 large-6" style="padding: 20px;">
                        <div style="position: relative; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.12);">
                            <img src="images/fabric/hero_warehouse.jpg" alt="Kho Vải Thun Tiến Phát Đạt" style="width: 100%; height: auto; display: block; border-radius: 12px;">
                            <div style="position: absolute; bottom: 20px; left: 20px; right: 20px; background: rgba(18, 24, 33, 0.92); backdrop-filter: blur(8px); padding: 20px; border-radius: 8px; border-left: 4px solid #F58634; color: #fff;">
                                <h4 style="color: #fff; margin-bottom: 5px; font-weight: 700; font-size: 16px;">Kho Hàng Tân Phú - TP.HCM</h4>
                                <p style="color: #cbd5e1; font-size: 13px; margin-bottom: 0;">Sẵn sàng hàng chục tấn vải cây tại kho. Hỗ trợ giao hàng hỏa tốc trong ngày.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section 2: Why Choose Us (4 Cards) -->
                <div style="text-align: center; margin-bottom: 45px;">
                    <span style="color: #F58634; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 8px;">GIÁ TRỊ CỐT LÕI</span>
                    <h2 style="font-size: 28px; font-weight: 800; color: #111827;">Tại Sao Khách Hàng Chọn Tiến Phát Đạt?</h2>
                    <div style="width: 50px; height: 3px; background: #F58634; margin: 15px auto;"></div>
                </div>

                <div class="row" style="display: flex; flex-wrap: wrap; margin: 0 -15px 50px;">
                    <div class="col medium-3 small-6 large-3" style="padding: 15px;">
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 30px 20px; border-radius: 10px; text-align: center; height: 100%; transition: all 0.3s ease;">
                            <div style="width: 60px; height: 60px; background: rgba(245, 134, 52, 0.12); color: #F58634; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 0 auto 18px;">
                                <i class="fa-solid fa-award"></i>
                            </div>
                            <h4 style="font-size: 17px; font-weight: 700; color: #1e293b; margin-bottom: 10px;">Chất Lượng Vượt Trội</h4>
                            <p style="font-size: 13.5px; color: #64748b; line-height: 1.6; margin-bottom: 0;">Sợi dệt cao cấp, mình vải dày dặn, co giãn 4 chiều mềm mại, không bai nhão hay xù lông sau khi giặt.</p>
                        </div>
                    </div>
                    <div class="col medium-3 small-6 large-3" style="padding: 15px;">
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 30px 20px; border-radius: 10px; text-align: center; height: 100%; transition: all 0.3s ease;">
                            <div style="width: 60px; height: 60px; background: rgba(245, 134, 52, 0.12); color: #F58634; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 0 auto 18px;">
                                <i class="fa-solid fa-palette"></i>
                            </div>
                            <h4 style="font-size: 17px; font-weight: 700; color: #1e293b; margin-bottom: 10px;">Đa Dạng Bảng Màu</h4>
                            <p style="font-size: 13.5px; color: #64748b; line-height: 1.6; margin-bottom: 0;">Hơn 60+ tông màu thời trang luôn sẵn cây tại kho, liên tục cập nhật theo xu hướng thời trang và Local Brand.</p>
                        </div>
                    </div>
                    <div class="col medium-3 small-6 large-3" style="padding: 15px;">
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 30px 20px; border-radius: 10px; text-align: center; height: 100%; transition: all 0.3s ease;">
                            <div style="width: 60px; height: 60px; background: rgba(245, 134, 52, 0.12); color: #F58634; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 0 auto 18px;">
                                <i class="fa-solid fa-tags"></i>
                            </div>
                            <h4 style="font-size: 17px; font-weight: 700; color: #1e293b; margin-bottom: 10px;">Giá Gốc Tận Xưởng</h4>
                            <p style="font-size: 13.5px; color: #64748b; line-height: 1.6; margin-bottom: 0;">Phân phối trực tiếp từ nhà máy dệt nhuộm không qua trung gian, chính sách chiết khấu cực tốt cho đơn số lượng lớn.</p>
                        </div>
                    </div>
                    <div class="col medium-3 small-6 large-3" style="padding: 15px;">
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 30px 20px; border-radius: 10px; text-align: center; height: 100%; transition: all 0.3s ease;">
                            <div style="width: 60px; height: 60px; background: rgba(245, 134, 52, 0.12); color: #F58634; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 0 auto 18px;">
                                <i class="fa-solid fa-truck-fast"></i>
                            </div>
                            <h4 style="font-size: 17px; font-weight: 700; color: #1e293b; margin-bottom: 10px;">Giao Hàng Toàn Quốc</h4>
                            <p style="font-size: 13.5px; color: #64748b; line-height: 1.6; margin-bottom: 0;">Đóng gói cẩn thận, hỗ trợ vận chuyển nhanh trong ngày tại TP.HCM và gửi chành xe uy tín đến các tỉnh thành cả nước.</p>
                        </div>
                    </div>
                </div>

                <!-- Section 3: Product Showcase Photos -->
                <div style="background: #f1f5f9; padding: 45px 30px; border-radius: 12px; margin-bottom: 40px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h3 style="font-size: 24px; font-weight: 800; color: #0f172a;">Hình Ảnh Sản Phẩm & Kho Vải Thực Tế</h3>
                        <p style="color: #64748b; font-size: 14px;">Chất lượng thật - Hình ảnh chụp trực tiếp từ các sản phẩm của Tiến Phát Đạt</p>
                    </div>
                    <div class="row" style="display: flex; flex-wrap: wrap; margin: 0 -10px;">
                        <div class="col medium-4 small-12 large-4" style="padding: 10px;">
                            <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                                <img src="images/fabric/localbrand.jpg" alt="Vải Thun Local Brand" style="width: 100%; height: 260px; object-fit: cover; display: block;">
                            </div>
                        </div>
                        <div class="col medium-4 small-12 large-4" style="padding: 10px;">
                            <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                                <img src="images/fabric/anh-01.png" alt="Áo Thun Polo Vải Cá Sấu" style="width: 100%; height: 260px; object-fit: cover; display: block;">
                            </div>
                        </div>
                        <div class="col medium-4 small-4 large-4" style="padding: 10px;">
                            <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                                <img src="images/fabric/hero_swatches.jpg" alt="Bảng Màu Vải Thun Phong Phú" style="width: 100%; height: 260px; object-fit: cover; display: block;">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
    """
    full_html = head + header + main_content + common_footer + common_closing
    return full_html

# ==============================================================================
# 2. BUILD LIEN-HE.HTML (CONTACT PAGE)
# ==============================================================================
def generate_lien_he():
    title = "Liên Hệ & Báo Giá - Cửa Hàng Vải Thun Tiến Phát Đạt"
    head = common_head.replace(re.search(r'<title>.*?</title>', common_head).group(0), f'<title>{title}</title>')
    header = build_header('lien-he')
    
    main_content = """
    <main id="main" class="">
        <!-- Page Title Banner -->
        <div class="page-header-wrapper">
            <div class="page-title dark featured-title" style="background: linear-gradient(rgba(18, 24, 33, 0.85), rgba(18, 24, 33, 0.90)), url('images/fabric/hero_swatches.jpg') center/cover no-repeat; padding: 75px 0 55px; border-bottom: 2px solid #F58634;">
                <div class="page-title-inner container flex-row medium-flex-wrap" style="align-items: center; justify-content: space-between;">
                    <div class="flex-col">
                        <h1 class="entry-title uppercase mb-0" style="font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">Liên Hệ & Báo Giá</h1>
                        <p style="color: #cbd5e1; margin-top: 8px; font-size: 15px; margin-bottom: 0;">Tư Vấn Báo Giá & Gửi Catalog Mẫu Vải Miễn Phí Tận Nơi</p>
                    </div>
                    <div class="flex-col">
                        <nav class="breadcrumbs" style="color: #94a3b8; font-size: 14px;">
                            <a href="index.html" style="color: #e2e8f0; text-decoration: none;">Trang chủ</a> <span class="divider" style="margin: 0 6px;">/</span> <span class="current" style="color: #F58634; font-weight: 600;">Liên hệ</span>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <div id="content" class="content-area page-wrapper py-5" role="main" style="padding: 60px 0; background: #ffffff;">
            <div class="container">
                <div class="row row-large" style="display: flex; flex-wrap: wrap; margin-bottom: 50px;">
                    <!-- Left Column: Store Contact Info -->
                    <div class="col medium-6 small-12 large-6" style="padding: 20px;">
                        <span style="color: #F58634; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 10px;">THÔNG TIN TRỰC TIẾP</span>
                        <h2 style="font-size: 28px; font-weight: 800; color: #111827; margin-bottom: 15px;">Cửa Hàng Vải Thun Tiến Phát Đạt</h2>
                        <div style="width: 50px; height: 3px; background: #F58634; margin-bottom: 25px;"></div>
                        
                        <p style="font-size: 14.5px; color: #4b5563; line-height: 1.7; margin-bottom: 25px;">
                            Quý xưởng may, công ty thời trang hoặc cá nhân cần tư vấn dòng vải, nhận catalog mẫu vải thực tế hoặc yêu cầu báo giá dệt nhuộm, xin vui lòng liên hệ với chúng tôi qua các kênh dưới đây:
                        </p>

                        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 30px;">
                            <div style="display: flex; align-items: flex-start; gap: 15px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                                <div style="width: 44px; height: 44px; background: #F58634; color: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; shrink: 0;">
                                    <i class="fa-solid fa-location-dot"></i>
                                </div>
                                <div>
                                    <strong style="color: #0f172a; font-size: 15px; display: block; margin-bottom: 4px;">Địa chỉ kho hàng:</strong>
                                    <span style="color: #475569; font-size: 14px; line-height: 1.5;">33 Lê Cảnh Tuân, P. Phú Thọ Hòa, Q. Tân Phú, TP. Hồ Chí Minh</span>
                                </div>
                            </div>

                            <div style="display: flex; align-items: flex-start; gap: 15px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                                <div style="width: 44px; height: 44px; background: #F58634; color: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; shrink: 0;">
                                    <i class="fa-solid fa-phone"></i>
                                </div>
                                <div>
                                    <strong style="color: #0f172a; font-size: 15px; display: block; margin-bottom: 4px;">Hotline tư vấn & Báo giá:</strong>
                                    <span style="color: #475569; font-size: 14px;"><a href="tel:0938591207" style="color: #F58634; font-weight: 700; text-decoration: none;">0938.591.207</a> &nbsp;|&nbsp; <a href="tel:0937116704" style="color: #0f172a; font-weight: 600; text-decoration: none;">0937.116.704</a></span>
                                </div>
                            </div>

                            <div style="display: flex; align-items: flex-start; gap: 15px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                                <div style="width: 44px; height: 44px; background: #0084ff; color: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; shrink: 0;">
                                    <i class="fa-solid fa-comment-dots"></i>
                                </div>
                                <div>
                                    <strong style="color: #0f172a; font-size: 15px; display: block; margin-bottom: 4px;">Zalo báo giá nhanh:</strong>
                                    <span style="color: #475569; font-size: 14px;"><a href="https://zalo.me/0938591207" target="_blank" style="color: #0084ff; font-weight: 700; text-decoration: none;">0938.591.207 (Tiến Phát Đạt)</a></span>
                                </div>
                            </div>

                            <div style="display: flex; align-items: flex-start; gap: 15px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                                <div style="width: 44px; height: 44px; background: #F58634; color: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; shrink: 0;">
                                    <i class="fa-solid fa-clock"></i>
                                </div>
                                <div>
                                    <strong style="color: #0f172a; font-size: 15px; display: block; margin-bottom: 4px;">Giờ mở cửa phục vụ:</strong>
                                    <span style="color: #475569; font-size: 14px;">7:30 sáng – 18:00 chiều (Thứ 2 đến Thứ 7 hàng tuần)</span>
                                </div>
                            </div>

                            <div style="display: flex; align-items: flex-start; gap: 15px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                                <div style="width: 44px; height: 44px; background: #F58634; color: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; shrink: 0;">
                                    <i class="fa-solid fa-envelope"></i>
                                </div>
                                <div>
                                    <strong style="color: #0f172a; font-size: 15px; display: block; margin-bottom: 4px;">Email liên hệ:</strong>
                                    <span style="color: #475569; font-size: 14px;">vaithuntienphatdat@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Interactive Quote Request Form -->
                    <div class="col medium-6 small-12 large-6" style="padding: 20px;">
                        <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 12px; padding: 35px 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
                            <span style="color: #F58634; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 8px;">GỬI YÊU CẦU</span>
                            <h2 style="font-size: 24px; font-weight: 800; color: #111827; margin-bottom: 8px;">Yêu Cầu Báo Giá & Mẫu Vải</h2>
                            <p style="font-size: 13.5px; color: #64748b; margin-bottom: 25px;">Điền thông tin dưới đây, chúng tôi sẽ liên hệ lại trong vòng 15 phút!</p>

                            <form id="contact-form" onsubmit="event.preventDefault(); document.getElementById('form-success').style.display='block'; this.reset();" style="display: flex; flex-direction: column; gap: 16px;">
                                <div>
                                    <label style="font-size: 13px; font-weight: 700; color: #374151; display: block; margin-bottom: 6px;">Họ và tên của bạn *</label>
                                    <input type="text" required placeholder="Ví dụ: Nguyễn Văn An" style="width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; transition: border-color 0.2s;">
                                </div>

                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                    <div>
                                        <label style="font-size: 13px; font-weight: 700; color: #374151; display: block; margin-bottom: 6px;">Số điện thoại (Zalo) *</label>
                                        <input type="tel" required placeholder="0909 xxx xxx" style="width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none;">
                                    </div>
                                    <div>
                                        <label style="font-size: 13px; font-weight: 700; color: #374151; display: block; margin-bottom: 6px;">Email (nếu có)</label>
                                        <input type="email" placeholder="email@gmail.com" style="width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none;">
                                    </div>
                                </div>

                                <div>
                                    <label style="font-size: 13px; font-weight: 700; color: #374151; display: block; margin-bottom: 6px;">Loại vải bạn đang quan tâm</label>
                                    <select style="width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; background: #fff; outline: none;">
                                        <option value="Cotton 2C">Vải Thun Cotton 2C (100% Cotton / CVC)</option>
                                        <option value="Cotton 4C">Vải Thun Cotton 4C Co Giãn</option>
                                        <option value="Cá Sấu Polo">Vải Cá Sấu Polo (Poly/PE/Cotton)</option>
                                        <option value="Thun Lạnh Thể Thao">Thun Lạnh & Poly Thể Thao</option>
                                        <option value="Vải Mè - Lưới">Vải Mè Kiểu & Lưới Nhún</option>
                                        <option value="Nỉ Bông - Da Cá">Vải Nỉ Bông & Da Cá Dày</option>
                                        <option value="Dệt nhuộm riêng">Yêu cầu dệt nhuộm màu riêng theo Pantone</option>
                                    </select>
                                </div>

                                <div>
                                    <label style="font-size: 13px; font-weight: 700; color: #374151; display: block; margin-bottom: 6px;">Nội dung / Yêu cầu cụ thể</label>
                                    <textarea rows="4" placeholder="Nhập số lượng dự kiến, định lượng GSM hoặc yêu cầu gửi bảng màu..." style="width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none;"></textarea>
                                </div>

                                <button type="submit" style="background: #F58634; color: #ffffff; font-weight: 700; font-size: 15px; text-transform: uppercase; padding: 14px 20px; border: none; border-radius: 6px; cursor: pointer; transition: background 0.2s; margin-top: 8px;">
                                    <i class="fa-solid fa-paper-plane" style="margin-right: 8px;"></i> GỬI YÊU CẦU BÁO GIÁ
                                </button>
                                
                                <div id="form-success" style="display: none; background: #ecfdf5; border: 1px solid #6ee7b7; color: #065f46; padding: 14px; border-radius: 6px; font-size: 14px; font-weight: 600; text-align: center;">
                                    <i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 6px;"></i> Cảm ơn bạn! Chúng tôi đã nhận được thông tin và sẽ liên hệ lại ngay!
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Section: Embedded Google Map -->
                <div style="margin-top: 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
                    <div style="background: #1e293b; color: #fff; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between;">
                        <span style="font-weight: 700; font-size: 15px;"><i class="fa-solid fa-map-location-dot" style="color: #F58634; margin-right: 8px;"></i> Vị Trí Kho Hàng Trên Google Maps</span>
                        <span style="font-size: 13px; color: #94a3b8;">33 Lê Cảnh Tuân, Phú Thọ Hòa, Tân Phú, TP.HCM</span>
                    </div>
                    <iframe src="https://maps.google.com/maps?q=33%20L%C3%AA%20C%E1%BA%A3nh%20Tu%C3%A2n%2C%20Ph%C3%BA%20Th%E1%BB%8D%20H%C3%B2a%2C%20T%C3%A2n%20Ph%C3%BA%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="450" style="border:0; display: block;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    </main>
    """
    full_html = head + header + main_content + common_footer + common_closing
    return full_html

# ==============================================================================
# 3. BUILD CHUYEN-MUC-DICH-VU.HTML / DICH-VU.HTML (SERVICES PAGE)
# ==============================================================================
def generate_dich_vu():
    title = "Dịch Vụ Cung Cấp Vải Thun - Cửa Hàng Vải Thun Tiến Phát Đạt"
    head = common_head.replace(re.search(r'<title>.*?</title>', common_head).group(0), f'<title>{title}</title>')
    header = build_header('dich-vu')
    
    main_content = """
    <main id="main" class="">
        <!-- Page Title Banner -->
        <div class="page-header-wrapper">
            <div class="page-title dark featured-title" style="background: linear-gradient(rgba(18, 24, 33, 0.85), rgba(18, 24, 33, 0.90)), url('images/fabric/hero_warehouse.jpg') center/cover no-repeat; padding: 75px 0 55px; border-bottom: 2px solid #F58634;">
                <div class="page-title-inner container flex-row medium-flex-wrap" style="align-items: center; justify-content: space-between;">
                    <div class="flex-col">
                        <h1 class="entry-title uppercase mb-0" style="font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">Dịch Vụ Cung Cấp Vải Thun</h1>
                        <p style="color: #cbd5e1; margin-top: 8px; font-size: 15px; margin-bottom: 0;">Giải Pháp Toàn Diện Về Nguồn Vải May Mặc Cho Xưởng May & Thương Hiệu Thời Trang</p>
                    </div>
                    <div class="flex-col">
                        <nav class="breadcrumbs" style="color: #94a3b8; font-size: 14px;">
                            <a href="index.html" style="color: #e2e8f0; text-decoration: none;">Trang chủ</a> <span class="divider" style="margin: 0 6px;">/</span> <span class="current" style="color: #F58634; font-weight: 600;">Dịch vụ</span>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <div id="content" class="content-area page-wrapper py-5" role="main" style="padding: 60px 0; background: #ffffff;">
            <div class="container">
                <div style="text-align: center; max-width: 800px; margin: 0 auto 50px;">
                    <span style="color: #F58634; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 8px;">DỊCH VỤ CHUYÊN NGHIỆP</span>
                    <h2 style="font-size: 30px; font-weight: 800; color: #111827; margin-bottom: 15px;">Dịch Vụ Của Cửa Hàng Vải Thun Tiến Phát Đạt</h2>
                    <div style="width: 60px; height: 3px; background: #F58634; margin: 0 auto 20px;"></div>
                    <p style="font-size: 15px; color: #4b5563; line-height: 1.7;">
                        Chúng tôi cung cấp các gói dịch vụ dệt may toàn diện, từ phân phối sỉ lẻ số lượng lớn tại kho, dệt nhuộm theo thông số kỹ thuật riêng, đến cắt mẫu gửi tận nơi và giao hàng tận xưởng trên toàn quốc.
                    </p>
                </div>

                <!-- 6 Service Cards Grid -->
                <div class="row" style="display: flex; flex-wrap: wrap; margin: 0 -15px 60px;">
                    <!-- Service 1 -->
                    <div class="col medium-4 small-12 large-4" style="padding: 15px;">
                        <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.06); height: 100%; display: flex; flex-direction: column;">
                            <div style="height: 220px; overflow: hidden;">
                                <img src="images/fabric/hero_warehouse.jpg" alt="Cung cấp sỉ lẻ vải thun" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;">
                            </div>
                            <div style="padding: 25px; flex-grow: 1; display: flex; flex-direction: column;">
                                <span style="color: #F58634; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">DỊCH VỤ 01</span>
                                <h3 style="font-size: 20px; font-weight: 800; color: #1e293b; margin-bottom: 12px;">Cung Cấp Sỉ & Lẻ Vải Thun May Mặc</h3>
                                <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 15px; flex-grow: 1;">
                                    Sẵn kho số lượng lớn các dòng vải: Cotton 2C, Cotton 4C, Cá Sấu Polo, Thun Lạnh Thể Thao, Vải Mè, Nỉ Da Cá. Đáp ứng mọi đơn hàng từ vài cây mẫu đến hàng chục tấn cho xưởng may và Local Brand.
                                </p>
                                <a href="lien-he.html" class="button" style="background: #F58634; color: #fff; font-weight: 700; font-size: 13px; text-transform: uppercase; padding: 10px 18px; border-radius: 4px; text-align: center;">
                                    Nhận Báo Giá Sỉ <i class="fa-solid fa-arrow-right" style="margin-left: 6px;"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Service 2 -->
                    <div class="col medium-4 small-12 large-4" style="padding: 15px;">
                        <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.06); height: 100%; display: flex; flex-direction: column;">
                            <div style="height: 220px; overflow: hidden;">
                                <img src="images/fabric/hero_swatches.jpg" alt="Dệt nhuộm theo yêu cầu" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;">
                            </div>
                            <div style="padding: 25px; flex-grow: 1; display: flex; flex-direction: column;">
                                <span style="color: #F58634; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">DỊCH VỤ 02</span>
                                <h3 style="font-size: 20px; font-weight: 800; color: #1e293b; margin-bottom: 12px;">Dệt & Nhuộm Theo Bảng Màu Riêng (Pantone)</h3>
                                <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 15px; flex-grow: 1;">
                                    Nhận dệt nhuộm chính xác theo mã màu Pantone, xử lý định lượng GSM (từ 180gsm đến 300gsm) và khổ vải riêng theo yêu cầu thiết kế của từng thương hiệu.
                                </p>
                                <a href="lien-he.html" class="button" style="background: #F58634; color: #fff; font-weight: 700; font-size: 13px; text-transform: uppercase; padding: 10px 18px; border-radius: 4px; text-align: center;">
                                    Đặt Nhuộm Màu Riêng <i class="fa-solid fa-arrow-right" style="margin-left: 6px;"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Service 3 -->
                    <div class="col medium-4 small-12 large-4" style="padding: 15px;">
                        <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.06); height: 100%; display: flex; flex-direction: column;">
                            <div style="height: 220px; overflow: hidden;">
                                <img src="images/fabric/bảng-màu-cotton-4c.jpg" alt="Cắt mẫu và gửi bảng màu" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;">
                            </div>
                            <div style="padding: 25px; flex-grow: 1; display: flex; flex-direction: column;">
                                <span style="color: #F58634; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">DỊCH VỤ 03</span>
                                <h3 style="font-size: 20px; font-weight: 800; color: #1e293b; margin-bottom: 12px;">Cắt Mẫu Vải & Gửi Bảng Màu Tận Nơi</h3>
                                <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 15px; flex-grow: 1;">
                                    Hỗ trợ gửi Catalog mẫu vải và bảng màu thực tế tận nơi miễn phí cho các xưởng may, công ty thời trang và nhà thiết kế trên phạm vi toàn quốc trước khi đặt hàng số lượng lớn.
                                </p>
                                <a href="lien-he.html" class="button" style="background: #F58634; color: #fff; font-weight: 700; font-size: 13px; text-transform: uppercase; padding: 10px 18px; border-radius: 4px; text-align: center;">
                                    Đăng Ký Nhận Mẫu <i class="fa-solid fa-arrow-right" style="margin-left: 6px;"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Service 4 -->
                    <div class="col medium-4 small-12 large-4" style="padding: 15px;">
                        <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.06); height: 100%; display: flex; flex-direction: column;">
                            <div style="height: 220px; overflow: hidden;">
                                <img src="images/fabric/anh-00.png" alt="Giao hàng xưởng may toàn quốc" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;">
                            </div>
                            <div style="padding: 25px; flex-grow: 1; display: flex; flex-direction: column;">
                                <span style="color: #F58634; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">DỊCH VỤ 04</span>
                                <h3 style="font-size: 20px; font-weight: 800; color: #1e293b; margin-bottom: 12px;">Giao Hàng Xưởng May Toàn Quốc</h3>
                                <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 15px; flex-grow: 1;">
                                    Vận chuyển nhanh chóng bằng chành xe uy tín đi các tỉnh hoặc giao hàng tận nơi tại TP.HCM trong ngày. Hỗ trợ tối đa chi phí vận chuyển cho các đơn hàng lớn.
                                </p>
                                <a href="lien-he.html" class="button" style="background: #F58634; color: #fff; font-weight: 700; font-size: 13px; text-transform: uppercase; padding: 10px 18px; border-radius: 4px; text-align: center;">
                                    Chi Tiết Vận Chuyển <i class="fa-solid fa-arrow-right" style="margin-left: 6px;"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Service 5 -->
                    <div class="col medium-4 small-12 large-4" style="padding: 15px;">
                        <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.06); height: 100%; display: flex; flex-direction: column;">
                            <div style="height: 220px; overflow: hidden;">
                                <img src="images/fabric/localbrand.jpg" alt="Tư vấn vải cho local brand" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;">
                            </div>
                            <div style="padding: 25px; flex-grow: 1; display: flex; flex-direction: column;">
                                <span style="color: #F58634; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">DỊCH VỤ 05</span>
                                <h3 style="font-size: 20px; font-weight: 800; color: #1e293b; margin-bottom: 12px;">Tư Vấn Vải Cho Local Brand & Thiết Kế</h3>
                                <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 15px; flex-grow: 1;">
                                    Đội ngũ am hiểu sâu sắc xu hướng thời trang giới trẻ, tư vấn dòng vải tối ưu cho áo thun form rộng Oversize, áo Boxy đứng form, Hoodie nỉ bông dày ấm hoặc đồ thể thao thoáng mát.
                                </p>
                                <a href="lien-he.html" class="button" style="background: #F58634; color: #fff; font-weight: 700; font-size: 13px; text-transform: uppercase; padding: 10px 18px; border-radius: 4px; text-align: center;">
                                    Tư Vấn Local Brand <i class="fa-solid fa-arrow-right" style="margin-left: 6px;"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Service 6 -->
                    <div class="col medium-4 small-12 large-4" style="padding: 15px;">
                        <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.06); height: 100%; display: flex; flex-direction: column;">
                            <div style="height: 220px; overflow: hidden;">
                                <img src="images/fabric/bảng-màu-bo-gân-tici.jpg" alt="Bo cổ và phụ liệu may mặc" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;">
                            </div>
                            <div style="padding: 25px; flex-grow: 1; display: flex; flex-direction: column;">
                                <span style="color: #F58634; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">DỊCH VỤ 06</span>
                                <h3 style="font-size: 20px; font-weight: 800; color: #1e293b; margin-bottom: 12px;">Cung Cấp Bo Cổ, Bo Tay & Phụ Liệu Đồng Bộ</h3>
                                <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 15px; flex-grow: 1;">
                                    Dệt bo cổ áo polo, bo tay áo thun, bo gân Tici và bo Cotton trùng khít 100% màu thân áo, giúp xưởng may hoàn thiện trang phục tinh xảo, đồng bộ và chuyên nghiệp.
                                </p>
                                <a href="lien-he.html" class="button" style="background: #F58634; color: #fff; font-weight: 700; font-size: 13px; text-transform: uppercase; padding: 10px 18px; border-radius: 4px; text-align: center;">
                                    Đặt Bo Cổ Đồng Bộ <i class="fa-solid fa-arrow-right" style="margin-left: 6px;"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Process 4 Steps -->
                <div style="background: #0f172a; color: #fff; border-radius: 12px; padding: 50px 30px; text-align: center;">
                    <span style="color: #F58634; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 8px;">QUY TRÌNH HỢP TÁC</span>
                    <h2 style="font-size: 28px; font-weight: 800; color: #ffffff; margin-bottom: 40px;">Quy Trình 4 Bước Phục Vụ Nhanh Chóng</h2>
                    
                    <div class="row" style="display: flex; flex-wrap: wrap; margin: 0 -15px;">
                        <div class="col medium-3 small-6 large-3" style="padding: 15px;">
                            <div style="background: rgba(255,255,255,0.06); padding: 30px 20px; border-radius: 8px; border-top: 3px solid #F58634; height: 100%;">
                                <div style="font-size: 32px; font-weight: 900; color: #F58634; margin-bottom: 12px;">01</div>
                                <h4 style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px;">Tiếp Nhận Nhu Cầu</h4>
                                <p style="font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 0;">Lắng nghe yêu cầu về chất liệu, định lượng, màu sắc và số lượng dự kiến.</p>
                            </div>
                        </div>
                        <div class="col medium-3 small-6 large-3" style="padding: 15px;">
                            <div style="background: rgba(255,255,255,0.06); padding: 30px 20px; border-radius: 8px; border-top: 3px solid #F58634; height: 100%;">
                                <div style="font-size: 32px; font-weight: 900; color: #F58634; margin-bottom: 12px;">02</div>
                                <h4 style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px;">Gửi Mẫu & Báo Giá</h4>
                                <p style="font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 0;">Cắt mẫu vải thực tế, gửi catalog để khách duyệt chất lượng và nhận báo giá gốc.</p>
                            </div>
                        </div>
                        <div class="col medium-3 small-6 large-3" style="padding: 15px;">
                            <div style="background: rgba(255,255,255,0.06); padding: 30px 20px; border-radius: 8px; border-top: 3px solid #F58634; height: 100%;">
                                <div style="font-size: 32px; font-weight: 900; color: #F58634; margin-bottom: 12px;">03</div>
                                <h4 style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px;">Soạn Hàng & Đóng Gói</h4>
                                <p style="font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 0;">Kiểm tra kỹ cây vải, cuộn bao bì cẩn thận chống nước, chống bụi bẩn khi di chuyển.</p>
                            </div>
                        </div>
                        <div class="col medium-3 small-6 large-3" style="padding: 15px;">
                            <div style="background: rgba(255,255,255,0.06); padding: 30px 20px; border-radius: 8px; border-top: 3px solid #F58634; height: 100%;">
                                <div style="font-size: 32px; font-weight: 900; color: #F58634; margin-bottom: 12px;">04</div>
                                <h4 style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px;">Giao Hàng & Hậu Mãi</h4>
                                <p style="font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 0;">Giao tận xưởng hoặc gửi chành xe, hỗ trợ đổi trả nếu phát hiện lỗi kỹ thuật.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
    """
    full_html = head + header + main_content + common_footer + common_closing
    return full_html

# ==============================================================================
# 4. BUILD DU-AN.HTML (KHO VẢI & ĐƠN HÀNG THỰC TẾ)
# ==============================================================================
def generate_du_an():
    title = "Kho Vải & Đơn Hàng Thực Tế - Cửa Hàng Vải Thun Tiến Phát Đạt"
    head = common_head.replace(re.search(r'<title>.*?</title>', common_head).group(0), f'<title>{title}</title>')
    header = build_header('kho-vai')
    
    main_content = """
    <main id="main" class="">
        <!-- Page Title Banner -->
        <div class="page-header-wrapper">
            <div class="page-title dark featured-title" style="background: linear-gradient(rgba(18, 24, 33, 0.85), rgba(18, 24, 33, 0.90)), url('images/fabric/hero_warehouse.jpg') center/cover no-repeat; padding: 75px 0 55px; border-bottom: 2px solid #F58634;">
                <div class="page-title-inner container flex-row medium-flex-wrap" style="align-items: center; justify-content: space-between;">
                    <div class="flex-col">
                        <h1 class="entry-title uppercase mb-0" style="font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">Kho Vải & Đơn Hàng Thực Tế</h1>
                        <p style="color: #cbd5e1; margin-top: 8px; font-size: 15px; margin-bottom: 0;">Hình Ảnh Thực Tế Kho Vải Cây & Các Lô Hàng Xuất Xưởng Của Tiến Phát Đạt</p>
                    </div>
                    <div class="flex-col">
                        <nav class="breadcrumbs" style="color: #94a3b8; font-size: 14px;">
                            <a href="index.html" style="color: #e2e8f0; text-decoration: none;">Trang chủ</a> <span class="divider" style="margin: 0 6px;">/</span> <span class="current" style="color: #F58634; font-weight: 600;">Kho vải</span>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <div id="content" class="content-area page-wrapper py-5" role="main" style="padding: 60px 0; background: #ffffff;">
            <div class="container">
                <div style="text-align: center; max-width: 800px; margin: 0 auto 50px;">
                    <span style="color: #F58634; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 8px;">KHO HÀNG THỰC TẾ</span>
                    <h2 style="font-size: 30px; font-weight: 800; color: #111827; margin-bottom: 15px;">Kho Vải Cây Quy Mô Tại Tân Phú, TP.HCM</h2>
                    <div style="width: 60px; height: 3px; background: #F58634; margin: 0 auto 20px;"></div>
                    <p style="font-size: 15px; color: #4b5563; line-height: 1.7;">
                        Kho hàng Tiến Phát Đạt luôn sẵn sàng hàng chục tấn vải cây thuộc nhiều phân khúc: Cotton 2C, 4C, Cá Sấu, Thun Lạnh, Mè, Bo Gân. Dưới đây là những hình ảnh thực tế từ kho và các đơn hàng xuất xưởng cho đối tác.
                    </p>
                </div>

                <!-- Gallery Grid -->
                <div class="row" style="display: flex; flex-wrap: wrap; margin: 0 -15px 50px;">
                    <div class="col medium-4 small-12 large-4" style="padding: 15px;">
                        <div style="border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); background: #fff;">
                            <img src="images/fabric/hero_warehouse.jpg" alt="Kho Vải Cây Tiến Phát Đạt" style="width: 100%; height: 260px; object-fit: cover; display: block;">
                            <div style="padding: 20px;">
                                <h4 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">Kho Vải Cây Tại 33 Lê Cảnh Tuân</h4>
                                <p style="font-size: 13.5px; color: #64748b; margin-bottom: 0;">Sẵn sàng hàng chục tấn vải các màu, phục vụ xưởng may lớn nhỏ.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col medium-4 small-12 large-4" style="padding: 15px;">
                        <div style="border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); background: #fff;">
                            <img src="images/fabric/localbrand.jpg" alt="Đơn hàng vải cho Local Brand" style="width: 100%; height: 260px; object-fit: cover; display: block;">
                            <div style="padding: 20px;">
                                <h4 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">Đơn Hàng Vải Cho Local Brand</h4>
                                <p style="font-size: 13.5px; color: #64748b; margin-bottom: 0;">Cung ứng vải Cotton 2C dày 250gsm cho các brand streetwear hàng đầu.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col medium-4 small-12 large-4" style="padding: 15px;">
                        <div style="border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); background: #fff;">
                            <img src="images/fabric/anh-01.png" alt="Áo Polo Vải Cá Sấu Xuất Xưởng" style="width: 100%; height: 260px; object-fit: cover; display: block;">
                            <div style="padding: 20px;">
                                <h4 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">Áo Thun Polo May Từ Vải Cá Sấu</h4>
                                <p style="font-size: 13.5px; color: #64748b; margin-bottom: 0;">Đơn hàng may đồng phục công ty từ vải cá sấu polo cao cấp của Tiến Phát Đạt.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col medium-4 small-12 large-4" style="padding: 15px;">
                        <div style="border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); background: #fff;">
                            <img src="images/fabric/hero_swatches.jpg" alt="Bảng Mẫu Vải Nhiều Màu" style="width: 100%; height: 260px; object-fit: cover; display: block;">
                            <div style="padding: 20px;">
                                <h4 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">Bảng Màu Vải Đa Dạng Hơn 60 Tông</h4>
                                <p style="font-size: 13.5px; color: #64748b; margin-bottom: 0;">Tập hợp đầy đủ bảng màu từ gam pastel nhẹ nhàng đến gam màu rực rỡ.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col medium-4 small-12 large-4" style="padding: 15px;">
                        <div style="border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); background: #fff;">
                            <img src="images/fabric/bảng-màu-cotton-4c.jpg" alt="Catalog Bảng Màu Cotton 4C" style="width: 100%; height: 260px; object-fit: cover; display: block;">
                            <div style="padding: 20px;">
                                <h4 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">Catalog Bảng Màu Cotton 4 Chiều</h4>
                                <p style="font-size: 13.5px; color: #64748b; margin-bottom: 0;">Bộ mẫu swatch gửi tận nơi cho khách hàng chọn màu trước khi đặt hàng.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col medium-4 small-12 large-4" style="padding: 15px;">
                        <div style="border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); background: #fff;">
                            <img src="images/fabric/bảng-màu-bo-gân-tici.jpg" alt="Bo Gân Tici Đồng Bộ" style="width: 100%; height: 260px; object-fit: cover; display: block;">
                            <div style="padding: 20px;">
                                <h4 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">Bo Gân Tici & Bo Cổ Đồng Bộ</h4>
                                <p style="font-size: 13.5px; color: #64748b; margin-bottom: 0;">Dệt bo cổ, bo tay khớp màu hoàn toàn với thân áo, tăng tính thẩm mỹ.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Call to action -->
                <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 12px; padding: 45px 30px; text-align: center; color: #fff;">
                    <h3 style="font-size: 26px; font-weight: 800; color: #fff; margin-bottom: 12px;">Bạn Cần Xem Mẫu Vải Trực Tiếp Tại Kho?</h3>
                    <p style="color: #cbd5e1; font-size: 15px; max-width: 650px; margin: 0 auto 25px;">
                        Hãy đến ngay kho hàng Tiến Phát Đạt tại <strong>33 Lê Cảnh Tuân, Phú Thọ Hòa, Tân Phú</strong> để xem và sờ chất vải thực tế, hoặc liên hệ để chúng tôi gửi mẫu tận nơi!
                    </p>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <a href="lien-he.html" class="button" style="background: #F58634; color: #fff; font-weight: 700; font-size: 14px; text-transform: uppercase; padding: 12px 28px; border-radius: 4px;">
                            Xem Địa Chỉ & Bản Đồ <i class="fa-solid fa-map-location-dot" style="margin-left: 6px;"></i>
                        </a>
                        <a href="tel:0938591207" class="button" style="background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.3); font-weight: 700; font-size: 14px; text-transform: uppercase; padding: 12px 28px; border-radius: 4px;">
                            Gọi Hotline: 0938.591.207
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>
    """
    full_html = head + header + main_content + common_footer + common_closing
    return full_html

# Generate all pages
subpages = {
    'gioi-thieu.html': generate_gioi_thieu(),
    'lien-he.html': generate_lien_he(),
    'chuyen-muc-dich-vu.html': generate_dich_vu(),
    'dich-vu.html': generate_dich_vu(),
    'du-an.html': generate_du_an(),
}

for fname, content in subpages.items():
    p1 = f'source_thangmay1/{fname}'
    with open(p1, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Wrote {p1} ({len(content)} bytes)')
    
    # Also sync to client/
    p2 = f'client/{fname}'
    # add base href for client
    client_content = content.replace('<head>', '<head>\n<base href="/">')
    with open(p2, 'w', encoding='utf-8') as f:
        f.write(client_content)
    print(f'Synced {p2} ({len(client_content)} bytes)')

print('All subpages successfully generated and synced!')
