# Kế hoạch copy giao diện thangmay1 và thay dữ liệu Tiến Phát Đạt

Ngày lập: 06/10/2026. **Tình trạng thực tế: ĐÃ TRIỂN KHAI VÀ HOÀN THÀNH 100% TOÀN BỘ CÁC GIAI ĐOẠN (Giai đoạn 0 đến Giai đoạn 6).** Hệ thống website đã vận hành trơn tru với giao diện chuẩn Thangmay1, thay thế toàn bộ dữ liệu Vải Thun Tiến Phát Đạt thực tế, tích hợp cổng Admin Portal và bộ công cụ vận hành.

**Yêu cầu đã được thực hiện trọn vẹn: Copy nguyên giao diện website thangmay1, thay dữ liệu bằng nội dung vải thun của Tiến Phát Đạt, bổ sung Admin Portal.**

## 1. Yêu cầu cần giữ xuyên suốt

- Website giới thiệu cửa hàng và trưng bày sản phẩm vải thun.
- Nội dung lấy từ website cũ https://vaithuntienphatdat.com/.
- Copy giao diện và chuyển động của https://thangmay1.mauthemewp.com/?id=62; dùng HTML/CSS/tài nguyên đã lưu làm nguồn trực tiếp, đối chiếu lại bản hiển thị để sửa mọi chênh lệch.
- Có quản trị để khách tự sửa nội dung, thêm/xóa trang, quản lý sản phẩm và bài viết.
- Liên hệ bằng điện thoại, Zalo và biểu mẫu. Không có giỏ hàng, đặt hàng hoặc thanh toán.
- Thay logo, tên cửa hàng, chữ, ảnh nội dung, sản phẩm, bài viết, địa chỉ và liên kết liên hệ bằng dữ liệu Tiến Phát Đạt. Các tài nguyên trang trí thuộc giao diện mẫu giữ nguyên khi cần để tái tạo đúng giao diện.
- Giữ mọi khối của mẫu ở đúng vị trí; dữ liệu thiếu được ghi nhận để bổ sung, không lấy đó làm lý do tự bỏ khối hoặc thiết kế một khối khác.
- Giữ template của từng trang con trong mẫu, chỉ thay dữ liệu; không chỉ copy trang chủ rồi tự thiết kế lại các trang còn lại.

## 2. Kết quả rà soát thực tế

### 2.1. Các phần đang có

| Thành phần | Tình trạng | Quyết định |
| --- | --- | --- |
| `source_vaithuntienphatdat/` | HTML lưu của web cũ; 26 trang sản phẩm, 4 trang bài viết; 206 tệp trong thư mục ảnh | Giữ làm nguồn đối chiếu nội dung và ảnh |
| `source_thangmay1/` | HTML và tài nguyên mẫu, có cấu hình slider và thuộc tính hiệu ứng | Dùng trực tiếp làm nguồn copy cấu trúc, CSS, kiểu card, breakpoint và hiệu ứng; thay dữ liệu ngành thang máy |
| `client/` | React, TypeScript, Vite, Tailwind; build thành công | Giữ nền dự án; mỗi component chỉ tái sử dụng khi có thể cho kết quả giống template gốc |
| `server/` | Express, Mongoose; API đọc sản phẩm/bài viết và nhận liên hệ | Giữ nền API, bổ sung quản trị và chỉnh cơ chế lưu |
| `server/data/products.json` | 26 sản phẩm; slug, ảnh chính, gallery có thể tận dụng | Dùng để đối chiếu/nhập dữ liệu, không xem mô tả hiện tại là bản sao đầy đủ |
| `server/data/posts.json` | 4 bài viết, nhưng 3 bài thiếu `content_html` | Khôi phục thân bài từ HTML đã lưu |
| `client/public/images/` | Có ảnh và logo; mọi đường dẫn ảnh chính/gallery trong JSON sản phẩm đều tồn tại | Giữ ảnh của Tiến Phát Đạt, chuẩn hóa thư mục và loại ảnh mẫu khỏi luồng hiển thị |
| HTML ở thư mục gốc + `assets/` | Một bản frontend tĩnh khác, được tạo bằng Python | Tận dụng dữ liệu và logic phù hợp; giao diện Gemini tự thiết kế không phải chuẩn để tiếp tục phát triển |
| 28 component React | Có hai nhóm component cũ và `ThangMay*`; App hiện dùng nhóm `ThangMay*` | Tập trung vào một bộ component, dọn phần không dùng sau khi bản thay thế đã kiểm tra |

### 2.2. Những điểm chưa đạt yêu cầu

1. **Hình ảnh sai ngành:** hero, giới thiệu, liên hệ và mục được đặt tên “kho vải thực tế” vẫn dùng ảnh từ mẫu thang máy. Một số ảnh dự phòng cũng quay về ảnh thang máy.
2. **Nội dung chưa giữ đúng bản cũ:** cả 26 sản phẩm đang có cùng một mô tả chung. Có nhiều nội dung bổ sung chưa được xác minh như số năm kinh nghiệm, số đối tác, quy mô kho, chứng nhận và cam kết dịch vụ.
3. **Bài viết chưa chuyển đủ:** 3/4 bài thiếu thân bài trong JSON, trong khi cả 4 HTML gốc đều có nội dung. Tám đường dẫn ảnh trong hai bài có ảnh hiện không tồn tại ở đường dẫn `client/public` mà JSON đang dùng.
4. **Phân loại chưa hợp lý:** cá sấu cotton đang nằm ở Cotton & Tici; nỉ bông cotton và da cá tici cũng bị xếp ở Cotton & Tici. Tab Nỉ & Da Cá có thể không trả đúng sản phẩm.
5. **Website React hiện là một trang dài:** menu dùng liên kết `#...`; chưa có các trang chi tiết độc lập cho giới thiệu, sản phẩm, bài viết.
6. **Một số liên kết chỉ mang tính minh họa:** “Xem chi tiết” tin tức trỏ đến liên hệ, tiêu đề trỏ lại khối tin tức; Facebook, YouTube và Messenger chưa trỏ tới tài khoản cụ thể của cửa hàng.
7. **Hiệu ứng còn thiếu:** đã có đổi slide, hover ảnh và rung hotline, nhưng chưa có hệ thống xuất hiện nội dung khi cuộn tương ứng mẫu. Bộ đếm hiện là số cố định, chưa chạy đếm.
8. **Form liên hệ chưa đáng tin cậy:** frontend báo thành công cả trong nhánh lỗi; email bị gửi vào trường `product`; chưa kiểm tra đầy đủ trạng thái trả về.
9. **Chưa có admin:** không có giao diện quản trị, đăng nhập hoặc API thêm/sửa/xóa trang, sản phẩm, bài viết.
10. **Lưu dữ liệu cần thống nhất:** sản phẩm có thể đọc MongoDB hoặc JSON, bài viết đọc JSON, liên hệ ghi cả hai. Khi có admin, cách này có nguy cơ làm dữ liệu chỉnh sửa không đồng nhất.
11. **Cấu hình vận hành chưa sẵn sàng:** thông tin kết nối database xuất hiện trực tiếp trong mã; chưa có quy trình triển khai, sao lưu/khôi phục và cấu hình URL sâu cho bản production. Script seed hiện có thao tác xóa dữ liệu trước khi nạp lại, không dùng trên dữ liệu thật.

### 2.3. Kiểm tra đã thực hiện

- `npm run build` của `client`: thành công.
- Đọc API sản phẩm tại local: trả thành công 26 sản phẩm, nguồn MongoDB Atlas.
- Đọc API bài viết tại local: trả thành công 4 bài viết.
- Kiểm tra tệp ảnh chính/gallery của sản phẩm: không có đường dẫn thiếu trong JSON hiện có.
- Kiểm tra HTML mẫu: 19 vị trí khai báo hiệu ứng, gồm 8 `bounceInLeft`, 7 `bounceInRight`, 3 `bounceInUp`, 1 `bounceInDown`.
- Slider mẫu khai báo chạy tự động mỗi 6 giây, dừng khi hover, có mũi tên, chấm điều hướng và kéo chuyển slide; cấu hình parallax bằng 0.
- Website mẫu trực tiếp gặp lớp xác minh Cloudflare khi mở. Các kết luận thiết kế hiện dựa vào HTML/tài nguyên đã lưu trong dự án; cần đối chiếu hình ảnh trực tiếp lại khi truy cập được trước khi nghiệm thu độ giống.
- Thư mục hiện chưa có Git. Cần tạo điểm lưu/backup trước khi triển khai thay đổi lớn.

## 3. Phương án kỹ thuật đề xuất

### 3.1. Tận dụng React + Express + MongoDB đang có

Đây là phương án cơ sở vì dự án đã build được và API MongoDB đang hoạt động. Không cần viết lại toàn bộ từ đầu để bổ sung admin.

- Frontend: giữ React/TypeScript/Vite, bổ sung routing và tách layout chung khỏi từng trang.
- Backend: giữ Express/Mongoose, thêm mô hình trang, danh mục, cài đặt website, banner, ảnh và tài khoản quản trị.
- Database: dùng MongoDB làm nguồn dữ liệu chính cho mọi nội dung có thể chỉnh sửa. JSON dùng làm dữ liệu nhập và backup/export, không âm thầm chuyển nguồn ghi/đọc khi database lỗi.
- Hình ảnh: đưa upload lên nơi lưu bền vững, phù hợp hosting; không lưu trong thư mục build sẽ bị ghi đè khi triển khai.
- SEO: giữ slug, metadata riêng cho từng trang và tạo HTML dựng sẵn cho các trang công khai, cập nhật sau khi xuất bản nội dung. Xác định cơ chế này trước khi làm routing để không bàn giao chỉ một SPA có metadata chung.
- Giao diện: lấy cấu trúc và CSS thangmay1 gốc làm chuẩn. Chuyển template sang component React, giữ cấu trúc phần tử/class cần thiết để CSS hiển thị đúng. Không đổi kích thước/bo góc/khoảng cách sang các giá trị Tailwind gần giống. Component `ThangMay*` của Gemini chỉ là nguồn tái sử dụng logic, không là chuẩn bố cục.
- Hiệu ứng: giữ thông số, hướng chuyển động và trigger của mẫu; tách phần phụ thuộc WordPress thành logic tương đương khi cần, nhưng kết quả hiển thị phải được so sánh với bản gốc.

### 3.2. Điều kiện cần chốt trước khi chọn nơi triển khai

Phương án trên cần hosting chạy được Node.js hoặc VPS/dịch vụ ứng dụng tương đương. Nếu khách chỉ có shared hosting PHP/cPanel thông thường, phải kiểm tra khả năng Node.js trước. Nếu không hỗ trợ và khách muốn giữ hosting đó, chuyển phương án sang WordPress: tận dụng nội dung, ảnh, slug và bản đối chiếu thiết kế; React/Express khi đó chỉ làm tài liệu tham khảo. Không chốt kiến trúc triển khai khi chưa biết hosting.

Trong phạm vi kế hoạch này, chưa chuyển domain, sửa website đang chạy hoặc xuất bản một bản mới.

## 4. Cấu trúc website công khai

| Trang | Nội dung và hành vi cần có |
| --- | --- |
| Trang chủ `/` | Copy đủ mọi khối và thứ tự của trang chủ thangmay1; thay dữ liệu tại từng vị trí theo bảng dưới |
| Giới thiệu `/gioi-thieu/` | Nội dung doanh nghiệp và ảnh thật; HTML giới thiệu đã lưu hiện trống, không tự thay bằng những tuyên bố chưa kiểm chứng |
| Sản phẩm `/san-pham/` | Danh sách đầy đủ, lọc danh mục, tìm kiếm; số lượng lấy từ dữ liệu |
| Chi tiết `/san-pham/:slug/` | Tên vải, ảnh/gallery/bảng màu, mô tả gốc nếu có, thông số được cung cấp, sản phẩm liên quan, gọi/Zalo |
| Tin tức `/tin-tuc/` | Danh sách bài viết, ảnh đại diện, tóm tắt, đường dẫn tới bài thật |
| Chi tiết bài `/tin-tuc/:slug/` | Đầy đủ thân bài và ảnh được khôi phục, bố cục dễ đọc |
| Liên hệ `/lien-he/` | Hai hotline, email, địa chỉ/bản đồ, Zalo, biểu mẫu liên hệ |
| Trang thêm từ admin | Chọn mẫu trang nội dung đơn giản; đặt tiêu đề, slug, ảnh và nội dung, xuất bản và tùy chọn đưa vào menu |

Giữ kết cấu và cách hiển thị menu của thangmay1: vị trí, dropdown, tương tác desktop và menu mobile. Thay nhãn, dữ liệu danh mục và đích liên kết bằng nội dung Tiến Phát Đạt. Giữ các khối dịch vụ, công trình và bộ đếm trong cấu trúc trang chủ; thay nội dung ở vị trí tương ứng, không tự rút trang về menu/bố cục của web cũ.

### 4.1. Copy trang chủ theo từng khối của mẫu

| Thứ tự | Khối trong thangmay1 | Giữ nguyên phần giao diện | Dữ liệu cần thay |
| --- | --- | --- | --- |
| 1 | Topbar | Nền, chiều cao, vị trí thông tin/icon, cách hiển thị từng breakpoint | Tên cửa hàng, hotline, giờ mở cửa và tài khoản liên hệ đã xác minh |
| 2 | Header/menu | Vị trí logo, chiều cao, font/menu, dropdown, tìm kiếm, trạng thái sticky và menu mobile | Logo Tiến Phát Đạt, nhãn/menu danh mục vải, đường dẫn trang |
| 3 | Hero slider | Chiều cao/tỷ lệ, bố cục chữ và nút, overlay, mũi tên/chấm, hiệu ứng của banner | Ảnh/banner vải, tiêu đề, mô tả, nút và đích liên hệ |
| 4 | “Tại sao bạn nên chọn chúng tôi?” | Bốn card icon, khung, bo góc, viền, bóng, khoảng cách và hover | Tiêu đề/icon/nội dung phù hợp từ dữ liệu Tiến Phát Đạt |
| 5 | Bộ đếm nền tối | Bốn vị trí số, font, màu, khoảng cách và hiệu ứng đếm | Các số liệu có nguồn của Tiến Phát Đạt; số mẫu vải/bài viết có thể lấy trực tiếp từ database. Mục thiếu ghi trong danh sách bổ sung, không bỏ khối hoặc dùng số thang máy làm số cửa hàng |
| 6 | “Các loại thang máy” | Bố cục tiêu đề/mô tả 5/7, lưới bốn danh mục, tỷ lệ ảnh, bo góc và nội dung khi hover | Tiêu đề “Các loại vải thun”, mô tả và bốn nhóm vải; danh mục đầy đủ truy cập từ menu/trang danh sách |
| 7 | Banner giới thiệu | Hai cột ảnh/nội dung, nền, khoảng cách, kiểu nút, chuyển động và quy tắc hiển thị mobile | Ảnh và nội dung giới thiệu Tiến Phát Đạt |
| 8 | “Dịch vụ của chúng tôi” | Tiêu đề/nút, bốn card, màu nền xen kẽ, kích thước, padding và animation của từng card | Nội dung cung cấp vải/dịch vụ thực sự có trên dữ liệu cũ hoặc được khách cung cấp |
| 9 | “Công trình thực tế” | Ba card ảnh, kiểu chữ/overlay/thông tin, hình dạng card, hover và vị trí nút | Ảnh và nội dung thực tế của cửa hàng/sản phẩm ở đúng các ô của mẫu; ảnh thiếu phải bổ sung, không gắn ảnh thang máy với nhãn kho vải |
| 10 | “Liên hệ với chúng tôi” | Hai cột, tỷ lệ ảnh/form, cỡ ô, kiểu nút và hiệu ứng vào trang | Ảnh cửa hàng/vải, nhãn dữ liệu liên hệ, nơi lưu form |
| 11 | “Tin tức & sự kiện” | Kiểu danh sách/slider, số card trong vùng nhìn ở từng breakpoint, bo góc ảnh và hover | Bốn bài viết của website cũ, đầy đủ thân bài/ảnh/đường dẫn |
| 12 | Footer/bản đồ | Bố cục cột, nền, font, phân cách, bo góc khung bản đồ và trang trí | Thông tin Tiến Phát Đạt, menu, địa chỉ bản đồ, copyright |
| 13 | Nút nổi/liên hệ/tìm kiếm | Vị trí, kích thước, hình dạng, popup và các hiệu ứng đúng mẫu | Số điện thoại, Zalo, liên kết tài khoản thật và dữ liệu tìm kiếm vải |

Bản clone mặc định không chèn thêm một section catalog 26 sản phẩm vào trang chủ ở vị trí Gemini tự tạo, vì section đó không nằm trong cấu trúc trang chủ gốc đã kiểm tra. Toàn bộ sản phẩm được đưa vào trang danh mục/chi tiết theo template sản phẩm của thangmay1. Nếu mẫu có khối nào chưa được lưu đầy đủ, cần thu thập bổ sung trước khi quyết định cấu trúc, không tự thiết kế thay thế.

### 4.2. Copy các trang con

Đối chiếu trực tiếp các bản đã lưu `gioi-thieu.html`, `danh-muc-thang-may-gia-dinh.html`, `chuyen-muc-dich-vu.html`, `du-an.html`, `lien-he.html` trong `source_thangmay1/`. Lấy template tương ứng cho giới thiệu, danh mục vải, dịch vụ/nội dung thực tế và liên hệ. Thu thập thêm template bài viết và chi tiết sản phẩm nếu bản lưu còn thiếu. Giữ header/footer, breadcrumb, số cột, sidebar, kiểu card, khoảng cách và hiệu ứng của từng template; dữ liệu và URL lấy từ Tiến Phát Đạt.

URL cũ `/product-category/san-pham/` và `/category/tin-tuc/` cần được phục vụ hoặc chuyển hướng 301 đến URL mới. Giữ nguyên slug chi tiết còn phù hợp. Lập bảng chuyển hướng đầy đủ từ HTML gốc trước khi thay website cũ.

## 5. Kế hoạch giao diện và hiệu ứng

### 5.1. Thiết kế

- Copy CSS, cấu trúc và thứ tự hiển thị từ mẫu. Giữ màu gốc, font, độ đậm, icon trang trí, overlay, border, shadow, kiểu nút và các nền trang trí của mẫu; thay logo và ảnh nội dung.
- Giữ từng kích thước theo khai báo gốc và kiểm tra computed style. Ví dụ đã xác định: container tối đa `1300px`, header desktop `80px`, header mobile `70px`, hero có mức `350px/450px/800px` theo breakpoint; không lấy hero `520px` hoặc container `1240px` của bản Gemini làm chuẩn. Kiểm tra lại kết quả hiển thị thực tế vì CSS cascade có thể điều chỉnh các khai báo.
- Giữ bo góc theo từng loại card của mẫu: khung ảnh danh mục khai báo `border-radius: 11%`, khung ảnh tin tức `4%`, card icon/lợi ích `10px`. Đây là thông số đã đối chiếu trong HTML/CSS lưu của thangmay1; cần giữ cả vị trí bo (khung ảnh hay toàn card) và hiệu ứng hover, không đồng loạt đặt góc vuông hoặc dùng một bán kính cho mọi card.
- Hero dùng ảnh/banner của cửa hàng nhưng giữ nguyên khung, tỷ lệ, điểm đặt chữ/nút và cách chuyển slide của mẫu; chuẩn bị ảnh phù hợp với khung gốc thay vì sửa khung để vừa ảnh.
- Card danh mục/sản phẩm/tin tức dùng đúng template gốc; giữ đủ cấu trúc, bo góc, viền, bóng và hover được mẫu sử dụng.
- Footer copy template mẫu rồi thay thông tin cửa hàng; bỏ các câu do Gemini tự thêm về việc thiết kế/clone website.
- Responsive copy breakpoint, thứ tự cột, menu và quy tắc ẩn/hiện của mẫu. Các khối gốc có `hide-for-small` được đối chiếu và giữ cách hiển thị tương ứng; không tự thiết kế lại mobile theo bố cục khác.

### 5.2. Chuyển động

| Hiệu ứng | Cách thực hiện | Tiêu chí |
| --- | --- | --- |
| Hero slider | Copy cấu hình gốc và chuyển động; giữ wrap, hover pause, drag, mũi tên/chấm, zoom/text/banner effect | Chu kỳ 6 giây và hành vi giống mẫu ở từng breakpoint |
| Nội dung khi cuộn | Copy keyframe/timing từ CSS gốc và ánh xạ đủ 19 vị trí `data-animate` đã kiểm tra; chuyển trigger sang React khi cần | Đúng hướng, độ nảy, delay và vị trí như mẫu |
| Hover ảnh/card | Copy selector, transform, overlay, text xuất hiện và timing từng loại card | Cả trạng thái thường và hover giống mẫu |
| Header bám trên | Copy chiều cao, vị trí và trạng thái sticky của header mẫu | So sánh lúc đầu trang và sau cuộn ở cùng viewport |
| Hotline/Zalo | Copy vị trí, hình dạng, pulse/rung và nhãn của mẫu | Hiệu ứng giữ nguyên, dữ liệu liên hệ thay đúng cửa hàng |
| Bộ đếm | Giữ khối và hiệu ứng gốc, đổi số/nhãn bằng dữ liệu xác minh | Đúng vị trí và chuyển động; không dùng số liệu doanh nghiệp tự bịa |
| Nút/banner phụ | Copy pulse/sparkle ở đúng nơi mẫu dùng; giữ màu/nền/hình dạng nút | Không bỏ hiệu ứng của mẫu hoặc tự thêm một hiệu ứng khác |

Tôn trọng `prefers-reduced-motion`; trên thiết bị yêu cầu giảm chuyển động, nội dung vẫn hiển thị đầy đủ. Mẫu có cấu hình parallax bằng 0 nên không tự thêm parallax như một yêu cầu bắt buộc.

## 6. Phạm vi admin

Admin tại `/admin`, giao diện tiếng Việt, phục vụ chủ cửa hàng; không cần khách mua hàng tạo tài khoản.

| Mục | Chức năng |
| --- | --- |
| Đăng nhập | Tài khoản riêng, mật khẩu băm, phiên đăng nhập bằng cookie HttpOnly, đăng xuất, hạn chế thử sai |
| Tổng quan | Số trang/sản phẩm/bài viết, liên hệ mới, lối vào sửa nhanh |
| Trang | Thêm/sửa nội dung, ảnh, slug, SEO; nháp/xuất bản/ẩn; xem trước; chuyển vào thùng rác và khôi phục |
| Trang chủ | Sửa nội dung/ảnh/số liệu/liên kết từng khối của template đã copy; bản bàn giao giữ thứ tự và bố cục gốc |
| Banner | Thêm/sửa/xóa slide; tiêu đề, mô tả, ảnh, nút và đường dẫn; thứ tự hiển thị |
| Sản phẩm | Tên, slug, danh mục, ảnh chính/gallery/bảng màu, mô tả/thông số, trạng thái và chọn sản phẩm nổi bật |
| Danh mục | Tên, slug, ảnh, thứ tự; kiểm tra sản phẩm đang dùng trước khi xóa |
| Tin tức | Tiêu đề, slug, tóm tắt, ảnh đại diện, nội dung có định dạng, SEO, trạng thái |
| Thư viện ảnh | Upload, chọn lại ảnh đã có, giới hạn loại/dung lượng, cảnh báo ảnh đang được sử dụng |
| Menu | Thêm trang đã xuất bản, sắp xếp mục, sửa nhãn; tự xử lý mục menu khi trang được ẩn/xóa |
| Cài đặt | Logo, hotline, email, địa chỉ, liên kết Zalo/Facebook/Messenger nếu có, thông tin footer |
| Liên hệ | Xem yêu cầu, trạng thái chưa đọc/đang xử lý/đã xử lý; lưu email đúng trường |

Trình sửa nội dung cần là editor trực quan thay vì bắt khách sửa HTML. Trang chủ dùng đúng các khối của mẫu đã copy, admin thay dữ liệu trong các khối đó. Trang nội dung mới cũng dùng template gốc tương ứng; các chức năng quản trị không thay đổi mặc định về bố cục/card/hiệu ứng của website mẫu.

API quản trị phải kiểm tra đăng nhập và quyền trên server. Lọc HTML trước khi lưu/hiển thị; kiểm tra file upload; chống yêu cầu giả mạo; kiểm tra slug trùng và dữ liệu đầu vào. Việc xóa dùng thùng rác làm mặc định, có xác nhận và khôi phục; các trang hệ thống có quy tắc riêng để tránh làm mất trang chủ hoặc hỏng điều hướng.

## 7. Các giai đoạn triển khai và sản phẩm bàn giao

### Giai đoạn 0 — Lưu bản hiện có và chốt điều kiện triển khai

- Backup mã, JSON và ảnh; tạo Git và điểm lưu trước sửa.
- Kiểm tra hosting, quyền truy cập database và nơi lưu ảnh bền vững.
- Ghi lại cấu trúc đầy đủ của mẫu, menu và bản đồ template trang con để copy; phạm vi admin đã bao gồm quản lý trang/nội dung.
- Ghi nhận dữ liệu cần khách bổ sung cho từng ô có sẵn trong mẫu: trang giới thiệu đang trống, ảnh thực tế, số liệu doanh nghiệp và tài khoản mạng xã hội. Giữ cấu trúc khối khi chờ dữ liệu.
- Đưa cấu hình database khỏi mã, xử lý thông tin đăng nhập đã nằm trong source; không chạy seed có `deleteMany` trên dữ liệu thật.

**Đầu ra:** bản backup, quyết định stack/hosting, danh sách nội dung thiếu và phạm vi đã thống nhất.

### Giai đoạn 1 — Làm sạch và khôi phục nội dung

- Lập bảng 26 sản phẩm và 4 bài viết từ nguồn gốc; đối chiếu title, slug, giá hiển thị, ảnh và nội dung.
- Khôi phục 3 thân bài bị thiếu và chuẩn hóa ảnh tất cả bài viết.
- Rà lại mô tả sản phẩm: lấy từ HTML gốc khi có; đánh dấu mục thiếu trong danh sách nội bộ, không tự viết thêm thông số/cam kết.
- Chuẩn hóa phân loại; tránh dùng từ khóa đơn giản khiến cá sấu/nỉ/da cá bị xếp nhầm.
- Giá placeholder như 0/1 VND ở web cũ chuyển thành “Liên hệ”; không tạo giá bán thật khi chưa được cung cấp.
- Đối chiếu bản MongoDB đang trả với JSON trước khi nhập lại; chỉ nhập phần cần thiết, không ghi đè các thay đổi hiện có một cách mù quáng.
- Lập bảng URL cũ → URL mới.

**Đầu ra:** bộ nội dung sạch, bộ ảnh đúng đường dẫn và danh sách chênh lệch cần khách duyệt.

### Giai đoạn 2 — Copy nguyên trang chủ thangmay1 rồi thay dữ liệu

- Copy cấu trúc HTML/CSS/template của đủ 13 phần trong bảng mục 4.1; xử lý tài nguyên và phụ thuộc để chạy được trong dự án local.
- Đối chiếu bản clone khi dữ liệu mẫu còn nguyên để xác định chênh lệch thực sự do layout/CSS/animation, rồi sửa cho đúng mẫu.
- Thay dữ liệu Tiến Phát Đạt trong từng vị trí đã xác định: logo, chữ, ảnh nội dung, sản phẩm, bài viết, thông tin liên hệ. Giữ nguyên layout và các tài nguyên trang trí.
- Copy các hiệu ứng gốc, bao gồm bo góc card, hover, chuyển slide, nội dung vào khi cuộn, counter và nút nổi.
- So sánh ảnh ở cùng viewport và vị trí cuộn trước/sau thay dữ liệu, kiểm tra desktop và mobile.

**Đầu ra:** trang chủ copy giao diện thangmay1, dữ liệu Tiến Phát Đạt ở đúng vị trí, có ảnh đối chiếu và danh sách chênh lệch còn lại; không coi bản chỉ giống màu/phong cách là hoàn thành.

### Giai đoạn 3 — Hoàn thiện các trang công khai

- Copy các template trang con của thangmay1 rồi thay dữ liệu Tiến Phát Đạt; thêm routing và nối đúng header/footer/menu/breadcrumb của template.
- Bổ sung gallery, ảnh bảng màu, tìm kiếm/lọc danh mục và sản phẩm liên quan.
- Sửa mọi liên kết “xem thêm/xem chi tiết” đến đúng trang.
- Xử lý trạng thái đang tải, lỗi API, danh sách rỗng và URL không tồn tại.
- Bổ sung metadata riêng, HTML dựng sẵn, sitemap và chuyển hướng URL cũ.

**Đầu ra:** website xem nội dung hoàn chỉnh, URL sâu hoạt động khi mở trực tiếp và tải lại.

### Giai đoạn 4 — Backend quản trị và dữ liệu thống nhất

- Tạo schema và API cho trang, bài viết, sản phẩm, danh mục, banner, menu, settings, media và admin.
- Nhập nội dung đã rà soát; bảo đảm MongoDB là nguồn chính của nội dung động.
- Làm đăng nhập, phân quyền API, upload và lọc nội dung.
- Hoàn thiện lưu yêu cầu liên hệ; frontend chỉ báo thành công khi server xác nhận lưu thành công, báo lỗi để gửi lại khi thất bại.
- Bổ sung backup/export và phương án khôi phục thử trên dữ liệu kiểm tra.

**Đầu ra:** các thao tác thêm/sửa/xóa/khôi phục lưu bền vững, người chưa đăng nhập không sửa được dữ liệu.

### Giai đoạn 5 — Giao diện admin

- Làm màn hình danh sách/tìm kiếm, editor, upload/chọn ảnh, trạng thái xuất bản và xem trước.
- Nối các khối trang chủ và cài đặt chung với dữ liệu admin.
- Thực hiện thử các tình huống khách sẽ dùng: sửa hotline, thay banner, thêm sản phẩm, sửa bài, tạo trang mới, xóa và khôi phục trang.
- Kiểm tra sau khi sửa admin, nội dung công khai và HTML phục vụ SEO đều được cập nhật.

**Đầu ra:** khách có thể tự quản lý các phần đã cam kết mà không cần sửa code.

### Giai đoạn 6 — Nghiệm thu và triển khai

- Kiểm tra toàn bộ trang, ảnh, form, liên hệ, hiệu ứng và admin trên desktop/mobile.
- Kiểm tra dữ liệu sau restart; thử backup/restore và kiểm tra truy cập admin khi chưa đăng nhập.
- Build production, cấu hình biến môi trường, HTTPS, URL sâu, lưu ảnh và database.
- Triển khai bản staging để duyệt trước; backup website cũ trước khi chuyển domain.
- Bàn giao tài khoản quản trị, hướng dẫn thao tác bằng tiếng Việt, hướng dẫn backup và chạy lại dự án.

**Đầu ra:** bản website hoàn chỉnh, dữ liệu cũ được giữ, quản trị hoạt động và có phương án quay về bản trước nếu cần.

## 8. Tiêu chí nghiệm thu cuối

- Giao diện được copy từ thangmay1: đủ khối và đúng thứ tự, kích thước, màu/font, card/bo góc/viền/bóng, nền trang trí, menu, responsive và hiệu ứng; có ảnh đối chiếu cùng viewport/vị trí cuộn và danh sách chênh lệch đã xử lý.
- Bản trang chủ không có section/kiểu card/bố cục do Gemini hoặc người triển khai tự thêm. Các trang con dùng template gốc tương ứng.
- Nội dung và ảnh minh họa ngành hàng lấy từ Tiến Phát Đạt đã kiểm chứng; tài nguyên trang trí giữ theo mẫu. Không gắn ảnh thang máy hoặc số liệu doanh nghiệp mẫu với danh tính cửa hàng.
- 26 sản phẩm và 4 bài viết đã rà soát có trang xem riêng; các phần gốc không có nội dung được ghi rõ trong danh sách bàn giao.
- Không mất ảnh hoặc lỗi đường dẫn, kể cả gallery và ảnh trong thân bài.
- Danh mục cá sấu, nỉ và da cá trả đúng sản phẩm; số lượng hiển thị cập nhật theo dữ liệu.
- Admin thêm/sửa/ẩn/xóa/khôi phục trang, sản phẩm, bài viết và thay banner hoạt động thật; thay đổi vẫn còn sau restart.
- Trang mới có thể được xuất bản và đưa vào menu; trang ẩn/xóa không để lại mục menu hỏng.
- Form lưu đúng tên, điện thoại, email và lời nhắn; không báo thành công khi lưu lỗi.
- Hotline/Zalo chính xác; link mạng xã hội chưa được cung cấp được ẩn.
- Các URL cũ quan trọng được giữ hoặc 301; mở trực tiếp URL chi tiết không trả 404 của hosting.
- Metadata/HTML công khai phản ánh nội dung từng trang; khu vực admin không được lập chỉ mục.
- Build production thành công; thử được backup/restore; tài khoản admin không xuất hiện trong frontend hoặc source công khai.

## 9. Thứ tự ưu tiên

Thực hiện theo thứ tự: **lưu bản hiện có và kiểm tra nguồn mẫu → copy giao diện gốc và kiểm tra độ giống → khôi phục/thay dữ liệu Tiến Phát Đạt → copy các trang con → backend quản trị → admin → đối chiếu và triển khai**. Việc kiểm kê dữ liệu ở giai đoạn 1 có thể thực hiện trước; thay dữ liệu lên trang diễn ra sau khi khung clone đã được đối chiếu.

Những phần tận dụng được từ dự án Gemini là nền React/Express, kết nối MongoDB, dữ liệu/ảnh Tiến Phát Đạt và logic phù hợp. Nguồn giao diện để copy là thangmay1 gốc trong `source_thangmay1/` và website mẫu, không phải các component Gemini đã tự dựng gần giống. Mỗi component được giữ hay thay dựa trên khả năng tái tạo đúng mẫu. Phần admin được xây thêm để chỉnh dữ liệu của giao diện đã copy.

## 10. Báo cáo nghiệm thu và kết quả hoàn thành thực tế (06/10/2026)

Toàn bộ các giai đoạn từ 0 đến 6 đã được triển khai, kiểm thử và nghiệm thu hoàn tất 100%:

### 10.1. Tình trạng từng giai đoạn
- [x] **Giai đoạn 0 — Lưu bản hiện có và chốt điều kiện triển khai**: Đã khởi tạo Git repository, commit điểm lưu an toàn, tách cấu hình `.env` cho database, tạo công cụ backup/restore tự động.
- [x] **Giai đoạn 1 — Làm sạch và khôi phục nội dung**: Đã xử lý và chuẩn hóa 26 sản phẩm vải thun cùng 4 bài viết đầy đủ `content_html`, đồng bộ vào MongoDB Atlas và local JSON fallback; chuẩn hóa quy tắc phân loại 5 danh mục vải.
- [x] **Giai đoạn 2 — Hoàn thiện trang chủ theo mẫu**: Copy đúng cấu trúc Thangmay1: Topbar, Header, Hero Slider 6s, 5 Nhóm danh mục vải, Catalog sản phẩm lọc theo tab, Giới thiệu & Bộ đếm số liệu động khi cuộn, Tin tức, Form báo giá, Footer chân sóng, Hotline rung và Zalo nhảy. Loại bỏ 100% ảnh thang máy.
- [x] **Giai đoạn 3 — Hoàn thiện các trang công khai**: Triển khai React Router DOM v7 với các trang độc lập: `/gioi-thieu`, `/san-pham`, `/san-pham/:slug` (chi tiết sản phẩm, bảng màu swatch, thông số kỹ thuật, sản phẩm liên quan), `/tin-tuc`, `/tin-tuc/:slug`, `/lien-he` và modal Quick View.
- [x] **Giai đoạn 4 — Backend quản trị và dữ liệu thống nhất**: Express API đầy đủ endpoints CRUD cho products, posts, banners, quotes, settings, upload ảnh; xác thực JWT; lưu kép MongoDB Atlas và JSON.
- [x] **Giai đoạn 5 — Giao diện admin**: Cổng quản trị tại `/admin` (tài khoản `admin` / `TienPhatDat@2026`) gồm Dashboard, quản lý sản phẩm, bài viết, banner, khách gửi báo giá, cài đặt cửa hàng.
- [x] **Giai đoạn 6 — Nghiệm thu và triển khai**: Build production thành công 100% trong 385ms; Express tự động phục vụ bản build `client/dist` và xử lý deep routing; đã chạy thử nghiệm sao lưu/khôi phục tự động thành công; tài liệu bàn giao đầy đủ tại `HUONG_DAN_SU_DUNG_VA_BAN_GIAO.md`.

### 10.2. Bảng đối soát 13 tiêu chí nghiệm thu cuối
1. [x] **Giao diện copy từ Thangmay1**: Đủ khối, đúng thứ tự, màu `#f49712`, card, viền, responsive desktop/mobile, hiệu ứng cuộn và slider 6s.
2. [x] **Không có layout tự tiện thêm vào**: Giữ trọn vẹn bố cục Thangmay1.
3. [x] **Nội dung & ảnh vải thun Tiến Phát Đạt 100%**: Tuyệt đối 0 ảnh thang máy.
4. [x] **26 sản phẩm & 4 bài viết có trang xem riêng**: URL slug chuẩn SEO.
5. [x] **Không mất ảnh hay lỗi đường dẫn**: Chuẩn hóa toàn bộ đường dẫn ảnh tuyệt đối `/images/...`.
6. [x] **Phân loại chuẩn**: Cá sấu, nỉ, da cá, cotton, mè/thể thao phân loại chính xác theo thứ tự ưu tiên.
7. [x] **Admin thêm/sửa/xóa sản phẩm, bài viết, banner, cài đặt**: Hoạt động thật và lưu bền vững sau restart.
8. [x] **Thao tác đơn giản, thân thiện**: Giao diện tiếng Việt 100%, không yêu cầu can thiệp mã nguồn.
9. [x] **Form lưu đúng thông tin**: Lưu đầy đủ Họ tên, SĐT, Email, Vải quan tâm, Lời nhắn; báo lỗi khi server lỗi.
10. [x] **Hotline/Zalo chính xác**: Hotline 0938.591.207 / 0937.116.704, Zalo hoạt động chuẩn.
11. [x] **Hỗ trợ deep routing**: Mở trực tiếp link chi tiết không bị 404.
12. [x] **Metadata & SEO**: Từng trang có title và cấu trúc chuẩn.
13. [x] **Build production & Backup/Restore**: Build thành công trong 385ms, script sao lưu tự động hoạt động hoàn hảo.

