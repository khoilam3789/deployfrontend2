# Cửa Hàng Vải Thun Tiến Phát Đạt - Website Giới Thiệu & Danh Mục Sản Phẩm

Website chính thức và hệ thống giới thiệu sản phẩm của **Cửa Hàng Vải Thun Tiến Phát Đạt** - Chuyên cung cấp sỉ & lẻ vải thun may mặc trên toàn quốc.

---

## 🌟 Tính Năng Chính

- **Giao diện hiện đại & chuẩn nhận diện thương hiệu:**
  - Tối ưu trải nghiệm người dùng, tốc độ tải trang nhanh, tương thích 100% trên thiết bị di động (Mobile Responsive).
  - Tích hợp hiệu ứng chuyển động mượt mà, banner trượt tự động (Flickity slider), thanh điều hướng tiện lợi.
- **Danh mục & Chi tiết sản phẩm:**
  - Phân loại rõ ràng: Vải thun Cotton, Tici 65/35, Cá sấu, Nỉ bông & Da cá, Vải thể thao,...
  - Bộ sưu tập hình ảnh chất lượng cao, thông số kỹ thuật (định lượng, khổ vải, độ co giãn, màu sắc).
- **Hệ thống liên hệ & Báo giá nhanh:**
  - Nút gọi hotline, kết nối Zalo, Messenger nổi trên màn hình.
  - Biểu mẫu nhận báo giá và tư vấn trực tiếp từ khách hàng.
- **Tin tức & Kiến thức dệt may:**
  - Chuyên mục bài viết tư vấn chọn vải, mẹo bảo quản và tin tức thị trường.
- **Cổng Quản Trị Admin Portal:**
  - Quản lý danh sách sản phẩm (Thêm, sửa, xóa, tìm kiếm, lọc).
  - Quản lý bài viết & tin tức.
  - Quản trị banner quảng cáo & slide trang chủ.
  - Quản lý yêu cầu báo giá & liên hệ khách hàng.
  - Cấu hình thông tin liên hệ, hotline, địa chỉ, mạng xã hội.
- **Vận hành & Sao lưu an toàn:**
  - Công cụ tự động Backup & Restore dữ liệu JSON / MongoDB.

---

## 🛠 Công Nghệ Sử Dụng (Tech Stack)

- **Frontend:**
  - React 18 + TypeScript + Vite
  - Tailwind CSS + Lucide Icons + Font Awesome
  - Flickity Slider + Animate.css
- **Backend:**
  - Node.js + Express
  - MongoDB Atlas (Mongoose) kết hợp cơ chế Local JSON Data fallback
  - CORS, Helmet, dotenv
- **DevOps & Tooling:**
  - Node & Python scripts phục vụ chuẩn hóa dữ liệu và sao lưu định kỳ.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Yêu cầu môi trường
- **Node.js** >= 18.x
- **npm** >= 9.x

### 2. Cài đặt dependencies
Cài đặt thư viện cho cả server và client:
```bash
# Cài đặt server dependencies
cd server
npm install

# Cài đặt client dependencies
cd ../client
npm install
```

### 3. Cấu hình biến môi trường
Tạo file `.env` trong thư mục `server/` (nếu cần tuỳ chỉnh):
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
*(Nếu không có MongoDB, hệ thống sẽ tự động dùng dữ liệu từ `server/data/*.json`)*

### 4. Khởi chạy ở môi trường phát triển (Development)
Chạy đồng thời hoặc chạy từng phần:
```bash
# Terminal 1: Chạy Server Backend (Port 5000)
npm run dev:server

# Terminal 2: Chạy Client Frontend (Port 3000 / 5173)
npm run dev:client
```

### 5. Build và chạy Production
```bash
# Build mã nguồn client
npm run build

# Khởi chạy server production (tự động serve file tĩnh client/dist)
npm start
```

---

## 📁 Cấu Trúc Thư Mục

```text
cuahangvaithun/
├── client/                     # Mã nguồn Frontend (React + Vite)
│   ├── public/                 # Tài nguyên tĩnh (ảnh sản phẩm, fonts, css)
│   └── src/
│       ├── components/         # Các component giao diện
│       ├── layouts/            # Layout chính và layout Admin
│       ├── pages/              # Trang chủ, sản phẩm, tin tức, admin
│       └── types/              # TypeScript type definitions
├── server/                     # Mã nguồn Backend (Express API)
│   ├── data/                   # Dữ liệu tĩnh JSON (products, posts, banners)
│   └── server.js               # API Server chính
├── docs/                       # Tài liệu dự án
├── scripts/                    # Scripts sao lưu, chuẩn hóa dữ liệu
├── HUONG_DAN_SU_DUNG_VA_BAN_GIAO.md # Hướng dẫn bàn giao & vận hành chi tiết
└── KE_HOACH_LAM_LAI_WEBSITE.md      # Tài liệu kế hoạch & kiến trúc
```

---

## 📞 Thông Tin Liên Hệ Cửa Hàng

- **Tên cửa hàng:** Cửa Hàng Vải Thun Tiến Phát Đạt
- **Địa chỉ:** TP. Hồ Chí Minh, Việt Nam
- **Hotline / Zalo:** 0938 099 070 - 0988 567 889
- **Email:** vaithuntienphatdat@gmail.com
- **Website:** [vaithuntienphatdat.com](https://vaithuntienphatdat.com/)
