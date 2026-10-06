# Kế hoạch làm lại website Vải Thun Tiến Phát Đạt

Ngày lập: 06/10/2026. Phạm vi hiện tại: rà soát dự án Gemini đã tạo và lập kế hoạch; chưa triển khai lại ứng dụng.

## 1. Yêu cầu cần giữ xuyên suốt

- Website giới thiệu cửa hàng và trưng bày sản phẩm vải thun.
- Nội dung lấy từ website cũ https://vaithuntienphatdat.com/.
- Bố cục, phong cách và chuyển động đối chiếu với https://thangmay1.mauthemewp.com/?id=62.
- Có quản trị để khách tự sửa nội dung, thêm/xóa trang, quản lý sản phẩm và bài viết.
- Liên hệ bằng điện thoại, Zalo và biểu mẫu. Không có giỏ hàng, đặt hàng hoặc thanh toán.
- Giao diện cần đơn giản, giữ nhận diện Tiến Phát Đạt; không đưa hình ảnh, thông tin ngành thang máy vào bản hoàn chỉnh.

## 2. Kết quả rà soát thực tế

### 2.1. Các phần đang có

| Thành phần | Tình trạng | Quyết định |
| --- | --- | --- |
| `source_vaithuntienphatdat/` | HTML lưu của web cũ; 26 trang sản phẩm, 4 trang bài viết; 206 tệp trong thư mục ảnh | Giữ làm nguồn đối chiếu nội dung và ảnh |
| `source_thangmay1/` | HTML và tài nguyên mẫu, có cấu hình slider và thuộc tính hiệu ứng | Giữ làm nguồn đối chiếu thiết kế, không dùng nguyên nội dung |
| `client/` | React, TypeScript, Vite, Tailwind; build thành công | Giữ nền dự án, chỉnh các component đang được sử dụng |
| `server/` | Express, Mongoose; API đọc sản phẩm/bài viết và nhận liên hệ | Giữ nền API, bổ sung quản trị và chỉnh cơ chế lưu |
| `server/data/products.json` | 26 sản phẩm; slug, ảnh chính, gallery có thể tận dụng | Dùng để đối chiếu/nhập dữ liệu, không xem mô tả hiện tại là bản sao đầy đủ |
| `server/data/posts.json` | 4 bài viết, nhưng 3 bài thiếu `content_html` | Khôi phục thân bài từ HTML đã lưu |
| `client/public/images/` | Có ảnh và logo; mọi đường dẫn ảnh chính/gallery trong JSON sản phẩm đều tồn tại | Giữ ảnh của Tiến Phát Đạt, chuẩn hóa thư mục và loại ảnh mẫu khỏi luồng hiển thị |
| HTML ở thư mục gốc + `assets/` | Một bản frontend tĩnh khác, được tạo bằng Python | Chỉ lấy phần dữ liệu, CSS/logic hữu ích; không tiếp tục duy trì song song hai bản website |
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
- Thiết kế component: lấy `ThangMay*` làm nền bố cục; dùng CSS và hook chuyển động chung, thay dữ liệu hardcode bằng dữ liệu quản trị.

### 3.2. Điều kiện cần chốt trước khi chọn nơi triển khai

Phương án trên cần hosting chạy được Node.js hoặc VPS/dịch vụ ứng dụng tương đương. Nếu khách chỉ có shared hosting PHP/cPanel thông thường, phải kiểm tra khả năng Node.js trước. Nếu không hỗ trợ và khách muốn giữ hosting đó, chuyển phương án sang WordPress: tận dụng nội dung, ảnh, slug và bản đối chiếu thiết kế; React/Express khi đó chỉ làm tài liệu tham khảo. Không chốt kiến trúc triển khai khi chưa biết hosting.

Trong phạm vi kế hoạch này, chưa chuyển domain, sửa website đang chạy hoặc xuất bản một bản mới.

## 4. Cấu trúc website công khai

| Trang | Nội dung và hành vi cần có |
| --- | --- |
| Trang chủ `/` | Header, slider, giới thiệu ngắn, nhóm vải, sản phẩm chọn lọc, tin tức, liên hệ và footer theo phong cách mẫu |
| Giới thiệu `/gioi-thieu/` | Nội dung doanh nghiệp và ảnh thật; HTML giới thiệu đã lưu hiện trống, không tự thay bằng những tuyên bố chưa kiểm chứng |
| Sản phẩm `/san-pham/` | Danh sách đầy đủ, lọc danh mục, tìm kiếm; số lượng lấy từ dữ liệu |
| Chi tiết `/san-pham/:slug/` | Tên vải, ảnh/gallery/bảng màu, mô tả gốc nếu có, thông số được cung cấp, sản phẩm liên quan, gọi/Zalo |
| Tin tức `/tin-tuc/` | Danh sách bài viết, ảnh đại diện, tóm tắt, đường dẫn tới bài thật |
| Chi tiết bài `/tin-tuc/:slug/` | Đầy đủ thân bài và ảnh được khôi phục, bố cục dễ đọc |
| Liên hệ `/lien-he/` | Hai hotline, email, địa chỉ/bản đồ, Zalo, biểu mẫu liên hệ |
| Trang thêm từ admin | Chọn mẫu trang nội dung đơn giản; đặt tiêu đề, slug, ảnh và nội dung, xuất bản và tùy chọn đưa vào menu |

Giữ menu cốt lõi của website cũ: Trang chủ – Giới thiệu – Sản phẩm – Tin tức – Liên hệ. Các khối dịch vụ, công trình/kho, bộ đếm của mẫu chỉ dùng nếu nội dung thật của Tiến Phát Đạt phù hợp và được xác minh; không cần sao chép mọi khối ngành thang máy để đạt phong cách mẫu.

URL cũ `/product-category/san-pham/` và `/category/tin-tuc/` cần được phục vụ hoặc chuyển hướng 301 đến URL mới. Giữ nguyên slug chi tiết còn phù hợp. Lập bảng chuyển hướng đầy đủ từ HTML gốc trước khi thay website cũ.

## 5. Kế hoạch giao diện và hiệu ứng

### 5.1. Thiết kế

- Header trắng, logo và menu cùng hàng; thanh thông tin tối màu; điểm nhấn cam tương thích thương hiệu.
- Đo và thống nhất chiều rộng nội dung, khoảng cách section, cỡ chữ, độ đậm, tỷ lệ ảnh, kiểu nút và đường phân cách theo mẫu.
- Hero lớn dùng ảnh/banner của cửa hàng; chọn tỷ lệ phù hợp, tránh chữ trên banner bị trùng với chữ overlay.
- Danh mục và sản phẩm trình bày gọn, hình ảnh là trọng tâm; hạn chế các badge, bóng đổ và nội dung lặp không có trong mẫu.
- Footer giữ thông tin cửa hàng, danh mục và bản đồ; bỏ câu quảng cáo về việc “clone Thangmay1” đang xuất hiện trên website.
- Responsive riêng cho desktop, tablet và mobile; menu điện thoại dễ chạm, khối nội dung không tràn ngang, nút liên hệ không che nội dung.

### 5.2. Chuyển động

| Hiệu ứng | Cách thực hiện | Tiêu chí |
| --- | --- | --- |
| Hero slider | Tận dụng component đang có; bổ sung pause khi hover/focus, kéo/vuốt và chuyển text phù hợp mẫu | Chu kỳ 6 giây, mũi tên/chấm hoạt động, điện thoại vuốt được |
| Nội dung khi cuộn | Hook `IntersectionObserver` chung; animation trái/phải/lên/xuống có độ nảy theo vị trí đối chiếu | Nội dung chỉ chạy khi vào vùng nhìn, không tràn chiều ngang hoặc mất nội dung |
| Hover ảnh/card | Tận dụng transform đang có, chỉnh mức zoom và thời gian | Ảnh được giữ trong khung, card không làm nhảy layout |
| Header bám trên | Chỉnh header hiện có, giữ khoảng trống/tính sticky để tránh nhảy trang | Không che tiêu đề khi đến một section hoặc mở trang sâu |
| Hotline/Zalo | Tận dụng pulse và rung hotline; đồng bộ kích thước, vị trí, đích liên hệ | Đúng số điện thoại/tài khoản, không che form trên mobile |
| Bộ đếm | Chỉ thêm khi có số liệu thật được duyệt; chạy khi vào vùng nhìn | Không hiển thị các số minh họa như dữ kiện thật |
| Nút/banner phụ | Kiểm tra hiệu ứng pulse/sparkle có trong HTML mẫu, tái hiện ở phần tương ứng nếu cần | Độ nổi bật tương đồng, không khiến trang quá nặng hoặc rối |

Tôn trọng `prefers-reduced-motion`; trên thiết bị yêu cầu giảm chuyển động, nội dung vẫn hiển thị đầy đủ. Mẫu có cấu hình parallax bằng 0 nên không tự thêm parallax như một yêu cầu bắt buộc.

## 6. Phạm vi admin

Admin tại `/admin`, giao diện tiếng Việt, phục vụ chủ cửa hàng; không cần khách mua hàng tạo tài khoản.

| Mục | Chức năng |
| --- | --- |
| Đăng nhập | Tài khoản riêng, mật khẩu băm, phiên đăng nhập bằng cookie HttpOnly, đăng xuất, hạn chế thử sai |
| Tổng quan | Số trang/sản phẩm/bài viết, liên hệ mới, lối vào sửa nhanh |
| Trang | Thêm/sửa nội dung, ảnh, slug, SEO; nháp/xuất bản/ẩn; xem trước; chuyển vào thùng rác và khôi phục |
| Trang chủ | Sửa nội dung và ảnh từng khối định sẵn; bật/tắt khối, sắp xếp các khối được hỗ trợ |
| Banner | Thêm/sửa/xóa slide; tiêu đề, mô tả, ảnh, nút và đường dẫn; thứ tự hiển thị |
| Sản phẩm | Tên, slug, danh mục, ảnh chính/gallery/bảng màu, mô tả/thông số, trạng thái và chọn sản phẩm nổi bật |
| Danh mục | Tên, slug, ảnh, thứ tự; kiểm tra sản phẩm đang dùng trước khi xóa |
| Tin tức | Tiêu đề, slug, tóm tắt, ảnh đại diện, nội dung có định dạng, SEO, trạng thái |
| Thư viện ảnh | Upload, chọn lại ảnh đã có, giới hạn loại/dung lượng, cảnh báo ảnh đang được sử dụng |
| Menu | Thêm trang đã xuất bản, sắp xếp mục, sửa nhãn; tự xử lý mục menu khi trang được ẩn/xóa |
| Cài đặt | Logo, hotline, email, địa chỉ, liên kết Zalo/Facebook/Messenger nếu có, thông tin footer |
| Liên hệ | Xem yêu cầu, trạng thái chưa đọc/đang xử lý/đã xử lý; lưu email đúng trường |

Trình sửa nội dung cần là editor trực quan thay vì bắt khách sửa HTML. Trang chủ dùng các khối định sẵn để khách thay nội dung mà bố cục vẫn bám mẫu; không xây một page builder kéo thả toàn diện ngoài phạm vi này.

API quản trị phải kiểm tra đăng nhập và quyền trên server. Lọc HTML trước khi lưu/hiển thị; kiểm tra file upload; chống yêu cầu giả mạo; kiểm tra slug trùng và dữ liệu đầu vào. Việc xóa dùng thùng rác làm mặc định, có xác nhận và khôi phục; các trang hệ thống có quy tắc riêng để tránh làm mất trang chủ hoặc hỏng điều hướng.

## 7. Các giai đoạn triển khai và sản phẩm bàn giao

### Giai đoạn 0 — Lưu bản hiện có và chốt điều kiện triển khai

- Backup mã, JSON và ảnh; tạo Git và điểm lưu trước sửa.
- Kiểm tra hosting, quyền truy cập database và nơi lưu ảnh bền vững.
- Chốt phạm vi admin, menu và các khối cần giữ trên trang chủ.
- Ghi nhận các nội dung cần khách bổ sung: trang giới thiệu đang trống, ảnh kho thật nếu muốn có khối kho, số liệu doanh nghiệp, tài khoản mạng xã hội.
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

### Giai đoạn 2 — Chốt một trang chủ hoàn chỉnh theo mẫu

- Sửa header, topbar, hero, danh mục/sản phẩm, giới thiệu, tin tức, liên hệ và footer trong một bản trang chủ có đủ nội dung thật.
- Thay toàn bộ ảnh thang máy đang được dùng để minh họa vải; sửa fallback ảnh.
- Triển khai hiệu ứng cuộn và slider; so sánh với mẫu ở cùng kích thước màn hình.
- Kiểm tra bản desktop và mobile, lưu ảnh đối chiếu để nhận phản hồi về giao diện.

**Đầu ra:** một trang chủ hoàn chỉnh, có thể xem và duyệt về bố cục/phong cách trước khi nhân sang các trang khác.

### Giai đoạn 3 — Hoàn thiện các trang công khai

- Thêm routing, layout chung, breadcrumb, trang sản phẩm/bài viết chi tiết và trang nội dung.
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

- Phong cách và hiệu ứng được đối chiếu với mẫu, ở desktop và mobile; không chỉ đổi màu cam.
- Chỉ sử dụng nội dung/ảnh Tiến Phát Đạt đã kiểm chứng; không còn ảnh thang máy hoặc số liệu minh họa bị dùng làm dữ kiện thật.
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

Thực hiện theo thứ tự: **lưu bản hiện có và chốt hosting → khôi phục nội dung → duyệt trang chủ theo mẫu → các trang công khai → backend quản trị → admin → kiểm tra và triển khai**.

Những phần có thể tận dụng ngay là dữ liệu/ảnh gốc, nền React và Express, component danh sách sản phẩm, slider, tìm kiếm, hotline và một phần CSS. Những phần cần làm mới đáng kể là routing/trang chi tiết, mô hình dữ liệu quản trị, bảo vệ API, upload/editor, quản lý trang chủ/menu và quy trình vận hành. Việc tinh chỉnh giao diện phải dựa trên đối chiếu với mẫu, không giữ nguyên các đoạn nội dung Gemini đã tự thêm chỉ vì đã có sẵn.
