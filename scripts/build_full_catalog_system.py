import os, json, re, shutil

# 1. Load Real Fabric Products
with open('server/data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

print(f"Loaded {len(products)} products from server/data/products.json")

# Categories definition
categories = {
    'cotton': {
        'name': 'Vải Thun Cotton & Tici',
        'desc': 'Tổng hợp các dòng vải thun Cotton 2 chiều (100% Cotton), Cotton 4 chiều co giãn mềm mại, vải Tici 65/35 dày dặn và Bo Gân Tici. Sợi dệt cao cấp, bền màu, mình vải mát mịn, không bai nhão và xù lông sau khi giặt. Thích hợp may áo thun Oversize, Local Brand, đồng phục doanh nghiệp.',
        'banner_img': 'images/fabric/hero_warehouse.jpg',
        'slug': 'cotton',
        'url': 'danh-muc-cotton.html',
        'aliases': ['danh-muc-thang-may-gia-dinh.html', 'danh-muc/vai-thun-cotton-tici.html', 'danh-muc/thang-may-gia-dinh.html']
    },
    'ca-sau': {
        'name': 'Vải Thun Cá Sấu Polo',
        'desc': 'Chuyên cung cấp vải Cá Sấu 100% Cotton, Cá Sấu Poly thể thao, Cá Sấu PE 4 chiều và Cá Sấu Cotton Lục Giác. Mắt dệt dẹt tinh tế, form đứng đắn, thấm hút mồ hôi tối ưu. Chuyên may áo thun có cổ, đồng phục văn phòng, áo Polo công sở sang trọng.',
        'banner_img': 'images/fabric/kho-vai-thun-tien-phat-dat-3.jpg',
        'slug': 'ca-sau',
        'url': 'danh-muc-ca-sau.html',
        'aliases': ['danh-muc/vai-thun-ca-sau.html']
    },
    'the-thao': {
        'name': 'Thun Lạnh & Vải Thể Thao',
        'desc': 'Dòng vải chuyên dụng may trang phục thể thao: Thun Lạnh 4 chiều, Thun Lạnh Interlock, Vải Thun Kim Cương, Poly 2 Da, Chéo Học Sinh, Thun Bột 4 chiều. Co giãn 4 chiều cực êm, thoát ẩm cực nhanh, bề mặt trơn láng, không nhăn nhàu khi giặt sấy.',
        'banner_img': 'images/fabric/kho-vai-thun-tien-phat-dat-2.jpg',
        'slug': 'the-thao',
        'url': 'danh-muc-the-thao.html',
        'aliases': ['danh-muc/thun-lanh-the-thao.html']
    },
    'me-luoi': {
        'name': 'Vải Thun Mè & Lưới Nhún',
        'desc': 'Cung cấp vải Mè Kim Cương, Mè Kiểu cao cấp, Mè Mỏng mua giá rẻ xuất xưởng, Vải Lưới Nhún X11, Lưới Xấu X5. Cấu trúc mắt hạt mè thông thoáng, kháng khuẩn, chống bám bẩn, chuyên may áo đấu thể thao, áo bóng đá, lót đầm váy dạ hội.',
        'banner_img': 'images/fabric/hero_warehouse.jpg',
        'slug': 'me-luoi',
        'url': 'danh-muc-me-luoi.html',
        'aliases': ['danh-muc/vai-thun-me-luoi.html']
    },
    'ni-da-ca': {
        'name': 'Vải Nỉ Bông & Da Cá',
        'desc': 'Vải thun Da Cá Tici, Nỉ Bông Cotton dày ấm, co giãn tốt, mặt ngoài mịn đẹp, mặt trong cào bông hoặc dệt vảy cá tinh xảo. Định lượng dày dặn 280g - 350g, giữ ấm tốt, thích hợp may Hoodie, áo khoác Sweater, quần Jogger mùa đông cho Local Brand.',
        'banner_img': 'images/fabric/kho-vai-thun-tien-phat-dat-3.jpg',
        'slug': 'ni-da-ca',
        'url': 'danh-muc-ni-da-ca.html',
        'aliases': ['danh-muc/vai-ni-da-ca.html']
    }
}

# 2. Read template shell from source_thangmay1/index.html
index_html = open('source_thangmay1/index.html', encoding='utf-8').read()

head_match = re.search(r'(<!DOCTYPE html>[\s\S]*?</head>)', index_html)
common_head = head_match.group(1) if head_match else ''

header_match = re.search(r'(<body[\s\S]*?</header>)', index_html)
common_header = header_match.group(1) if header_match else ''

footer_match = re.search(r'(<footer id="footer"[\s\S]*?</footer>)', index_html)
common_footer = footer_match.group(1) if footer_match else ''

closing_match = re.search(r'</footer>([\s\S]*?</html>)', index_html)
common_closing = closing_match.group(1) if closing_match else '</body></html>'

# Unified Subpage Dark Header & Robust Dropdown CSS
subpage_css = """
<style id="header-panel-subpage-override">
/* Persistent Header Dark Frosted Panel across all pages */
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

/* Enhanced Dropdown Menu styling & Guaranteed Hover Display */
li.has-dropdown:hover > .nav-dropdown,
li.menu-item-has-children:hover > .nav-dropdown,
li.current-dropdown > .nav-dropdown {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  left: 0 !important;
  max-height: 800px !important;
  pointer-events: auto !important;
  transform: translateY(0) !important;
}

.nav-dropdown {
  display: block !important;
  position: absolute !important;
  top: 100% !important;
  left: 0 !important;
  background: #181e26 !important;
  border-top: 3px solid #F58634 !important;
  border-radius: 0 0 8px 8px !important;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.55) !important;
  padding: 8px 0 !important;
  min-width: 270px !important;
  z-index: 99999 !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  transform: translateY(10px) !important;
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease !important;
}

.nav-dropdown > li {
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
}

.nav-dropdown > li > a {
  display: block !important;
  color: #f1f5f9 !important;
  font-family: 'Plus Jakarta Sans', Roboto, sans-serif !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  padding: 11px 22px !important;
  text-decoration: none !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07) !important;
  transition: all 0.2s ease !important;
  background: transparent !important;
  text-transform: none !important;
  letter-spacing: 0.2px !important;
}

.nav-dropdown > li > a:hover {
  background: rgba(245, 134, 52, 0.18) !important;
  color: #F58634 !important;
  padding-left: 28px !important;
}

.nav-dropdown > li:last-child > a {
  border-bottom: none !important;
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

dropdown_helper_js = """
<script id="dropdown-hover-helper">
(function() {
  function initDropdown() {
    var items = document.querySelectorAll('li.has-dropdown, li.menu-item-has-children');
    items.forEach(function(item) {
      var dropdown = item.querySelector('.nav-dropdown');
      if (!dropdown) return;
      item.addEventListener('mouseenter', function() {
        item.classList.add('current-dropdown');
        dropdown.style.opacity = '1';
        dropdown.style.visibility = 'visible';
        dropdown.style.pointerEvents = 'auto';
        dropdown.style.transform = 'translateY(0)';
      });
      item.addEventListener('mouseleave', function() {
        item.classList.remove('current-dropdown');
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.pointerEvents = 'none';
        dropdown.style.transform = 'translateY(10px)';
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdown);
  } else {
    initDropdown();
  }
})();
</script>
"""

# Replace or inject subpage_css in common_head
if '<base href="/"' not in common_head:
    common_head = common_head.replace('<head>', '<head>\n<base href="/">')

if '<style id="header-panel-subpage-override">' in common_head:
    common_head = re.sub(r'<style id="header-panel-subpage-override">[\s\S]*?</style>', subpage_css, common_head)
else:
    common_head = common_head.replace('</head>', subpage_css + '\n</head>')

# Add JS helper before </body>
if '<script id="dropdown-hover-helper">' not in common_closing:
    common_closing = common_closing.replace('</body>', dropdown_helper_js + '\n</body>')

def build_unified_header(active_nav='home', active_cat=None):
    h = common_header
    h = h.replace('current-menu-item active', '')
    
    # Standardize links
    h = re.sub(r'href="#"\s+class="nav-top-link">Trang chủ', 'href="index.html" class="nav-top-link">Trang chủ', h)
    h = re.sub(r'href="#gioi-thieu"', 'href="gioi-thieu.html"', h)
    h = re.sub(r'href="#dich-vu"', 'href="chuyen-muc-dich-vu.html"', h)
    h = re.sub(r'href="#kho-hang"', 'href="du-an.html"', h)
    h = re.sub(r'href="#lien-he"', 'href="lien-he.html"', h)
    h = re.sub(r'href="#tin-tuc"', 'href="index.html#tin-tuc"', h)
    
    # Modern dropdown for "Sản phẩm"
    products_dropdown_html = """<li id="menu-item-3149" class="menu-item menu-item-has-children menu-item-design-default has-dropdown"><a href="san-pham.html" class="nav-top-link" aria-expanded="false" aria-haspopup="menu">Sản phẩm<i class="icon-angle-down" ></i></a>
<ul class="sub-menu nav-dropdown nav-dropdown-default">
	<li id="menu-item-3150" class="menu-item"><a href="danh-muc-cotton.html">Vải Thun Cotton &amp; Tici</a></li>
	<li id="menu-item-3151" class="menu-item"><a href="danh-muc-ca-sau.html">Vải Thun Cá Sấu Polo</a></li>
	<li id="menu-item-3152" class="menu-item"><a href="danh-muc-the-thao.html">Thun Lạnh &amp; Thể Thao</a></li>
	<li id="menu-item-3153" class="menu-item"><a href="danh-muc-me-luoi.html">Vải Thun Mè &amp; Lưới Nhún</a></li>
	<li id="menu-item-3154" class="menu-item"><a href="danh-muc-ni-da-ca.html">Vải Nỉ Bông &amp; Da Cá</a></li>
	<li id="menu-item-3155" class="menu-item" style="border-top: 1px solid rgba(255,255,255,0.1);"><a href="san-pham.html" style="color: #F58634 !important; font-weight: 700;">Xem Tất Cả 26 Mẫu Vải &rarr;</a></li>
</ul>
</li>"""
    h = re.sub(r'<li id="menu-item-3149"[\s\S]*?</ul>\s*</li>', products_dropdown_html, h)
    
    # Set active nav link
    if active_nav == 'gioi-thieu':
        h = h.replace('href="gioi-thieu.html" class="nav-top-link"', 'href="gioi-thieu.html" class="nav-top-link active" style="color:#F58634 !important;"')
    elif active_nav == 'dich-vu':
        h = h.replace('href="chuyen-muc-dich-vu.html" class="nav-top-link"', 'href="chuyen-muc-dich-vu.html" class="nav-top-link active" style="color:#F58634 !important;"')
    elif active_nav == 'kho-hang':
        h = h.replace('href="du-an.html" class="nav-top-link"', 'href="du-an.html" class="nav-top-link active" style="color:#F58634 !important;"')
    elif active_nav == 'lien-he':
        h = h.replace('href="lien-he.html" class="nav-top-link"', 'href="lien-he.html" class="nav-top-link active" style="color:#F58634 !important;"')
    elif active_nav == 'san-pham':
        h = h.replace('href="san-pham.html" class="nav-top-link"', 'href="san-pham.html" class="nav-top-link active" style="color:#F58634 !important;"')
        
    return h

def norm_img(p):
    if not p:
        return 'images/fabric/hero_warehouse.jpg'
    clean = p.lstrip('/').replace('\\', '/')
    return clean

# 3. Product Card HTML Generator
def render_product_card(p):
    slug = p['slug']
    title = p['title']
    cat = p.get('category', 'Vải Thun')
    price = p.get('price', 'Liên hệ báo giá')
    img = norm_img(p.get('main_image') or (p.get('gallery') and p.get('gallery')[0]))
    
    card_html = f"""
<div class="product-small product-card col has-hover product type-product" style="padding: 10px;">
	<div class="col-inner">
		<div class="product-small box" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.04); display: flex; flex-direction: column; height: 100%;">
			<div class="box-image" style="position: relative; overflow: hidden; height: 250px; background: #f8fafc;">
				<a href="san-pham-{slug}.html" class="product-image" aria-label="{title}" style="display: block; width: 100%; height: 100%;">
					<img src="{img}" alt="{title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" loading="lazy" />
				</a>
				<div style="position: absolute; top: 10px; left: 10px; z-index: 2;">
					<span style="background: #F58634; color: #ffffff; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">{cat}</span>
				</div>
			</div>

			<div class="box-text box-text-products text-center" style="padding: 16px 14px; display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between;">
				<div>
					<h3 class="product-title" style="margin: 0 0 8px 0; font-size: 15px; font-weight: 700; line-height: 1.4;">
						<a href="san-pham-{slug}.html" style="color: #0f172a; text-decoration: none;">{title}</a>
					</h3>
					<div class="price-wrapper product-price" style="margin-bottom: 12px;">
						<span style="color: #e11d48; font-weight: 800; font-size: 13.5px;"><i class="fa-solid fa-tag" style="margin-right: 4px; font-size: 12px;"></i> {price}</span>
					</div>
				</div>
				<div style="display: flex; gap: 6px; justify-content: center;">
					<a href="san-pham-{slug}.html" class="button primary is-small" style="background: #F58634; color: #fff; border-radius: 4px; padding: 7px 12px; font-size: 11.5px; font-weight: 700; text-transform: uppercase; flex-grow: 1;">
						Chi Tiết
					</a>
					<a href="https://zalo.me/0938591207" target="_blank" class="button is-small" style="background: #0084ff; color: #fff; border-radius: 4px; padding: 7px 10px; font-size: 11.5px; font-weight: 700;">
						<i class="fa-solid fa-comment"></i> Zalo
					</a>
				</div>
			</div>
		</div>
	</div>
</div>"""
    return card_html

# 4. Generate Category Page
def generate_category_page(cat_id, cat_info):
    name = cat_info['name']
    desc = cat_info['desc']
    banner = cat_info['banner_img']
    
    # Filter products for this category
    if cat_id == 'all':
        cat_products = products
    else:
        cat_products = [p for p in products if p.get('categoryId') == cat_id]
        
    title = f"{name} - Cửa Hàng Vải Thun Tiến Phát Đạt"
    head = common_head.replace(re.search(r'<title>.*?</title>', common_head).group(0), f'<title>{title}</title>')
    header = build_unified_header('san-pham', cat_id)
    
    cards_html = "".join([render_product_card(p) for p in cat_products])
    
    # Category filter pills
    filter_tabs = """
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 35px; padding-bottom: 20px; border-bottom: 2px solid #f1f5f9; justify-content: center;">
        <a href="san-pham.html" style="padding: 8px 18px; border-radius: 30px; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.2s; background: {all_bg}; color: {all_color}; border: 1px solid #cbd5e1;">Tất Cả ({total_count})</a>
        <a href="danh-muc-cotton.html" style="padding: 8px 18px; border-radius: 30px; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.2s; background: {cotton_bg}; color: {cotton_color}; border: 1px solid #cbd5e1;">Cotton &amp; Tici</a>
        <a href="danh-muc-ca-sau.html" style="padding: 8px 18px; border-radius: 30px; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.2s; background: {ca_sau_bg}; color: {ca_sau_color}; border: 1px solid #cbd5e1;">Cá Sấu Polo</a>
        <a href="danh-muc-the-thao.html" style="padding: 8px 18px; border-radius: 30px; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.2s; background: {the_thao_bg}; color: {the_thao_color}; border: 1px solid #cbd5e1;">Thun Lạnh &amp; Poly</a>
        <a href="danh-muc-me-luoi.html" style="padding: 8px 18px; border-radius: 30px; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.2s; background: {me_luoi_bg}; color: {me_luoi_color}; border: 1px solid #cbd5e1;">Mè &amp; Lưới</a>
        <a href="danh-muc-ni-da-ca.html" style="padding: 8px 18px; border-radius: 30px; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.2s; background: {ni_bg}; color: {ni_color}; border: 1px solid #cbd5e1;">Nỉ &amp; Da Cá</a>
    </div>
    """
    
    # Fill active states
    def get_tab_style(k):
        return ("#F58634", "#ffffff") if k == cat_id else ("#ffffff", "#475569")
    
    all_bg, all_color = get_tab_style('all')
    cotton_bg, cotton_color = get_tab_style('cotton')
    ca_sau_bg, ca_sau_color = get_tab_style('ca-sau')
    the_thao_bg, the_thao_color = get_tab_style('the-thao')
    me_luoi_bg, me_luoi_color = get_tab_style('me-luoi')
    ni_bg, ni_color = get_tab_style('ni-da-ca')
    
    tabs_rendered = filter_tabs.format(
        total_count=len(products),
        all_bg=all_bg, all_color=all_color,
        cotton_bg=cotton_bg, cotton_color=cotton_color,
        ca_sau_bg=ca_sau_bg, ca_sau_color=ca_sau_color,
        the_thao_bg=the_thao_bg, the_thao_color=the_thao_color,
        me_luoi_bg=me_luoi_bg, me_luoi_color=me_luoi_color,
        ni_bg=ni_bg, ni_color=ni_color
    )
    
    main_content = f"""
    <main id="main" class="">
        <!-- Page Title Banner -->
        <div class="page-header-wrapper">
            <div class="page-title dark featured-title" style="background: linear-gradient(rgba(18, 24, 33, 0.85), rgba(18, 24, 33, 0.90)), url('{banner}') center/cover no-repeat; padding: 75px 0 55px; border-bottom: 2px solid #F58634;">
                <div class="page-title-inner container flex-row medium-flex-wrap" style="align-items: center; justify-content: space-between;">
                    <div class="flex-col">
                        <h1 class="entry-title uppercase mb-0" style="font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">{name}</h1>
                        <p style="color: #cbd5e1; margin-top: 8px; font-size: 15px; margin-bottom: 0;">Sỉ &amp; Lẻ Giá Xuất Xưởng Tận Gốc - Kho Hàng Tân Phú TP.HCM</p>
                    </div>
                    <div class="flex-col">
                        <nav class="breadcrumbs" style="color: #94a3b8; font-size: 14px;">
                            <a href="index.html" style="color: #e2e8f0; text-decoration: none;">Trang chủ</a> <span class="divider" style="margin: 0 6px;">/</span> <a href="san-pham.html" style="color: #e2e8f0; text-decoration: none;">Sản phẩm</a> <span class="divider" style="margin: 0 6px;">/</span> <span class="current" style="color: #F58634; font-weight: 600;">{name}</span>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <div id="content" class="content-area page-wrapper py-5" role="main" style="padding: 50px 0; background: #ffffff;">
            <div class="container" style="max-width: 1240px; margin: 0 auto; padding: 0 15px;">
                
                <!-- Category Description Box -->
                <div style="background: #f8fafc; border-left: 4px solid #F58634; padding: 20px 25px; border-radius: 6px; margin-bottom: 35px;">
                    <p style="font-size: 14.5px; color: #334155; line-height: 1.7; margin-bottom: 0;">
                        {desc}
                    </p>
                </div>

                <!-- Category Navigation Pills -->
                {tabs_rendered}

                <!-- Product Grid Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                    <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0;">
                        Danh Sách Mẫu Vải ({len(cat_products)} sản phẩm)
                    </h2>
                    <span style="font-size: 13px; color: #64748b;">
                        Hotline tư vấn đặt hàng: <a href="tel:0938591207" style="color: #F58634; font-weight: 700; text-decoration: none;">0938.591.207</a>
                    </span>
                </div>

                <!-- Products Grid -->
                <div class="products row row-small large-columns-4 medium-columns-3 small-columns-2" style="display: flex; flex-wrap: wrap; margin: 0 -10px 40px;">
                    {cards_html}
                </div>

                <!-- Assistance Banner -->
                <div style="background: #0f172a; border-radius: 10px; padding: 35px 30px; text-align: center; color: #fff; margin-top: 20px;">
                    <h3 style="color: #fff; font-size: 22px; font-weight: 800; margin-bottom: 8px;">Cần Tìm Mẫu Vải Không Có Trong Danh Sách?</h3>
                    <p style="color: #94a3b8; font-size: 14px; margin-bottom: 20px;">Tiến Phát Đạt nhận dệt nhuộm theo mẫu riêng và tìm nguồn vải theo yêu cầu cho các xưởng may!</p>
                    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:0938591207" class="button" style="background: #F58634; color: #fff; font-weight: 700; font-size: 13px; padding: 10px 22px; border-radius: 4px; text-transform: uppercase;">
                            <i class="fa-solid fa-phone" style="margin-right: 6px;"></i> 0938.591.207
                        </a>
                        <a href="https://zalo.me/0938591207" target="_blank" class="button" style="background: #0084ff; color: #fff; font-weight: 700; font-size: 13px; padding: 10px 22px; border-radius: 4px; text-transform: uppercase;">
                            <i class="fa-solid fa-comments" style="margin-right: 6px;"></i> Nhắn Zalo
                        </a>
                        <a href="lien-he.html" class="button" style="background: rgba(255,255,255,0.15); color: #fff; font-weight: 700; font-size: 13px; padding: 10px 22px; border-radius: 4px; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.3);">
                            Gửi Yêu Cầu Mẫu
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </main>
    """
    
    full_html = head + header + main_content + common_footer + common_closing
    return full_html

# 5. Generate Single Product Detail Page
def generate_product_detail_page(p):
    slug = p['slug']
    title = p['title']
    cat = p.get('category', 'Vải Thun')
    cat_id = p.get('categoryId', 'cotton')
    price = p.get('price', 'Liên hệ báo giá')
    desc = p.get('description', 'Vải thun chất lượng cao do Cửa Hàng Vải Thun Tiến Phát Đạt phân phối.')
    specs = p.get('specifications', {})
    
    main_img = norm_img(p.get('main_image'))
    gallery = [norm_img(x) for x in p.get('gallery', [])]
    if main_img not in gallery:
        gallery.insert(0, main_img)
        
    swatches = [norm_img(x) for x in p.get('color_swatches', [])]
    
    # Related products (other products in same category)
    rel_products = [x for x in products if x.get('categoryId') == cat_id and x['slug'] != slug][:4]
    rel_cards = "".join([render_product_card(x) for x in rel_products])
    
    page_title = f"{title} - {cat} | Vải Thun Tiến Phát Đạt"
    head = common_head.replace(re.search(r'<title>.*?</title>', common_head).group(0), f'<title>{page_title}</title>')
    header = build_unified_header('san-pham', cat_id)
    
    # Thumbnails gallery HTML
    thumbs_html = ""
    for idx, g_img in enumerate(gallery):
        border = "2px solid #F58634" if idx == 0 else "1px solid #cbd5e1"
        thumbs_html += f"""
        <div onclick="document.getElementById('main-product-img').src='{g_img}'; this.style.borderColor='#F58634';" style="width: 75px; height: 75px; border-radius: 6px; overflow: hidden; border: {border}; cursor: pointer; flex-shrink: 0;">
            <img src="{g_img}" alt="{title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>"""
        
    # Swatches HTML
    swatch_section = ""
    if swatches:
        swatch_badges = "".join([f'<span class="color-badge" style="display: inline-block; padding: 4px 10px; background: #e2e8f0; border-radius: 4px; font-size: 12px; font-weight: 600; color: #1e293b; margin-right: 6px; margin-bottom: 6px;">Mẫu màu #{idx+1}</span>' for idx, s in enumerate(swatches)])
        swatch_imgs = "".join([f'<div style="border-radius: 6px; overflow: hidden; border: 1px solid #e2e8f0; margin-bottom: 12px;"><img src="{s}" alt="Bảng màu {title}" style="width: 100%; height: auto; display: block;"></div>' for s in swatches])
        swatch_section = f"""
        <div style="margin-top: 30px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h4 style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 12px;">
                <i class="fa-solid fa-palette" style="color: #F58634; margin-right: 6px;"></i> Bảng Màu Mẫu Thực Tế Của Dòng Vải Này:
            </h4>
            <div style="margin-bottom: 12px;">{swatch_badges}</div>
            {swatch_imgs}
            <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">* Quý khách cần nhận bảng màu mẫu giấy/vải thật xin liên hệ Zalo 0938.591.207 để được gửi tận nơi miễn phí.</p>
        </div>
        """
    else:
        swatch_section = """
        <div style="margin-top: 30px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h4 style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 10px;">
                <i class="fa-solid fa-palette" style="color: #F58634; margin-right: 6px;"></i> Bảng Màu Dòng Vải:
            </h4>
            <div style="margin-bottom: 8px;">
                <span class="color-badge" style="display: inline-block; padding: 4px 10px; background: #e2e8f0; border-radius: 4px; font-size: 12px; font-weight: 600; color: #1e293b; margin-right: 6px;">Trắng Tiêu Chuẩn</span>
                <span class="color-badge" style="display: inline-block; padding: 4px 10px; background: #e2e8f0; border-radius: 4px; font-size: 12px; font-weight: 600; color: #1e293b; margin-right: 6px;">Đen Tuyển</span>
                <span class="color-badge" style="display: inline-block; padding: 4px 10px; background: #e2e8f0; border-radius: 4px; font-size: 12px; font-weight: 600; color: #1e293b; margin-right: 6px;">Xanh Đen (Navy)</span>
                <span class="color-badge" style="display: inline-block; padding: 4px 10px; background: #e2e8f0; border-radius: 4px; font-size: 12px; font-weight: 600; color: #1e293b; margin-right: 6px;">Đỏ Đô</span>
                <span class="color-badge" style="display: inline-block; padding: 4px 10px; background: #e2e8f0; border-radius: 4px; font-size: 12px; font-weight: 600; color: #1e293b; margin-right: 6px;">Xám Tiêu</span>
                <span class="color-badge" style="display: inline-block; padding: 4px 10px; background: #e2e8f0; border-radius: 4px; font-size: 12px; font-weight: 600; color: #1e293b; margin-right: 6px;">Hơn 40+ màu kho</span>
            </div>
            <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">* Sẵn hơn 40 tone màu tại kho, nhuộm màu độc quyền từ 300kg theo bảng màu Pantone.</p>
        </div>
        """
        
    main_content = f"""
    <main id="main" class="">
        <!-- Breadcrumbs -->
        <div style="background: #f1f5f9; padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
            <div class="container" style="max-width: 1240px; margin: 0 auto; padding: 0 15px;">
                <nav class="breadcrumbs" style="color: #64748b; font-size: 13px;">
                    <a href="index.html" style="color: #475569; text-decoration: none;">Trang chủ</a> <span style="margin: 0 6px;">/</span> 
                    <a href="san-pham.html" style="color: #475569; text-decoration: none;">Sản phẩm</a> <span style="margin: 0 6px;">/</span> 
                    <a href="danh-muc-{cat_id}.html" style="color: #475569; text-decoration: none;">{cat}</a> <span style="margin: 0 6px;">/</span> 
                    <span style="color: #F58634; font-weight: 700;">{title}</span>
                </nav>
            </div>
        </div>

        <div id="content" class="content-area py-5" role="main" style="padding: 45px 0; background: #ffffff;">
            <div class="container" style="max-width: 1240px; margin: 0 auto; padding: 0 15px;">
                
                <!-- Product Main Row -->
                <div class="row" style="display: flex; flex-wrap: wrap; margin: 0 -20px 50px;">
                    
                    <!-- Left: Gallery & Zoom -->
                    <div class="col medium-6 small-12 large-6" style="padding: 20px;">
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 15px; position: relative;">
                            <img id="main-product-img" src="{main_img}" alt="{title}" style="width: 100%; height: 460px; object-fit: contain; display: block; background: #ffffff;">
                            <span style="position: absolute; top: 15px; left: 15px; background: #F58634; color: #fff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase;">
                                {cat}
                            </span>
                        </div>

                        <!-- Thumbnails -->
                        <div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 10px;">
                            {thumbs_html}
                        </div>
                    </div>

                    <!-- Right: Product Information & CTAs -->
                    <div class="col medium-6 small-12 large-6 product-detail-info" style="padding: 20px;">
                        <span style="color: #F58634; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 6px;">
                            {cat}
                        </span>
                        <h1 class="product-detail-title" style="font-size: 28px; font-weight: 800; color: #0f172a; line-height: 1.3; margin-bottom: 12px;">
                            {title}
                        </h1>

                        <!-- Price & Stock Status -->
                        <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 14px 18px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
                            <div>
                                <span style="font-size: 13px; color: #881337; font-weight: 600; display: block;">Giá xuất xưởng:</span>
                                <strong class="product-detail-price" style="font-size: 22px; color: #e11d48; font-weight: 800;">{price}</strong>
                            </div>
                            <span style="background: #10b981; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 20px;">
                                <i class="fa-solid fa-circle-check" style="margin-right: 4px;"></i> Sẵn Cây Tại Kho
                            </span>
                        </div>

                        <!-- Short Description -->
                        <p style="font-size: 14.5px; color: #475569; line-height: 1.7; margin-bottom: 25px; text-align: justify;">
                            {desc}
                        </p>

                        <!-- Specifications Table -->
                        <div style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-bottom: 25px;">
                            <div style="background: #f8fafc; padding: 10px 16px; font-weight: 700; font-size: 14px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">
                                <i class="fa-solid fa-list-check" style="color: #F58634; margin-right: 6px;"></i> Thông Số Kỹ Thuật &amp; Tiêu Chuẩn:
                            </div>
                            <table class="specs-table" style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 10px 16px; color: #64748b; width: 35%;">Chủng loại:</td>
                                    <td style="padding: 10px 16px; font-weight: 600; color: #0f172a;">{specs.get('chat_lieu', cat)}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f1f5f9; background: #fafafa;">
                                    <td style="padding: 10px 16px; color: #64748b;">Xuất xứ dệt may:</td>
                                    <td style="padding: 10px 16px; font-weight: 600; color: #0f172a;">{specs.get('xuat_xu', 'Việt Nam (Tiến Phát Đạt)')}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 10px 16px; color: #64748b;">Ứng dụng phù hợp:</td>
                                    <td style="padding: 10px 16px; font-weight: 600; color: #0f172a;">{specs.get('ung_dung', 'May thời trang, áo thun, Local Brand')}</td>
                                </tr>
                                <tr style="background: #fafafa;">
                                    <td style="padding: 10px 16px; color: #64748b;">Quy cách đóng gói:</td>
                                    <td style="padding: 10px 16px; font-weight: 600; color: #0f172a;">Cây vải nguyên kiện 20kg - 25kg (có cắt lẻ mẫu)</td>
                                </tr>
                            </table>
                        </div>

                        <!-- Direct Order Buttons -->
                        <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 25px;">
                            <a href="tel:0938591207" class="btn-hotline button primary" style="background: #e11d48; color: #fff; font-weight: 700; font-size: 14px; text-transform: uppercase; padding: 12px 22px; border-radius: 6px; flex-grow: 1; text-align: center;">
                                <i class="fa-solid fa-phone" style="margin-right: 6px;"></i> Hotline: 0938.591.207
                            </a>
                            <a href="https://zalo.me/0938591207" target="_blank" class="button secondary" style="background: #0084ff; color: #fff; font-weight: 700; font-size: 14px; text-transform: uppercase; padding: 12px 22px; border-radius: 6px; flex-grow: 1; text-align: center;">
                                <i class="fa-solid fa-comments" style="margin-right: 6px;"></i> Nhắn Zalo Báo Giá
                            </a>
                        </div>

                        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 12px 16px; font-size: 13px; color: #166534;">
                            <i class="fa-solid fa-truck" style="margin-right: 6px;"></i> <strong>Hỗ trợ giao hàng:</strong> Giao nhanh trong ngày tại TP.HCM &amp; Gửi chành xe toàn quốc. Hỗ trợ đổi trả 100% nếu có lỗi dệt nhuộm!
                        </div>

                    </div>
                </div>

                <!-- Swatches Section -->
                {swatch_section}

                <!-- Related Products Section -->
                <div style="margin-top: 60px;">
                    <div style="border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0;">
                            Sản Phẩm Cùng Chủng Loại
                        </h3>
                        <a href="danh-muc-{cat_id}.html" style="color: #F58634; font-size: 13.5px; font-weight: 700; text-decoration: none;">
                            Xem thêm mẫu {cat} &rarr;
                        </a>
                    </div>
                    <div class="products row row-small large-columns-4 medium-columns-3 small-columns-2" style="display: flex; flex-wrap: wrap; margin: 0 -10px;">
                        {rel_cards}
                    </div>
                </div>

            </div>
        </div>
    </main>
    """
    
    full_html = head + header + main_content + common_footer + common_closing
    return full_html


# =========================================================================
# EXECUTE GENERATION
# =========================================================================

print("\n--- GENERATING CATALOG & PRODUCTS ---")

# A. Generate 5 Category Pages & Aliases
for cat_id, cat_info in categories.items():
    cat_html = generate_category_page(cat_id, cat_info)
    out_file = os.path.join('source_thangmay1', cat_info['url'])
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(cat_html)
    print(f"Generated {out_file} ({len(cat_html)} bytes)")
    
    # Generate aliases
    for alias in cat_info.get('aliases', []):
        alias_path = os.path.join('source_thangmay1', alias)
        os.makedirs(os.path.dirname(alias_path), exist_ok=True)
        with open(alias_path, 'w', encoding='utf-8') as f:
            f.write(cat_html)
        print(f"  -> Generated alias {alias_path}")

# B. Generate All Products Catalog Page (san-pham.html)
all_info = {
    'name': 'Tất Cả Mẫu Vải Thun May Mặc',
    'desc': 'Tổng hợp trọn bộ 26 dòng sản phẩm vải thun may mặc chất lượng cao từ Cửa Hàng Vải Thun Tiến Phát Đạt: Cotton 2 chiều, Cotton 4 chiều, Tici 65/35, Bo Gân, Cá Sấu Polo, Thun Lạnh, Mè Thể Thao, Nỉ Bông, Da Cá. Nguồn hàng tận xưởng giá sỉ cạnh tranh nhất thị trường!',
    'banner_img': 'images/fabric/hero_warehouse.jpg',
    'slug': 'all',
    'url': 'san-pham.html'
}
san_pham_html = generate_category_page('all', all_info)
with open('source_thangmay1/san-pham.html', 'w', encoding='utf-8') as f:
    f.write(san_pham_html)
print(f"Generated source_thangmay1/san-pham.html ({len(san_pham_html)} bytes)")

# C. Generate 26 Product Detail Pages
os.makedirs(os.path.join('source_thangmay1', 'san-pham'), exist_ok=True)
os.makedirs(os.path.join('source_thangmay1', 'danh-muc'), exist_ok=True)
for p in products:
    slug = p['slug']
    p_html = generate_product_detail_page(p)
    
    # 1. Flat root: san-pham-{slug}.html
    p_path_flat = os.path.join('source_thangmay1', f"san-pham-{slug}.html")
    with open(p_path_flat, 'w', encoding='utf-8') as f:
        f.write(p_html)
        
    # 2. Subfolder nested: san-pham/{slug}.html
    p_path_nested = os.path.join('source_thangmay1', 'san-pham', f"{slug}.html")
    with open(p_path_nested, 'w', encoding='utf-8') as f:
        f.write(p_html)

    # 3. Inside danh-muc/ subfolder: danh-muc/san-pham-{slug}.html
    p_path_dm = os.path.join('source_thangmay1', 'danh-muc', f"san-pham-{slug}.html")
    with open(p_path_dm, 'w', encoding='utf-8') as f:
        f.write(p_html)

print(f"Generated 26 product detail pages (flat + nested + danh-muc in source_thangmay1/)")

# D. Update Header Dropdown, CSS and Helper in all existing pages
existing_pages = ['index.html', 'gioi-thieu.html', 'chuyen-muc-dich-vu.html', 'dich-vu.html', 'du-an.html', 'lien-he.html']
for ep in existing_pages:
    ep_path = os.path.join('source_thangmay1', ep)
    if os.path.exists(ep_path):
        content = open(ep_path, encoding='utf-8').read()
        
        # 1. Replace or inject subpage_css
        if '<style id="header-panel-subpage-override">' in content:
            content = re.sub(r'<style id="header-panel-subpage-override">[\s\S]*?</style>', subpage_css, content)
        else:
            content = content.replace('</head>', subpage_css + '\n</head>')
            
        # 2. Replace or inject dropdown_helper_js
        if '<script id="dropdown-hover-helper">' in content:
            content = re.sub(r'<script id="dropdown-hover-helper">[\s\S]*?</script>', dropdown_helper_js, content)
        else:
            content = content.replace('</body>', dropdown_helper_js + '\n</body>')
            
        # 3. Replace dropdown links
        old_menu_pat = r'<li id="menu-item-3149"[\s\S]*?</ul>\s*</li>'
        new_menu = """<li id="menu-item-3149" class="menu-item menu-item-has-children menu-item-design-default has-dropdown"><a href="san-pham.html" class="nav-top-link" aria-expanded="false" aria-haspopup="menu">Sản phẩm<i class="icon-angle-down" ></i></a>
<ul class="sub-menu nav-dropdown nav-dropdown-default">
	<li id="menu-item-3150" class="menu-item"><a href="danh-muc-cotton.html">Vải Thun Cotton &amp; Tici</a></li>
	<li id="menu-item-3151" class="menu-item"><a href="danh-muc-ca-sau.html">Vải Thun Cá Sấu Polo</a></li>
	<li id="menu-item-3152" class="menu-item"><a href="danh-muc-the-thao.html">Thun Lạnh &amp; Thể Thao</a></li>
	<li id="menu-item-3153" class="menu-item"><a href="danh-muc-me-luoi.html">Vải Thun Mè &amp; Lưới Nhún</a></li>
	<li id="menu-item-3154" class="menu-item"><a href="danh-muc-ni-da-ca.html">Vải Nỉ Bông &amp; Da Cá</a></li>
	<li id="menu-item-3155" class="menu-item" style="border-top: 1px solid rgba(255,255,255,0.1);"><a href="san-pham.html" style="color: #F58634 !important; font-weight: 700;">Xem Tất Cả 26 Mẫu Vải &rarr;</a></li>
</ul>
</li>"""
        content = re.sub(old_menu_pat, new_menu, content)
        
        with open(ep_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated header dropdown in source_thangmay1/{ep}")

# E. Sync all generated HTML files to client/
print("\n--- SYNCING ALL PAGES TO CLIENT/ ---")
for root, dirs, files in os.walk('source_thangmay1'):
    for f in files:
        if f.endswith('.html'):
            rel_path = os.path.relpath(os.path.join(root, f), 'source_thangmay1')
            src_p = os.path.join('source_thangmay1', rel_path)
            dst_p = os.path.join('client', rel_path)
            os.makedirs(os.path.dirname(dst_p), exist_ok=True)
            
            c = open(src_p, encoding='utf-8').read()
            if '<base href="/"' not in c:
                c = c.replace('<head>', '<head>\n<base href="/">')
            with open(dst_p, 'w', encoding='utf-8') as df:
                df.write(c)

print("Catalog system successfully generated and synchronized to client!")
