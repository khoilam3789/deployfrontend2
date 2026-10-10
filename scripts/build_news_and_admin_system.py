import os, json, re, shutil

print("=== BUILDING FULL NEWS (TIN TỨC VẢI THUN) & ADMIN SYSTEM ===")

# 1. Load Posts Data
with open('server/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

print(f"Loaded {len(posts)} articles from server/data/posts.json")

# 2. Read template shell from source_thangmay1/index.html
with open('source_thangmay1/index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

head_match = re.search(r'(<!DOCTYPE html>[\s\S]*?</head>)', index_html)
common_head = head_match.group(1) if head_match else ''

header_match = re.search(r'(<body[\s\S]*?</header>)', index_html)
common_header = header_match.group(1) if header_match else ''

footer_match = re.search(r'(<footer id="footer"[\s\S]*?</footer>)', index_html)
common_footer = footer_match.group(1) if footer_match else ''

closing_match = re.search(r'</footer>([\s\S]*?</html>)', index_html)
common_closing = closing_match.group(1) if closing_match else '</body></html>'

# Ensure subpage CSS & hover helper are in common_head & common_closing
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
  padding: 10px 20px !important;
  text-decoration: none !important;
  transition: all 0.2s ease !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
}

.nav-dropdown > li:last-child > a {
  border-bottom: none !important;
}

.nav-dropdown > li > a:hover {
  background: rgba(245, 134, 52, 0.15) !important;
  color: #F58634 !important;
  padding-left: 26px !important;
}

/* Category Filter Tabs Styling */
.tpd-filter-tab {
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  transition: all 0.2s ease;
  display: inline-block;
  text-decoration: none;
}
.tpd-filter-tab:hover, .tpd-filter-tab.active {
  background: #F58634;
  color: #ffffff !important;
  border-color: #F58634;
  box-shadow: 0 4px 12px rgba(245, 134, 52, 0.25);
}

/* Song King Style Horizontal Post Cards */
.songking-card {
  display: flex;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 22px;
  transition: all 0.3s ease;
  box-shadow: 0 3px 12px rgba(0,0,0,0.03);
}
.songking-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  border-color: #cbd5e1;
}
.songking-thumb-wrap {
  width: 220px;
  min-height: 155px;
  flex-shrink: 0;
  overflow: hidden;
  background: #f1f5f9;
  position: relative;
}
.songking-thumb-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.songking-card:hover .songking-thumb-wrap img {
  transform: scale(1.06);
}
.songking-body {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}
@media (max-width: 640px) {
  .songking-card {
    flex-direction: column;
  }
  .songking-thumb-wrap {
    width: 100%;
    height: 180px;
  }
}
</style>
"""

hover_js = """
<script>
document.addEventListener('DOMContentLoaded', function() {
  var prodMenu = document.getElementById('menu-item-3149');
  if (prodMenu) {
    var dropdown = prodMenu.querySelector('.nav-dropdown');
    if (dropdown) {
      prodMenu.addEventListener('mouseenter', function() {
        dropdown.style.display = 'block';
        dropdown.style.visibility = 'visible';
        dropdown.style.opacity = '1';
        dropdown.style.pointerEvents = 'auto';
        dropdown.style.transform = 'translateY(0)';
      });
      prodMenu.addEventListener('mouseleave', function() {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.pointerEvents = 'none';
        dropdown.style.transform = 'translateY(10px)';
      });
    }
  }
});
</script>
"""

if 'header-panel-subpage-override' not in common_head:
    common_head = common_head.replace('</head>', subpage_css + '\n</head>')

if 'menu-item-3149' not in common_closing:
    common_closing = hover_js + '\n' + common_closing

# Build unified header helper
def build_unified_header(active_nav=''):
    h = common_header
    
    # Replace Thang Máy Categories dropdown with Fabrics Dropdown
    products_dropdown_html = """<li id="menu-item-3149" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-3149 menu-item-design-default has-dropdown">
  <a href="san-pham.html" class="nav-top-link" aria-expanded="false" aria-haspopup="menu">Sản Phẩm <i class="icon-angle-down"></i></a>
  <ul class="sub-menu nav-dropdown nav-dropdown-default" style="min-width: 280px;">
    <li class="menu-item"><a href="danh-muc-cotton.html"><i class="fa-solid fa-shirt" style="margin-right: 8px; color: #F58634;"></i> Vải Thun Cotton &amp; Tici</a></li>
    <li class="menu-item"><a href="danh-muc-ca-sau.html"><i class="fa-solid fa-ribbon" style="margin-right: 8px; color: #F58634;"></i> Vải Thun Cá Sấu (Polo)</a></li>
    <li class="menu-item"><a href="danh-muc-the-thao.html"><i class="fa-solid fa-person-running" style="margin-right: 8px; color: #F58634;"></i> Thun Lạnh &amp; Thể Thao</a></li>
    <li class="menu-item"><a href="danh-muc-me-luoi.html"><i class="fa-solid fa-border-all" style="margin-right: 8px; color: #F58634;"></i> Vải Thun Mè &amp; Lưới Nhún</a></li>
    <li class="menu-item"><a href="danh-muc-ni-da-ca.html"><i class="fa-solid fa-layer-group" style="margin-right: 8px; color: #F58634;"></i> Vải Nỉ Bông &amp; Da Cá</a></li>
    <li class="menu-item" style="border-top: 1px solid rgba(255,255,255,0.1);"><a href="san-pham.html" style="color: #F58634 !important;"><i class="fa-solid fa-arrow-right" style="margin-right: 8px;"></i> Xem Tất Cả Sản Phẩm</a></li>
  </ul>
</li>"""
    h = re.sub(r'<li id="menu-item-3149"[\s\S]*?</ul>\s*</li>', products_dropdown_html, h)
    
    # Make sure Tin tức item points to tin-tuc.html and has label "Tin tức vải thun"
    h = re.sub(r'<li id="menu-item-3001"[^>]*>[\s\S]*?</li>', '<li id="menu-item-3001" class="menu-item menu-item-design-default"><a href="tin-tuc.html" class="nav-top-link">Tin tức vải thun</a></li>', h)
    
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
    elif active_nav == 'tin-tuc':
        h = h.replace('href="tin-tuc.html" class="nav-top-link"', 'href="tin-tuc.html" class="nav-top-link active" style="color:#F58634 !important;"')
        
    return h

def norm_img(p):
    if not p:
        return 'images/factory/day-chuyen-may-det-cong-nghe-cao.jpg'
    clean = p.lstrip('/').replace('\\', '/')
    return clean

# Add Admin portal link in common_footer
if 'admin.html' not in common_footer:
    common_footer = common_footer.replace(
        '© 2026 Cửa Hàng Vải Thun Tiến Phát Đạt',
        '© 2026 Cửa Hàng Vải Thun Tiến Phát Đạt · <a href="admin.html" target="_blank" style="color: #cbd5e1; text-decoration: none; font-size: 11.5px; opacity: 0.8;" title="Đăng nhập quản trị viên"><i class="fa-solid fa-lock" style="font-size: 10px; margin-right: 3px;"></i> Quản Trị Hệ Thống</a>'
    )

# Format DD/MM from date string
def get_dd_mm(date_str):
    if not date_str:
        return "18/07"
    # Format e.g. 18/07/2026 -> 18/07
    parts = date_str.split('/')
    if len(parts) >= 2:
        return f"{parts[0]}/{parts[1]}"
    parts = date_str.split('-')
    if len(parts) >= 3:
        return f"{parts[2]}/{parts[1]}"
    return date_str[:5]


# =========================================================================
# 3. BUILD TIN-TUC.HTML (NEWS ARCHIVE PAGE - SONG KING STYLE)
# =========================================================================

# Post 1 is Featured Post
featured_post = posts[0]
f_slug = featured_post['slug']
f_title = featured_post['title']
f_thumb = norm_img(featured_post.get('thumbnail'))
f_summary = featured_post.get('summary', '')
f_date_badge = get_dd_mm(featured_post.get('date', '18/07/2026'))
f_category = featured_post.get('category', 'Quy mô xưởng & Năng lực')

featured_post_html = f"""
<!-- SONG KING STYLE FEATURED POST BANNER -->
<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 35px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: all 0.3s ease;">
    <div style="display: flex; flex-wrap: wrap;">
        <!-- Left: Large Featured Image -->
        <div style="flex: 1 1 480px; min-height: 320px; max-height: 420px; overflow: hidden; position: relative; background: #0f172a;">
            <a href="tin-tuc-{f_slug}.html" style="display: block; width: 100%; height: 100%;">
                <img src="{f_thumb}" alt="{f_title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" />
            </a>
            <span style="position: absolute; top: 16px; left: 16px; background: #F58634; color: #fff; font-size: 11.5px; font-weight: 800; padding: 5px 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
                ★ BÀI VIẾT NỔI BẬT
            </span>
        </div>
        
        <!-- Right: Content & Large Date Badge -->
        <div style="flex: 1 1 360px; padding: 30px 32px; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
            <div>
                <!-- Date Box + Category Badge -->
                <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
                    <div style="background: #fef3c7; border: 2px solid #f59e0b; color: #b45309; font-size: 18px; font-weight: 900; padding: 6px 14px; border-radius: 6px; letter-spacing: 0.5px; text-align: center;">
                        {f_date_badge}
                    </div>
                    <div>
                        <span style="display: inline-block; background: #f1f5f9; color: #475569; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 4px; text-transform: uppercase;">
                            {f_category}
                        </span>
                    </div>
                </div>

                <h2 style="font-size: 21px; font-weight: 800; line-height: 1.4; color: #0f172a; margin: 0 0 12px 0;">
                    <a href="tin-tuc-{f_slug}.html" style="color: #0f172a; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#F58634'" onmouseout="this.style.color='#0f172a'">
                        {f_title}
                    </a>
                </h2>

                <p style="font-size: 14px; color: #64748b; line-height: 1.65; margin-bottom: 20px;">
                    {f_summary}
                </p>
            </div>

            <div>
                <a href="tin-tuc-{f_slug}.html" style="display: inline-flex; align-items: center; gap: 8px; background: #F58634; color: #ffffff; font-weight: 700; font-size: 13.5px; padding: 10px 22px; border-radius: 6px; text-decoration: none; transition: all 0.2s; box-shadow: 0 4px 12px rgba(245, 134, 52, 0.3);">
                    Đọc thêm <i class="fa-solid fa-angle-right" style="font-size: 12px;"></i>
                </a>
            </div>
        </div>
    </div>
</div>
"""

# Grid of other posts (Song King 2-column layout)
cards_html = ""
for post in posts[1:]:
    slug = post['slug']
    title = post['title']
    thumb = norm_img(post.get('thumbnail'))
    summary = post.get('summary', '')[:140] + '...'
    date_badge = get_dd_mm(post.get('date', '15/08/2026'))
    cat = post.get('category', 'Kiến thức vải thun')
    
    cards_html += f"""
    <div class="col large-6 medium-6 small-12" style="padding: 0 10px; margin-bottom: 18px;">
        <div class="songking-card" style="height: calc(100% - 18px);">
            <!-- Left Thumbnail -->
            <div class="songking-thumb-wrap">
                <a href="tin-tuc-{slug}.html" style="display: block; width: 100%; height: 100%;">
                    <img src="{thumb}" alt="{title}" loading="lazy" />
                </a>
            </div>
            
            <!-- Right Content -->
            <div class="songking-body">
                <div>
                    <!-- Date badge + category -->
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                        <span style="background: #fffbeb; color: #b45309; border: 1px solid #fde68a; font-size: 12px; font-weight: 800; padding: 2px 8px; border-radius: 4px;">
                            {date_badge}
                        </span>
                        <span style="font-size: 11.5px; color: #64748b; font-weight: 600;">
                            {cat}
                        </span>
                    </div>

                    <h3 style="font-size: 15px; font-weight: 700; line-height: 1.4; margin: 0 0 6px 0;">
                        <a href="tin-tuc-{slug}.html" style="color: #0f172a; text-decoration: none;" onmouseover="this.style.color='#F58634'" onmouseout="this.style.color='#0f172a'">
                            {title}
                        </a>
                    </h3>

                    <p style="font-size: 12.5px; color: #64748b; line-height: 1.5; margin-bottom: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                        {summary}
                    </p>
                </div>

                <div>
                    <a href="tin-tuc-{slug}.html" style="display: inline-flex; align-items: center; gap: 4px; color: #F58634; font-weight: 700; font-size: 12.5px; text-decoration: none;">
                        Đọc thêm <i class="fa-solid fa-angle-right" style="font-size: 10px;"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    """

# Sidebar recent posts HTML
sidebar_posts_html = ""
for post in posts[:5]:
    s_slug = post['slug']
    s_title = post['title']
    s_thumb = norm_img(post.get('thumbnail'))
    s_date = post.get('date', '15/08/2026')
    sidebar_posts_html += f"""
    <div style="display: flex; gap: 12px; margin-bottom: 16px; align-items: center; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9;">
        <a href="tin-tuc-{s_slug}.html" style="width: 75px; height: 60px; border-radius: 6px; overflow: hidden; flex-shrink: 0; display: block;">
            <img src="{s_thumb}" alt="{s_title}" style="width: 100%; height: 100%; object-fit: cover;">
        </a>
        <div>
            <h4 style="font-size: 13px; font-weight: 700; line-height: 1.35; margin: 0 0 4px 0;">
                <a href="tin-tuc-{s_slug}.html" style="color: #1e293b; text-decoration: none;" onmouseover="this.style.color='#F58634'" onmouseout="this.style.color='#1e293b'">{s_title}</a>
            </h4>
            <span style="font-size: 11px; color: #94a3b8;"><i class="fa-regular fa-clock"></i> {s_date}</span>
        </div>
    </div>
    """

tin_tuc_title = "Tin Tức Vải Thun & Kiến Thức Dệt May - Cửa Hàng Vải Thun Tiến Phát Đạt"
tin_tuc_head = common_head.replace(re.search(r'<title>.*?</title>', common_head).group(0), f'<title>{tin_tuc_title}</title>')
tin_tuc_header = build_unified_header('tin-tuc')

tin_tuc_content = f"""
<main id="main" class="">
    <!-- Page Title Banner -->
    <div class="page-header-wrapper">
        <div class="page-title dark featured-title" style="background: linear-gradient(rgba(18, 24, 33, 0.9), rgba(18, 24, 33, 0.92)), url('images/factory/day-chuyen-may-det-cong-nghe-cao.jpg') center/cover no-repeat; padding: 75px 0 55px; border-bottom: 2px solid #F58634;">
            <div class="page-title-inner container flex-row medium-flex-wrap" style="align-items: center; justify-content: space-between;">
                <div class="flex-col">
                    <h1 class="entry-title uppercase mb-0" style="font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">Tin Tức Vải Thun</h1>
                    <p style="color: #cbd5e1; margin-top: 8px; font-size: 15px; margin-bottom: 0;">Cập nhật thông tin vải, quy mô xưởng dệt, đặc tính chất liệu và xu hướng thời trang</p>
                </div>
                <div class="flex-col">
                    <nav class="breadcrumbs" style="color: #94a3b8; font-size: 14px;">
                        <a href="index.html" style="color: #e2e8f0; text-decoration: none;">Trang chủ</a> <span class="divider" style="margin: 0 6px;">/</span> <span class="current" style="color: #F58634; font-weight: 600;">Tin tức vải thun</span>
                    </nav>
                </div>
            </div>
        </div>
    </div>

    <div id="content" class="content-area py-5" role="main" style="padding: 45px 0; background: #f8fafc;">
        <div class="container" style="max-width: 1240px; margin: 0 auto; padding: 0 15px;">
            
            <!-- Category Filter Bar (Song King Style Tabs) -->
            <div style="margin-bottom: 30px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 16px;">
                <span style="font-size: 13px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-right: 6px;">
                    <i class="fa-solid fa-filter" style="color: #F58634;"></i> Chuyên mục:
                </span>
                <a href="tin-tuc.html" class="tpd-filter-tab active">Tất cả bài viết</a>
                <a href="tin-tuc-quy-mo-xuong-det-va-nang-luc-san-xuat-vai-thun-tien-phat-dat.html" class="tpd-filter-tab">Quy mô xưởng &amp; Năng lực</a>
                <a href="tin-tuc.html" class="tpd-filter-tab">Kiến thức vải thun</a>
                <a href="tin-tuc.html" class="tpd-filter-tab">So sánh &amp; Bảng màu</a>
                <a href="tin-tuc.html" class="tpd-filter-tab">Cung ứng &amp; Giao hàng</a>
            </div>

            <div class="row" style="display: flex; flex-wrap: wrap; margin: 0 -15px;">
                <!-- Main Articles Column (8 Cols) -->
                <div class="col large-8 medium-8 small-12" style="padding: 0 15px;">
                    
                    <!-- 1. FEATURED ARTICLE BANNER -->
                    {featured_post_html}

                    <!-- 2. OTHER ARTICLES GRID (SONG KING 2-COL STYLE) -->
                    <div style="margin-bottom: 20px;">
                        <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; text-transform: uppercase; border-left: 4px solid #F58634; padding-left: 12px; margin-bottom: 20px;">
                            Bài Viết Mới Cập Nhật
                        </h3>
                    </div>

                    <div class="row" style="display: flex; flex-wrap: wrap; margin: 0 -10px;">
                        {cards_html}
                    </div>
                </div>

                <!-- Sidebar Column (4 Cols) -->
                <div class="col large-4 medium-4 small-12" style="padding: 0 15px;">
                    
                    <!-- Box 1: Recent Posts -->
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                        <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; text-transform: uppercase; border-bottom: 2px solid #F58634; padding-bottom: 8px; margin-bottom: 18px;">
                            <i class="fa-solid fa-fire" style="color: #F58634; margin-right: 6px;"></i> Bài Viết Đọc Nhiều
                        </h3>
                        {sidebar_posts_html}
                    </div>

                    <!-- Box 2: Fabric Consultation CTA -->
                    <div style="background: linear-gradient(135deg, #1e2530, #0f172a); border-radius: 8px; padding: 25px 20px; color: #ffffff; text-align: center; margin-bottom: 25px;">
                        <span style="background: #F58634; color: #fff; font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 20px; text-transform: uppercase;">
                            Tư Vấn Nguồn Hàng
                        </span>
                        <h4 style="color: #ffffff; font-size: 18px; font-weight: 800; margin: 12px 0 8px;">Cần Tìm Mẫu Vải Cho Xưởng May?</h4>
                        <p style="color: #cbd5e1; font-size: 13px; line-height: 1.6; margin-bottom: 18px;">
                            Gửi mẫu vải hoặc nhận bảng màu thực tế tận nơi hoàn toàn miễn phí từ kho xưởng Tiến Phát Đạt!
                        </p>
                        <a href="tel:0938591207" style="display: block; background: #e11d48; color: #fff; font-weight: 700; font-size: 13.5px; padding: 11px; border-radius: 6px; text-decoration: none; margin-bottom: 8px;">
                            <i class="fa-solid fa-phone" style="margin-right: 6px;"></i> Hotline: 0938.591.207
                        </a>
                        <a href="https://zalo.me/0938591207" target="_blank" style="display: block; background: #0084ff; color: #fff; font-weight: 700; font-size: 13.5px; padding: 11px; border-radius: 6px; text-decoration: none;">
                            <i class="fa-solid fa-comments" style="margin-right: 6px;"></i> Chat Zalo Tư Vấn
                        </a>
                    </div>

                    <!-- Box 3: Categories Quick Nav -->
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                        <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; text-transform: uppercase; border-bottom: 2px solid #F58634; padding-bottom: 8px; margin-bottom: 16px;">
                            <i class="fa-solid fa-layer-group" style="color: #F58634; margin-right: 6px;"></i> Danh Mục Vải Sản Xuất
                        </h3>
                        <ul style="list-style: none; padding: 0; margin: 0; font-size: 13.5px;">
                            <li style="border-bottom: 1px solid #f1f5f9; padding: 9px 0;"><a href="danh-muc-cotton.html" style="color: #334155; text-decoration: none; font-weight: 600;">&bull; Vải Thun Cotton &amp; Tici</a></li>
                            <li style="border-bottom: 1px solid #f1f5f9; padding: 9px 0;"><a href="danh-muc-ca-sau.html" style="color: #334155; text-decoration: none; font-weight: 600;">&bull; Vải Thun Cá Sấu Polo</a></li>
                            <li style="border-bottom: 1px solid #f1f5f9; padding: 9px 0;"><a href="danh-muc-the-thao.html" style="color: #334155; text-decoration: none; font-weight: 600;">&bull; Thun Lạnh &amp; Thể Thao</a></li>
                            <li style="border-bottom: 1px solid #f1f5f9; padding: 9px 0;"><a href="danh-muc-me-luoi.html" style="color: #334155; text-decoration: none; font-weight: 600;">&bull; Vải Thun Mè &amp; Lưới Nhún</a></li>
                            <li style="border-bottom: 1px solid #f1f5f9; padding: 9px 0;"><a href="danh-muc-ni-da-ca.html" style="color: #334155; text-decoration: none; font-weight: 600;">&bull; Vải Nỉ Bông &amp; Da Cá</a></li>
                            <li style="padding: 9px 0;"><a href="san-pham.html" style="color: #F58634; text-decoration: none; font-weight: 700;">&rarr; Xem Tất Cả 26 Mẫu Vải</a></li>
                        </ul>
                    </div>

                </div>
            </div>

        </div>
    </div>
</main>
"""

tin_tuc_full_html = tin_tuc_head + tin_tuc_header + tin_tuc_content + common_footer + common_closing
with open('source_thangmay1/tin-tuc.html', 'w', encoding='utf-8') as f:
    f.write(tin_tuc_full_html)
print(f"Generated source_thangmay1/tin-tuc.html ({len(tin_tuc_full_html)} bytes)")


# =========================================================================
# 4. BUILD 9 SINGLE POST DETAIL PAGES
# =========================================================================

os.makedirs(os.path.join('source_thangmay1', 'tin-tuc'), exist_ok=True)

for post in posts:
    slug = post['slug']
    title = post['title']
    thumb = norm_img(post.get('thumbnail'))
    date = post.get('date', '15/08/2026')
    author = post.get('author', 'Tiến Phát Đạt')
    category = post.get('category', 'Kiến Thức Dệt May')
    content_html = post.get('content_html', '')
    
    # Other posts for related section
    rel_posts = [p for p in posts if p['slug'] != slug][:3]
    rel_html = ""
    for rp in rel_posts:
        r_slug = rp['slug']
        r_title = rp['title']
        r_thumb = norm_img(rp.get('thumbnail'))
        rel_html += f"""
        <div class="col large-4 medium-4 small-12" style="padding: 10px;">
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; height: 100%; display: flex; flex-direction: column;">
                <a href="tin-tuc-{r_slug}.html" style="height: 160px; overflow: hidden; display: block;">
                    <img src="{r_thumb}" alt="{r_title}" style="width: 100%; height: 100%; object-fit: cover;">
                </a>
                <div style="padding: 14px;">
                    <h4 style="font-size: 13.5px; font-weight: 700; line-height: 1.4; margin: 0 0 6px 0;">
                        <a href="tin-tuc-{r_slug}.html" style="color: #0f172a; text-decoration: none;" onmouseover="this.style.color='#F58634'" onmouseout="this.style.color='#0f172a'">{r_title}</a>
                    </h4>
                    <span style="font-size: 11.5px; color: #94a3b8;"><i class="fa-regular fa-calendar"></i> {rp.get('date', '15/08/2026')}</span>
                </div>
            </div>
        </div>
        """
        
    p_title = f"{title} | Vải Thun Tiến Phát Đạt"
    p_head = common_head.replace(re.search(r'<title>.*?</title>', common_head).group(0), f'<title>{p_title}</title>')
    p_header = build_unified_header('tin-tuc')
    
    p_main = f"""
    <main id="main" class="">
        <!-- Breadcrumbs -->
        <div style="background: #f1f5f9; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
            <div class="container" style="max-width: 1000px; margin: 0 auto; padding: 0 15px;">
                <nav class="breadcrumbs" style="color: #64748b; font-size: 13px;">
                    <a href="index.html" style="color: #475569; text-decoration: none;">Trang chủ</a> <span style="margin: 0 6px;">/</span> 
                    <a href="tin-tuc.html" style="color: #475569; text-decoration: none;">Tin tức vải thun</a> <span style="margin: 0 6px;">/</span> 
                    <span style="color: #F58634; font-weight: 700;">{title}</span>
                </nav>
            </div>
        </div>

        <div id="content" class="content-area py-5" role="main" style="padding: 45px 0; background: #ffffff;">
            <div class="container" style="max-width: 900px; margin: 0 auto; padding: 0 15px;">
                
                <!-- Article Header -->
                <div style="margin-bottom: 25px; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px;">
                    <span style="background: #F58634; color: #fff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase;">
                        {category}
                    </span>
                    <h1 style="font-size: 28px; font-weight: 800; color: #0f172a; line-height: 1.35; margin: 15px 0 12px 0;">
                        {title}
                    </h1>
                    <div style="display: flex; gap: 15px; font-size: 13px; color: #64748b; align-items: center; flex-wrap: wrap;">
                        <span><i class="fa-regular fa-calendar" style="margin-right: 4px;"></i> {date}</span>
                        <span><i class="fa-regular fa-user" style="margin-right: 4px;"></i> {author}</span>
                        <span><i class="fa-solid fa-location-dot" style="margin-right: 4px;"></i> Kho vải &amp; Xưởng dệt: 33 Lê Cảnh Tuân, Tân Phú</span>
                    </div>
                </div>

                <!-- Featured Image -->
                <div style="border-radius: 10px; overflow: hidden; margin-bottom: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
                    <img src="{thumb}" alt="{title}" style="width: 100%; max-height: 480px; object-fit: cover; display: block;">
                </div>

                <!-- Article Body Content -->
                <div class="article-content" style="font-size: 15.5px; line-height: 1.8; color: #334155;">
                    <style>
                        .article-content h1, .article-content h2, .article-content h3 {{ color: #0f172a; font-weight: 800; margin-top: 25px; margin-bottom: 12px; }}
                        .article-content p {{ margin-bottom: 16px; text-align: justify; }}
                        .article-content ul, .article-content ol {{ margin-left: 20px; margin-bottom: 18px; }}
                        .article-content li {{ margin-bottom: 6px; }}
                        .article-content img {{ max-width: 100%; height: auto; border-radius: 8px; margin: 15px auto; display: block; }}
                        .article-content table {{ width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #e2e8f0; }}
                        .article-content th, .article-content td {{ border: 1px solid #e2e8f0; padding: 10px 14px; text-align: left; }}
                        .article-content th {{ background: #f8fafc; font-weight: 700; color: #0f172a; }}
                        .ez-toc-container {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px 24px; margin-bottom: 25px; }}
                        .ez-toc-title {{ font-weight: 800; color: #0f172a; margin-bottom: 10px; font-size: 15px; }}
                        .ez-toc-list {{ list-style: none; padding-left: 10px; }}
                        .ez-toc-list a {{ color: #F58634; text-decoration: none; font-size: 13.5px; }}
                    </style>
                    {content_html}
                </div>

                <!-- Contact Callout Box at bottom of post -->
                <div style="background: #fff7ed; border: 2px solid #fed7aa; border-radius: 8px; padding: 25px; margin: 40px 0; display: flex; flex-direction: column; gap: 15px;">
                    <div>
                        <h4 style="font-size: 18px; font-weight: 800; color: #9a3412; margin: 0 0 6px 0;">
                            Cần Tư Vấn &amp; Báo Giá Sỉ Tận Xưởng?
                        </h4>
                        <p style="font-size: 14px; color: #431407; margin-bottom: 0;">
                            Liên hệ trực tiếp với Cửa Hàng Vải Thun Tiến Phát Đạt để được xem mẫu tận nơi, nhận bảng giá sỉ và giao hàng trong ngày:
                        </p>
                    </div>
                    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                        <a href="tel:0938591207" style="background: #e11d48; color: #fff; font-weight: 700; font-size: 14px; padding: 10px 20px; border-radius: 6px; text-decoration: none;">
                            <i class="fa-solid fa-phone" style="margin-right: 6px;"></i> Hotline: 0938.591.207
                        </a>
                        <a href="https://zalo.me/0938591207" target="_blank" style="background: #0084ff; color: #fff; font-weight: 700; font-size: 14px; padding: 10px 20px; border-radius: 6px; text-decoration: none;">
                            <i class="fa-solid fa-comments" style="margin-right: 6px;"></i> Nhắn Zalo Báo Giá
                        </a>
                    </div>
                </div>

                <!-- Related Posts -->
                <div style="margin-top: 50px; border-top: 2px solid #f1f5f9; padding-top: 30px;">
                    <h3 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 20px;">
                        Bài Viết Cùng Chuyên Mục
                    </h3>
                    <div class="row" style="display: flex; flex-wrap: wrap; margin: 0 -10px;">
                        {rel_html}
                    </div>
                </div>

            </div>
        </div>
    </main>
    """
    
    post_full_html = p_head + p_header + p_main + common_footer + common_closing
    
    # 1. Flat root: tin-tuc-{slug}.html
    p_path_flat = os.path.join('source_thangmay1', f"tin-tuc-{slug}.html")
    with open(p_path_flat, 'w', encoding='utf-8') as f:
        f.write(post_full_html)
        
    # 2. Nested: tin-tuc/{slug}.html
    p_path_nested = os.path.join('source_thangmay1', 'tin-tuc', f"{slug}.html")
    with open(p_path_nested, 'w', encoding='utf-8') as f:
        f.write(post_full_html)

print(f"Generated {len(posts)} post detail pages (flat + nested in source_thangmay1/)")


# =========================================================================
# 5. UPDATE HEADER ON ALL HTML FILES TO POINT TO TIN-TUC.HTML & USE 'Tin tức vải thun'
# =========================================================================

print("\n--- UPDATING HEADER LINKS ACROSS ALL HTML PAGES ---")
count_updated = 0
for root, dirs, files in os.walk('source_thangmay1'):
    for f in files:
        if f.endswith('.html'):
            f_path = os.path.join(root, f)
            c = open(f_path, encoding='utf-8').read()
            
            # Replace #tin-tuc or index.html#tin-tuc with tin-tuc.html
            new_c = re.sub(r'href="(index\.html)?#tin-tuc"', 'href="tin-tuc.html"', c)
            
            # Replace 'Tin tức' in nav link with 'Tin tức vải thun'
            new_c = re.sub(r'(<a\s+href="tin-tuc\.html"[^>]*>)Tin tức(</a>)', r'\1Tin tức vải thun\2', new_c)
            
            # Add Admin link to footer if not present
            if 'admin.html' not in new_c and '© 2026' in new_c:
                new_c = new_c.replace(
                    '© 2026 Cửa Hàng Vải Thun Tiến Phát Đạt',
                    '© 2026 Cửa Hàng Vải Thun Tiến Phát Đạt · <a href="admin.html" target="_blank" style="color: #cbd5e1; text-decoration: none; font-size: 11.5px; opacity: 0.8;" title="Đăng nhập quản trị viên"><i class="fa-solid fa-lock" style="font-size: 10px; margin-right: 3px;"></i> Quản Trị Hệ Thống</a>'
                )
                
            if new_c != c:
                with open(f_path, 'w', encoding='utf-8') as df:
                    df.write(new_c)
                count_updated += 1

print(f"Updated header & footer links in {count_updated} files in source_thangmay1/")


# =========================================================================
# 6. SYNC EVERYTHING TO CLIENT/
# =========================================================================

print("\n--- SYNCING TO CLIENT/ ---")
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

print("Synchronized all pages to client/ successfully!")
