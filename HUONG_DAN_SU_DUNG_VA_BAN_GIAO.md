# BÁO CÁO BÀN GIAO & HƯỚNG DẪN SỬ DỤNG
## DỰ ÁN WEBSITE SHOW SẢN PHẨM CỬA HÀNG VẢI THUN TIẾN PHÁT ĐẠT

---

### 1. TỔNG QUAN DỰ ÁN

Dự án đã hoàn thành **100% tất cả các giai đoạn** theo đúng bản kế hoạch (`KE_HOACH_LAM_LAI_WEBSITE.md`):

1. **Phong cách & Giao diện**: Tái hiện chuẩn xác 1:1 phong cách, bố cục và chuyển động của mẫu tham chiếu [thangmay1.mauthemewp.com](https://thangmay1.mauthemewp.com/?id=62) với:
   - Header trắng tinh tế, logo và menu cùng hàng.
   - Topbar xám đen sang trọng hiển thị hotline, email, giờ mở cửa.
   - Tông màu nhận diện thương hiệu cam vàng rực rỡ (`#f49712`).
   - Khối thống kê đếm số động (`ThangMayCounter`) tự kích hoạt chuyển động đếm từ 0 khi cuộn tới vùng nhìn.
   - Các khối card sản phẩm, dịch vụ và tin tức có hiệu ứng lướt và hover zoom mượt mà.
   - Footer chân sóng uốn lượn đặc trưng kèm 2 nút hotline rung và Zalo nhảy cố định góc màn hình.
2. **Nội dung 100% Vải Thun Tiến Phát Đạt thực tế**:
   - Đã loại bỏ hoàn toàn 100% hình ảnh, văn bản và icon liên quan đến thang máy.
   - Toàn bộ 26 sản phẩm vải thun thực tế của Tiến Phát Đạt (Cotton 2C, 4C, Tici, Cá Sấu PE, Thun Lạnh, Mè, Nỉ Cào Lông, Da Cá...) đã được phân loại chuẩn hóa.
   - Khôi phục đầy đủ 4 bài viết tin tức kèm nội dung chi tiết và hình ảnh minh họa thật.
3. **Mục đích**: Website **Show sản phẩm & Chăm sóc khách hàng sỉ/lẻ** (không giỏ hàng, không thanh toán trực tuyến). Mọi liên kết chuyển đổi đều hướng tới:
   - Gọi trực tiếp Hotline: `0938.591.207` / `0937.116.704`
   - Nhắn tin Zalo trực tiếp
   - Bấm "Xem nhanh" (Quick View modal) kiểm tra thông số và bảng màu vải
   - Điền form "Nhận mẫu vải miễn phí & Báo giá sỉ"
4. **Hệ thống Quản trị (Admin Portal)**: Cho phép chủ cửa hàng tự thêm/sửa/xóa sản phẩm, bài viết, banner, cập nhật thông tin cửa hàng và quản lý danh sách khách hàng để lại liên hệ.

---

### 2. THÔNG TIN TRUY CẬP & TÀI KHOẢN QUẢN TRỊ

| Hạng mục | Đường dẫn truy cập | Ghi chú |
| :--- | :--- | :--- |
| **Website chính (Dev)** | `http://localhost:3000/` | Chạy qua Vite Dev Server |
| **Website chính (Production)** | `http://localhost:5000/` | Chạy trực tiếp qua Express Server |
| **Trang quản trị (Admin)** | `http://localhost:3000/admin` (hoặc `/admin`) | Cổng quản trị dành riêng cho chủ cửa hàng |
| **Tài khoản Admin** | **`admin`** | Tên đăng nhập mặc định |
| **Mật khẩu Admin** | **`TienPhatDat@2026`** | Mật khẩu bảo mật JWT |

---

### 3. CẤU TRÚC ĐIỀU HƯỚNG VÀ CÁC TRANG CÔNG KHAI

Hệ thống sử dụng **React Router DOM v7** với các trang độc lập, hỗ trợ Deep-link và URL thân thiện SEO:

1. **Trang Chủ (`/`)**:
   - **Topbar**: Hotline `0938.591.207`, Email `vaithuntienphatdat@gmail.com`, Giờ làm việc `07:30 - 18:00`.
   - **Header**: Logo Tiến Phát Đạt, Menu điều hướng, Nút mở tìm kiếm Modal nhanh.
   - **Hero Slider**: Trình chiếu banner vải thun chuyên nghiệp tự động đổi sau 6 giây, có nút chuyển slide trái/phải và dấu chấm điều hướng.
   - **5 Nhóm Danh Mục Vải**: Cotton & Tici, Vải Thun Cá Sấu, Thun Lạnh & Thể Thao, Vải Mè & Lưới Nhún, Vải Nỉ & Da Cá kèm số lượng sản phẩm thực tế theo thời gian thực.
   - **Danh Mục Nổi Bật theo Tab**: Chuyển đổi mượt mà giữa các dòng vải, có nút xem nhanh Modal và nút liên hệ tư vấn.
   - **Khối "Về Chúng Tôi" & Bộ Đếm Thống Kê**: Hiển thị năng lực cung ứng với 4 chỉ số (Hơn 1.200 Khách hàng may mặc, 50+ Dòng vải thun cao cấp, 100% Cam kết chuẩn mẫu, Hỗ trợ 24/7) tự động kích hoạt hiệu ứng đếm số khi cuộn chuột đến.
   - **Tin Tức & Kiến Thức Ngành Dệt**: 4 bài viết tuyển chọn hướng dẫn phân biệt vải, xu hướng may mặc.
   - **Biểu Mẫu Nhận Mẫu Vải Miễn Phí**: Form khách hàng nhập Tên, SĐT, Email, Lựa chọn loại vải và Ghi chú; dữ liệu lưu tức thời vào cơ sở dữ liệu.
   - **Chân Trang (Footer) & Nút Nổi**: Thiết kế lượn sóng, bản đồ chỉ dẫn đến địa chỉ số 33 Lê Cảnh Tuân, P. Phú Thọ Hòa, Q. Tân Phú, TP.HCM; nút Hotline rung lắc và nút Zalo nổi liên tục.

2. **Trang Giới Thiệu (`/gioi-thieu`)**:
   - Giới thiệu lịch sử, định hướng và cam kết chất lượng của Vải Thun Tiến Phát Đạt.

3. **Trang Sản Phẩm (`/san-pham`)**:
   - Trưng bày đầy đủ 26 sản phẩm vải thun may mặc.
   - Thanh tìm kiếm thời gian thực (Search by keyword).
   - Bộ lọc danh mục theo 5 nhóm vải chính: Cotton, Cá Sấu, Thể Thao, Mè/Lưới, Nỉ/Da Cá.

4. **Trang Chi Tiết Sản Phẩm (`/san-pham/:slug`)**:
   - Thư viện ảnh sản phẩm độ phân giải cao + Bộ màu mẫu (color swatches).
   - Bảng thông số kỹ thuật chi tiết: Khổ vải, Trọng lượng định lượng, Độ co giãn, Ứng dụng may mặc.
   - Nút gọi tư vấn ngay và nút chat Zalo.
   - Danh sách "Sản Phẩm Cùng Loại" gợi ý ở chân trang.

5. **Trang Tin Tức (`/tin-tuc`)** & **Chi Tiết Bài Viết (`/tin-tuc/:slug`)**:
   - Đọc toàn bộ nội dung bài viết với định dạng hình ảnh và chữ chuẩn SEO.

6. **Trang Liên Hệ (`/lien-he`)**:
   - Bản đồ Google Maps chỉ đường đến cửa hàng.
   - Toàn bộ thông tin liên hệ và form gửi yêu cầu báo giá.

---

### 4. HỆ THỐNG QUẢN TRỊ ADMIN PORTAL (`/admin`)

Giao diện quản trị hiện đại, trực quan, hỗ trợ tiếng Việt 100%:

1. **Dashboard (Tổng Quan)**:
   - Thống kê nhanh: Tổng số sản phẩm (26), bài viết (4), slide banner, số lượng yêu cầu báo giá mới từ khách.
   - Nút thao tác nhanh: Thêm sản phẩm mới, thêm bài viết, cài đặt thông tin cửa hàng.

2. **Quản Lý Sản Phẩm (`/admin/products`)**:
   - Xem bảng danh sách 26 sản phẩm có hình ảnh, giá hiển thị, phân loại.
   - Thêm sản phẩm mới kèm tải ảnh trực tiếp lên máy chủ.
   - Sửa thông tin sản phẩm, cập nhật bảng màu hoặc thông số kỹ thuật.
   - Xóa sản phẩm khỏi danh mục.

3. **Quản Lý Bài Viết (`/admin/posts`)**:
   - Thêm bài viết mới với ảnh đại diện, tiêu đề, tóm tắt và trình soạn thảo nội dung.
   - Sửa nội dung bài viết hiện có.
   - Xóa bài viết.

4. **Quản Lý Banner Trang Chủ (`/admin/banners`)**:
   - Thêm slide banner mới (tiêu đề lớn, mô tả phụ, ảnh nền, link nút bấm).
   - Sửa hoặc xóa banner theo các chiến dịch bán hàng.

5. **Quản Lý Yêu Cầu Báo Giá & Khách Hàng (`/admin/quotes`)**:
   - Hiển thị danh sách khách hàng gửi thông tin từ form website.
   - Xem chi tiết: Họ tên, Số điện thoại, Email, Loại vải quan tâm, Lời nhắn, Thời gian gửi.
   - Cập nhật trạng thái: **Chưa xử lý** (Màu vàng) $\rightarrow$ **Đã liên hệ tư vấn** (Màu xanh dương) $\rightarrow$ **Hoàn tất** (Màu xanh lá).
   - Xóa yêu cầu sau khi xử lý xong.

6. **Cài Đặt Cửa Hàng (`/admin/settings`)**:
   - Cập nhật Tên cửa hàng, 2 số Hotline, số Zalo, Email, Địa chỉ, Giờ làm việc, Đoạn giới thiệu ngắn ở Footer.
   - Thông tin lưu xong sẽ cập nhật ngay lập tức lên toàn bộ website công khai.

---

### 5. KIẾN TRÚC KỸ THUẬT & DỮ LIỆU

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS 4, Lucide React Icons.
- **Backend**: Node.js, Express.js, JWT, Multer (xử lý upload ảnh).
- **Cơ sở dữ liệu kép (Dual-Storage)**:
  - **MongoDB Atlas Cloud**: Kết nối trực tiếp cụm cơ sở dữ liệu đám mây `cluster0.e9xn3gz.mongodb.net/cuahangvaithun`.
  - **Local JSON Backup**: Tự động đồng bộ và đọc dự phòng từ thư mục `server/data/` nếu mất kết nối mạng, đảm bảo website hoạt động ổn định 24/7 không gián đoạn.

---

### 6. HƯỚNG DẪN KHỞI ĐỘNG, BUILD & SAO LƯU

#### 6.1. Khởi động môi trường phát triển (Development)
Chạy 2 dòng lệnh ở 2 cửa sổ terminal:
```bash
# Terminal 1: Chạy Backend API (Port 5000)
cd d:\lamho\cuahangvaithun\server
npm run dev

# Terminal 2: Chạy Frontend Vite (Port 3000)
cd d:\lamho\cuahangvaithun\client
npm run dev
```

#### 6.2. Đóng gói & Chạy môi trường xuất bản (Production)
```bash
# Đóng gói frontend sang thư mục client/dist
cd d:\lamho\cuahangvaithun\client
npm run build

# Khởi động Backend (Express sẽ tự phục vụ cả API và toàn bộ trang web client/dist trên cổng 5000)
cd d:\lamho\cuahangvaithun\server
npm start
```
Truy cập: `http://localhost:5000/`

#### 6.3. Sao lưu & Khôi phục dữ liệu (Backup & Restore)
Dự án đã tích hợp sẵn công cụ sao lưu dữ liệu tự động với 1 lệnh duy nhất:
```bash
# Thực hiện sao lưu dữ liệu (xuất ra thư mục backups/ kèm timestamp)
node scripts/backup_restore.js
```
Kết quả sao lưu sẽ lưu đầy đủ cả các file JSON và trích xuất trực tiếp từ MongoDB Atlas:
- `products.json` & `mongo-products.json`
- `posts.json` & `mongo-posts.json`
- `quotes.json` & `mongo-quotes.json`
- `settings.json`
- `banners.json`

Để khôi phục lại dữ liệu từ một bản sao lưu cụ thể:
```bash
node scripts/backup_restore.js --restore d:\lamho\cuahangvaithun\backups\<ten_thu_muc_backup>
```

---

### 7. DANH MỤC TÀI LIỆU & TỆP HÌNH ẢNH MINH CHỨNG
Tất cả ảnh chụp màn hình kiểm thử từng phân hệ được lưu trữ tại thư mục:
`d:\lamho\cuahangvaithun\docs\screenshots\`
- `screenshot_home_new.png`: Trang chủ chuẩn bố cục Thangmay1 với 100% hình ảnh vải thun.
- `screenshot_product_detail2.png`: Chi tiết sản phẩm với bảng màu swatch và sản phẩm liên quan.
- `screenshot_post_detail.png`: Chi tiết bài viết tin tức đầy đủ.
- `screenshot_admin_dashboard_logged_in.png`: Bảng điều khiển quản trị Admin.
- `screenshot_admin_products.png`: Trình quản lý 26 sản phẩm vải thun.
- `screenshot_admin_posts.png`: Trình quản lý tin tức.
- `screenshot_admin_banners.png`: Trình quản lý banner slider.
- `screenshot_admin_settings.png`: Trình quản lý thông tin cửa hàng.
- `screenshot_home_mobile.png`: Giao diện hiển thị chuẩn responsive trên thiết bị di động.
