import json

posts = [
    {
        "id": 1,
        "slug": "quy-mo-xuong-det-va-nang-luc-san-xuat-vai-thun-tien-phat-dat",
        "title": "Quy Mô Xưởng Dệt & Năng Lực Sản Xuất Vải Thun Tiến Phát Đạt: Dây Chuyền Hiện Đại, Nguồn Cung Vải Mộc Dồi Dào",
        "category": "Quy mô xưởng & Năng lực",
        "thumbnail": "images/factory/day-chuyen-may-det-cong-nghe-cao.jpg",
        "summary": "Khám phá quy mô xưởng dệt vải thun Tiến Phát Đạt với hệ thống máy dệt kim hiện đại, tổ mắc sợi công nghiệp và kho dự trữ hàng nghìn cây vải mộc trắng sẵn sàng đáp ứng mọi đơn hàng lớn nhỏ cho xưởng may và Local Brand.",
        "content_html": """<div class="entry-content quy-mo-xuong-det-article">
  <div class="article-lead" style="background: #f8fafc; border-left: 4px solid #F58634; padding: 18px 24px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
    <p style="font-size: 15.5px; line-height: 1.7; color: #334155; margin: 0; font-weight: 500;">
      <strong>Cửa Hàng Vải Thun Tiến Phát Đạt</strong> tự hào là một trong những đơn vị dệt may uy tín hàng đầu tại TP.HCM, chuyên sản xuất và cung ứng các dòng vải thun chất lượng cao. Với hệ thống xưởng dệt quy mô lớn, máy móc dệt kim hiện đại, công nghệ mắc sợi tiên tiến và kho trữ hàng trăm tấn <strong>vải mộc</strong> sẵn sàng, chúng tôi cam kết đáp ứng nhanh nhất mọi đơn hàng của xưởng may, xí nghiệp và các thương hiệu Local Brand trên toàn quốc.
    </p>
  </div>

  <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 30px; margin-bottom: 15px;">1. Tổng Quan Quy Mô Xưởng Dệt & Năng Lực Cung Ứng</h2>
  <p style="font-size: 15px; line-height: 1.8; color: #334155;">Nhằm đáp ứng nhu cầu may mặc ngày càng khắt khe về độ co giãn, độ bền màu và độ đều của sợi vải, xưởng dệt Tiến Phát Đạt được đầu tư quy mô bài bản với phân khu chức năng riêng biệt: phân xưởng mắc sợi, phân xưởng dệt kim tròn, phân xưởng dệt kim công nghệ cao và kho bảo quản vải mộc.</p>
  <ul style="font-size: 15px; line-height: 1.8; color: #334155; padding-left: 20px;">
    <li><strong>Diện tích xưởng sản xuất:</strong> Hơn 3.000m² đạt chuẩn thông gió và kiểm soát nhiệt ẩm công nghiệp dệt kim.</li>
    <li><strong>Năng lực sản xuất:</strong> Hơn 250 - 300 tấn vải mộc và thành phẩm mỗi tháng.</li>
    <li><strong>Các chủng loại dệt chính:</strong> Vải thun Cotton 2C, Cotton 4C, Vải Cá sấu Tici 65/35, Cá sấu Cotton, Vải mè thể thao, Vải thun lạnh Interlock, Vải Poly 2 da, Vải nỉ da cá, Vải nỉ bông cào...</li>
    <li><strong>Nguồn cung cấp sợi:</strong> Nhập khẩu trực tiếp từ các tập đoàn kéo sợi danh tiếng (sợi Cotton Compact, sợi Poly DTY, sợi Spandex Creora...).</li>
  </ul>

  <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 30px; margin-bottom: 15px;">2. Hệ Thống Dây Chuyền Máy Dệt Kim Hiện Đại</h2>
  <p style="font-size: 15px; line-height: 1.8; color: #334155;">Máy dệt là linh hồn của xưởng dệt vải thun. Để mỗi cây vải xuất xưởng đều đạt chuẩn bề mặt láng mịn, không sọc kim, không đứt sợi và có độ đàn hồi hoàn hảo, Tiến Phát Đạt đã trang bị hệ thống máy dệt tiên tiến hàng đầu.</p>
  
  <h3 style="font-size: 17px; font-weight: 700; color: #1e293b; margin-top: 20px; margin-bottom: 10px;">a. Dây chuyền máy dệt kim công nghệ cao Karl Mayer & Màn hình điều khiển kỹ thuật số</h3>
  <p style="font-size: 15px; line-height: 1.8; color: #334155;">Phân xưởng dệt được trang bị hệ thống máy dệt hiện đại với màn hình điều khiển kỹ thuật số thông minh. Mọi thông số về độ căng sợi, mật độ vòng dệt (gauge/inch), tốc độ quay và trọng lượng mét vải đều được thiết lập tự động hóa chính xác, giúp hạn chế tối đa sai số do con người.</p>
  
  <figure style="margin: 25px 0; text-align: center;">
    <img src="images/factory/day-chuyen-may-det-cong-nghe-cao.jpg" alt="Dây chuyền máy dệt công nghệ cao Karl Mayer tại xưởng dệt Tiến Phát Đạt" style="width: 100%; max-width: 850px; max-height: 480px; object-fit: cover; border-radius: 8px; display: block; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.12);" />
    <figcaption style="font-size: 13px; color: #64748b; margin-top: 8px; font-style: italic;">
      Hình 1: Đội ngũ kỹ thuật viên giàu kinh nghiệm đang giám sát dây chuyền máy dệt kim hiện đại tại xưởng Tiến Phát Đạt
    </figcaption>
  </figure>

  <h3 style="font-size: 17px; font-weight: 700; color: #1e293b; margin-top: 20px; margin-bottom: 10px;">b. Hệ thống máy dệt kim tròn chuyên dụng (Circular Knitting Machine)</h3>
  <p style="font-size: 15px; line-height: 1.8; color: #334155;">Với các đơn hàng dệt vải thun ống (Single Jersey, Rib bo gân, Cá sấu Pique), hệ thống máy dệt kim tròn với giàn cấp sợi che chắn chống bụi xơ vải giúp sợi bông luôn sạch, tạo nên những cuộn vải mộc trắng tinh khiết, đồng đều từ mét đầu tiên đến mét cuối cùng.</p>

  <figure style="margin: 25px 0; text-align: center;">
    <img src="images/factory/may-det-kim-tron-ong-moc.jpg" alt="Máy dệt kim tròn công nghiệp dệt cuộn vải mộc tại xưởng Tiến Phát Đạt" style="width: 100%; max-width: 580px; max-height: 520px; object-fit: cover; border-radius: 8px; display: block; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.12);" />
    <figcaption style="font-size: 13px; color: #64748b; margin-top: 8px; font-style: italic;">
      Hình 2: Dàn máy dệt kim tròn công nghiệp liên tục vận hành tạo ra các cây vải mộc tiêu chuẩn cao
    </figcaption>
  </figure>

  <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 30px; margin-bottom: 15px;">3. Phân Xưởng Tổ Mắc Sợi & Trục Dệt Công Nghiệp</h2>
  <p style="font-size: 15px; line-height: 1.8; color: #334155;">Công đoạn mắc sợi (Warping) đóng vai trò quyết định đến độ căng đồng đều của màng sợi trước khi đưa vào giàn dệt. Tại Tiến Phát Đạt, phân xưởng tổ mắc được bố trí khu vực riêng biệt với hệ thống trục cuốn công nghiệp cỡ lớn, dàn cọc sợi tự động ngắt khi phát hiện sợi đứt.</p>

  <figure style="margin: 25px 0; text-align: center;">
    <img src="images/factory/phan-xuong-to-mac-det-soi.jpg" alt="Phân xưởng tổ mắc dệt sợi quy mô lớn tại Tiến Phát Đạt" style="width: 100%; max-width: 850px; max-height: 480px; object-fit: cover; border-radius: 8px; display: block; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.12);" />
    <figcaption style="font-size: 13px; color: #64748b; margin-top: 8px; font-style: italic;">
      Hình 3: Phân xưởng tổ mắc sợi với dàn trục dệt công nghiệp và đội ngũ công nhân lành nghề
    </figcaption>
  </figure>

  <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 30px; margin-bottom: 15px;">4. Kho Dự Trữ Vải Mộc (Greige Fabric) – Lợi Thế Cạnh Tranh Vượt Trội</h2>
  <p style="font-size: 15px; line-height: 1.8; color: #334155;">Một trong những điểm mạnh nhất của Cửa Hàng Vải Thun Tiến Phát Đạt chính là năng lực dự trữ sẵn <strong>hàng nghìn cây vải mộc</strong> ngay tại kho xưởng:</p>
  <ul style="font-size: 15px; line-height: 1.8; color: #334155; padding-left: 20px;">
    <li><strong>Không phụ thuộc thời gian dệt mộc:</strong> Khi đối tác xưởng may cần lên đơn nhuộm gấp theo màu thương hiệu riêng, chúng tôi có sẵn vải mộc để chuyển trực tiếp sang lò nhuộm công nghệ cao, rút ngắn 50% thời gian giao hàng.</li>
    <li><strong>Độ ổn định cao giữa các mẻ hàng:</strong> Vải mộc được dệt từ cùng lô sợi chất lượng giúp mẻ nhuộm sau hoàn toàn khớp màu và độ co rút so với mẻ nhuộm trước.</li>
    <li><strong>Kho bảo quản đạt chuẩn:</strong> Các cuộn vải mộc đều được bọc nilon bảo vệ, kê trên pallet sạch sẽ, tránh bụi bẩn và độ ẩm gây ố vàng sợi.</li>
  </ul>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 25px 0;">
    <figure style="margin: 0; text-align: center;">
      <img src="images/factory/kho-vai-moc-tien-phat-dat-1.jpg" alt="Kho dự trữ cây vải mộc trắng xếp chồng tại xưởng Tiến Phát Đạt" style="width: 100%; height: 380px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" />
      <figcaption style="font-size: 12.5px; color: #64748b; margin-top: 8px; font-style: italic;">
        Hình 4: Kho cuộn vải mộc trắng xếp chồng sẵn sàng cung ứng
      </figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      <img src="images/factory/kho-vai-moc-quy-mo-2.jpg" alt="Hành lang lưu trữ vải mộc dệt kim quy mô lớn Tiến Phát Đạt" style="width: 100%; height: 380px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" />
      <figcaption style="font-size: 12.5px; color: #64748b; margin-top: 8px; font-style: italic;">
        Hình 5: Dãy hành lang kho hàng lưu trữ vải mộc dồi dào
      </figcaption>
    </figure>
  </div>

  <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 30px; margin-bottom: 15px;">5. Quy Trình Kiểm Soát Chất Lượng KCS & Phòng Lab Kiểm Nghiệm</h2>
  <p style="font-size: 15px; line-height: 1.8; color: #334155;">Trước khi giao tới tay khách hàng, mỗi cây vải tại Tiến Phát Đạt đều phải trải qua các bước kiểm định khắt khe:</p>
  <div style="overflow-x: auto; margin: 20px 0;">
    <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
      <thead>
        <tr style="background: #1e293b; color: #fff;">
          <th style="padding: 12px; border: 1px solid #cbd5e1; text-align: left;">Hạng mục kiểm tra</th>
          <th style="padding: 12px; border: 1px solid #cbd5e1; text-align: left;">Tiêu chuẩn áp dụng</th>
          <th style="padding: 12px; border: 1px solid #cbd5e1; text-align: left;">Cam kết chất lượng</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>Độ bền màu giặt & ma sát</strong></td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">Cấp độ 4 - 5 (AATCC / ISO)</td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">Không phai màu, không lem màu khi giặt chung</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>Độ co rút giặt nước</strong></td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">Dưới 3% - 5% (xử lý compact định hình)</td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">Áo giữ nguyên phom dáng chuẩn sau giặt</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>Trọng lượng & khổ vải (GSM)</strong></td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">Đo bằng cân điện tử đĩa tròn chuyên dụng</td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">Đúng định lượng yêu cầu, khổ vải căng đều</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>Kiểm tra lỗi bề mặt</strong></td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">Máy soi vải kiểm 4 điểm quốc tế</td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">Không lũng lỗ, không sọc kim, mặt vải mịn đều</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 30px; margin-bottom: 15px;">6. Hợp Tác Dệt Nhuộm Cùng Cửa Hàng Vải Thun Tiến Phát Đạt</h2>
  <p style="font-size: 15px; line-height: 1.8; color: #334155;">Với phương châm <em>"Chất Lượng Vững Bền – Giá Gốc Tận Xưởng – Đồng Hành Cùng Phát Triển"</em>, Tiến Phát Đạt luôn sẵn sàng đồng hành cùng các xưởng may, công ty thời trang và Local Brand:</p>
  <ul style="font-size: 15px; line-height: 1.8; color: #334155; padding-left: 20px;">
    <li>Cung cấp mẫu vải mộc và mẫu vải nhuộm thực tế tận nơi hoàn toàn miễn phí.</li>
    <li>Nhận dệt và nhuộm màu độc quyền theo mã màu Pantone chỉ từ số lượng tối thiểu linh hoạt.</li>
    <li>Chính sách chiết khấu giá sỉ tốt nhất thị trường kèm hỗ trợ vận chuyển nội thành TP.HCM và gửi chành xe toàn quốc.</li>
  </ul>

  <div style="background: linear-gradient(135deg, #181e26 0%, #242c38 100%); color: #fff; padding: 25px 30px; border-radius: 8px; margin-top: 35px; border-left: 5px solid #F58634;">
    <h3 style="color: #F58634; margin: 0 0 10px 0; font-size: 19px;">LIÊN HỆ TƯ VẤN & THAM QUAN XƯỞNG DỆT TIẾN PHÁT ĐẠT</h3>
    <p style="margin: 0 0 8px 0; font-size: 14.5px;">📍 <strong>Địa chỉ kho vải:</strong> 33 Lê Cảnh Tuân, Phường Phú Thọ Hòa, Quận Tân Phú, TP. Hồ Chí Minh</p>
    <p style="margin: 0 0 8px 0; font-size: 14.5px;">📞 <strong>Hotline / Zalo:</strong> <a href="tel:0938591207" style="color: #F58634; font-weight: bold; text-decoration: none;">0938.591.207</a></p>
    <p style="margin: 0; font-size: 14.5px;">🌐 <strong>Website:</strong> cuahangvaithun.vercel.app</p>
  </div>
</div>""",
        "images": [
            "images/factory/day-chuyen-may-det-cong-nghe-cao.jpg",
            "images/factory/may-det-kim-tron-ong-moc.jpg",
            "images/factory/phan-xuong-to-mac-det-soi.jpg",
            "images/factory/kho-vai-moc-tien-phat-dat-1.jpg",
            "images/factory/kho-vai-moc-quy-mo-2.jpg"
        ],
        "date": "18/07/2026",
        "author": "Tiến Phát Đạt"
    },
    {
        "id": 2,
        "slug": "vai-cotton-65-35-tc-2c-gia-si-dac-diem-va-ung-dung",
        "title": "Vải Cotton 65/35 (TC 2C) Giá Sỉ – Đặc Điểm, Ưu Điểm Và Ứng Dụng",
        "category": "Kiến thức vải thun",
        "thumbnail": "images/products/ảnh-cotton-2c-1-300x225.jpg",
        "summary": "Vải Cotton 65/35 (TC 2C, vải Tici) là chất liệu được sử dụng phổ biến để may đồng phục và áo thun nhờ độ bền cao, ít nhăn, giá thành hợp lý. Khám phá đặc điểm, ứng dụng và bảo quản...",
        "content_html": """<div class="entry-content">
  <p>Vải Cotton 65/35 (còn gọi là vải Tici hay TC 2C) là sự kết hợp hoàn hảo giữa 65% sợi Polyester và 35% sợi bông Cotton tự nhiên. Đây là một trong những chất liệu vải thun bán chạy nhất trên thị trường hiện nay nhờ sự cân bằng tối ưu giữa độ bền cơ học và cảm giác êm ái khi mặc.</p>
  <h3>1. Ưu điểm nổi bật của vải Cotton 65/35</h3>
  <ul>
    <li><strong>Độ bền cao & ít nhăn:</strong> Thành phần sợi PE giúp mặt vải đứng phom, không bị xù lông hoặc co rúm sau nhiều lần giặt máy.</li>
    <li><strong>Màu sắc phong phú, bền màu:</strong> Khả năng bắt màu nhuộm xuất sắc, gam màu tươi sáng và lâu phai theo thời gian.</li>
    <li><strong>Giá thành cực kỳ kinh tế:</strong> Tiết kiệm chi phí đáng kể so với vải Cotton 100%, là sự lựa chọn số 1 cho các đơn hàng đồng phục số lượng lớn.</li>
  </ul>
  <h3>2. Ứng dụng phổ biến trong ngành may</h3>
  <p>Vải TC 2C thường được các xưởng may ưu tiên lựa chọn để may áo thun đồng phục học sinh, đồng phục công ty, áo quảng cáo sự kiện và đồ mặc nhà.</p>
</div>""",
        "images": ["images/products/ảnh-cotton-2c-1-300x225.jpg"],
        "date": "09/07/2026",
        "author": "Tiến Phát Đạt"
    },
    {
        "id": 3,
        "slug": "cotton-va-thun-lanh-khac-nhau-nhu-the-nao",
        "title": "Cotton Và Thun Lạnh Khác Nhau Như Thế Nào? So Sánh Vải Cotton & Thun Lạnh Chi Tiết",
        "category": "So sánh & Bảng màu",
        "thumbnail": "images/products/bảng-màu-cotton-4c.jpg",
        "summary": "Cotton và thun lạnh là hai chất liệu phổ biến trong ngành dệt may. Cotton nổi bật với khả năng thấm hút, mềm mại và thoáng khí; trong khi thun lạnh sở hữu ưu điểm về độ mát, co giãn và bền bỉ.",
        "content_html": """<div class="entry-content">
  <p>Rất nhiều xưởng may và khách hàng băn khoăn giữa việc chọn vải Cotton hay vải Thun Lạnh cho mẫu áo mới. Cả hai dòng vải này đều sở hữu những thế mạnh riêng biệt phù hợp cho từng mục đích sử dụng khác nhau.</p>
  <h3>1. Vải Cotton – Sự thoải mái tự nhiên</h3>
  <p>Cotton được dệt từ sợi bông tự nhiên, thấm hút mồ hôi vượt trội, tạo cảm giác thân thiện với làn da, đặc biệt thích hợp cho thời trang phong cách đường phố (streetwear) và áo thun casual cao cấp.</p>
  <h3>2. Vải Thun Lạnh – Trơn láng, co giãn đỉnh cao</h3>
  <p>Thun lạnh (thường từ sợi Poly kết hợp Spandex) cho cảm giác mát lạnh tức thì khi chạm tay, không nhăn, nhanh khô và co giãn 4 chiều linh hoạt. Đây là chất liệu hoàn hảo nhất cho trang phục thể thao, đồ tập gym, yoga và đồ bơi.</p>
</div>""",
        "images": ["images/products/bảng-màu-cotton-4c.jpg"],
        "date": "27/06/2026",
        "author": "Tiến Phát Đạt"
    },
    {
        "id": 4,
        "slug": "vai-ca-sau-my-la-gi-uu-nhuoc-diem-va-cach-nhan-biet",
        "title": "Vải Cá Sấu Mỹ Là Gì? Ưu Nhược Điểm Và Cách Nhận Biết May Áo Polo",
        "category": "Kiến thức vải thun",
        "thumbnail": "images/products/vải-thun-cá-sấu-pe-4c-450x450.jpg",
        "summary": "Vải cá sấu Mỹ là gì? Tìm hiểu ưu nhược điểm, cách nhận biết cá sấu Mỹ 240gsm khổ 2m1 phù hợp áo polo, đồng phục cao cấp cho doanh nghiệp và thời trang.",
        "content_html": """<div class="entry-content">
  <p>Vải cá sấu Mỹ (Lacoste pique) được dệt với mắt lưới hình thoi độc đáo, tạo nên độ dày dặn và đứng phom chuẩn cho các mẫu áo polo sang trọng, lịch lãm.</p>
  <h3>1. Đặc tính của vải Cá Sấu Mỹ</h3>
  <p>Với định lượng khoảng 240gsm và khổ vải rộng 2m1 - 2m2, vải cá sấu Mỹ cho năng suất cắt may cao, mặt vải đanh chắc, thấm hút mồ hôi tốt và không bị biến dạng cổ áo sau thời gian dài sử dụng.</p>
</div>""",
        "images": ["images/products/vải-thun-cá-sấu-pe-4c-450x450.jpg"],
        "date": "28/05/2026",
        "author": "Tiến Phát Đạt"
    },
    {
        "id": 5,
        "slug": "don-hang-gap-can-vai-giao-nhanh-so-luong-lon",
        "title": "Đơn Gấp Cần Vải? Tiến Phát Đạt Hỗ Trợ Giao Nhanh Số Lượng Lớn Tận Xưởng",
        "category": "Cung ứng & Giao hàng",
        "thumbnail": "images/factory/kho-vai-moc-quy-mo-2.jpg",
        "summary": "Đơn gấp cần vải? Tiến Phát Đạt hỗ trợ giao nhanh số lượng lớn với nhiều dòng cotton, mè, poly, cá sấu có sẵn giá tốt cho xưởng may tại TP.HCM và các tỉnh lân cận.",
        "content_html": """<div class="entry-content">
  <p>Hiểu được áp lực tiến độ giao hàng của các xưởng may và đối tác gia công xuất khẩu, Cửa Hàng Vải Thun Tiến Phát Đạt luôn duy trì kho hàng sẵn với hàng trăm mã màu và định lượng đa dạng.</p>
  <h3>Chính sách giao hàng siêu tốc tại Tiến Phát Đạt:</h3>
  <ul>
    <li>Giao ngay trong 2 - 4 giờ đối với các đơn hàng tại khu vực nội thành TP.HCM (Tân Phú, Tân Bình, Bình Tân, Quận 12...).</li>
    <li>Hỗ trợ chuyển hàng nhanh ra các bến xe, chành xe đi các tỉnh Bình Dương, Đồng Nai, Long An, Tiền Giang, Cần Thơ, Đà Nẵng, Hà Nội...</li>
    <li>Kiểm tra hàng hóa, cân trọng lượng chính xác và niêm phong cây vải trước khi xuất kho.</li>
  </ul>
</div>""",
        "images": ["images/factory/kho-vai-moc-quy-mo-2.jpg"],
        "date": "16/05/2026",
        "author": "Tiến Phát Đạt"
    },
    {
        "id": 6,
        "slug": "bi-quyet-giu-gin-va-bao-quan-san-pham-tu-vai-thun-me-the-thao",
        "title": "Bí Quyết Giữ Gìn Và Bảo Quản Vải Thun Mè Thể Thao",
        "category": "Kiến thức vải thun",
        "thumbnail": "images/products/x11-450x450.jpg",
        "summary": "Cách giặt đúng sẽ giúp bảo vệ vải thun mè thể thao khỏi bị biến dạng hoặc hỏng. Hãy chọn chế độ giặt nhẹ hoặc dành riêng cho vải nhạy cảm, sử dụng chất tẩy rửa phù hợp để giữ phom áo.",
        "content_html": """<div class="entry-content">
  <p>Vải thun mè thể thao có cấu trúc mắt dệt li ti giúp thông khí nhanh chóng. Để giữ cho áo luôn bền đẹp:</p>
  <ul>
    <li>Giặt nhẹ nhàng, không dùng chất tẩy clo mạnh.</li>
    <li>Tránh sấy ở nhiệt độ quá cao làm co rút sợi thun.</li>
    <li>Phơi nơi râm mát, thoáng khí để bảo vệ màu sắc và độ co giãn của vải.</li>
  </ul>
</div>""",
        "images": ["images/products/x11-450x450.jpg"],
        "date": "15/05/2026",
        "author": "Tiến Phát Đạt"
    },
    {
        "id": 7,
        "slug": "so-sanh-vai-thun-cotton-2c-va-cotton-4c-dau-la-lua-chon-hoan-hao-cho-ban",
        "title": "So Sánh Vải Thun Cotton 2C Và Cotton 4C: Đâu Là Lựa Chọn Hoàn Hảo Cho Bạn?",
        "category": "So sánh & Bảng màu",
        "thumbnail": "images/products/ảnh-cotton-2c-1-300x225.jpg",
        "summary": "So sánh chi tiết độ co giãn, độ dày dặn, khả năng giữ phom dáng và giá thành giữa Cotton 2 chiều và Cotton 4 chiều, giúp xưởng may chọn đúng chất liệu cho bộ sưu tập thời trang.",
        "content_html": """<div class="entry-content">
  <p>Vải thun cotton luôn là chất liệu được yêu thích hàng đầu. Sự khác biệt giữa cotton 2c và 4c nằm ở thành phần sợi Spandex và hướng co giãn của vải.</p>
  <ul>
    <li><strong>Cotton 2C:</strong> Co giãn theo chiều ngang, vải đứng phom, dày dặn, thích hợp áo thun form rộng oversize.</li>
    <li><strong>Cotton 4C:</strong> Co giãn cả chiều ngang và chiều dọc, mềm mịn, ôm dáng thoải mái, thích hợp áo thời trang cao cấp.</li>
  </ul>
</div>""",
        "images": ["images/products/ảnh-cotton-2c-1-300x225.jpg"],
        "date": "10/05/2026",
        "author": "Tiến Phát Đạt"
    },
    {
        "id": 8,
        "slug": "vai-ao-thun-local-brand-noi-bat-2024-su-lua-chon-toi-uu-cho-phong-cach-ca-nhan",
        "title": "Vải Áo Thun Local Brand Nổi Bật: Xu Hướng & Lựa Chọn Hàng Đầu",
        "category": "Xu hướng may mặc",
        "thumbnail": "images/products/localbrand.jpg",
        "summary": "Xu hướng lựa chọn chất liệu vải cho các Local Brand Việt Nam: từ Cotton 100% 250gsm dày dặn đứng form đến lưới nhún X7, bóng chiếu phong cách đường phố năng động.",
        "content_html": """<div class="entry-content">
  <p>Các Local Brand hiện nay cực kỳ chú trọng vào chất lượng vải. Vải áo thun không chỉ cần mềm mát mà phải có độ đanh mịn, định lượng từ 230gsm đến 280gsm để khi in ấn chuyển nhiệt, in lụa hay thêu vi tính đều sắc nét hoàn hảo.</p>
</div>""",
        "images": ["images/products/localbrand.jpg"],
        "date": "02/05/2026",
        "author": "Tiến Phát Đạt"
    },
    {
        "id": 9,
        "slug": "vai-thun-lanh-la-gi-dac-diem-va-ung-dung-trong-doi-song",
        "title": "Vải Thun Lạnh Là Gì? Đặc Điểm Và Ứng Dụng Trong Đời Sống",
        "category": "Kiến thức vải thun",
        "thumbnail": "images/products/vải-thun-poly-2da-4c-450x450.jpg",
        "summary": "Vải thun lạnh sở hữu bề mặt trơn láng, mát lạnh khi chạm vào, ít nhăn và nhanh khô. Cùng tìm hiểu ưu nhược điểm và ứng dụng phong phú của dòng vải thể thao này.",
        "content_html": """<div class="entry-content">
  <p>Vải thun lạnh là chất liệu không thể thiếu trong tủ đồ thể thao và đồ mặc nhà hiện đại, mang lại cảm giác thoáng mát tối đa cho người mặc trong thời tiết nắng nóng.</p>
</div>""",
        "images": ["images/products/vải-thun-poly-2da-4c-450x450.jpg"],
        "date": "20/04/2026",
        "author": "Tiến Phát Đạt"
    }
]

with open('server/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print(f"Updated server/data/posts.json with {len(posts)} articles!")
