import React from 'react';
import { Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image with experience badge */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/banners/3-1.png"
                alt="Xưởng Vải Tiến Phát Đạt"
                className="w-full h-[380px] md:h-[460px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/banners/1-1.png';
                }}
              />
            </div>
            <div className="absolute -bottom-6 -right-3 md:-right-6 bg-[#fc9631] text-white p-5 md:p-6 rounded-2xl shadow-xl text-center">
              <strong className="block text-3xl md:text-4xl font-black leading-none mb-1">
                10+
              </strong>
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider block">
                Năm Uy Tín
              </span>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#fc9631] block mb-2">
              Về Chúng Tôi
            </span>
            <h2 className="text-2.5xl md:text-4xl font-black text-gray-900 leading-tight mb-6">
              Cửa Hàng Vải Thun Tiến Phát Đạt - Đồng Hành Cùng Ngành May
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              Tọa lạc ngay tại trung tâm dệt may Tân Phú, TP.HCM, Tiến Phát Đạt là đối tác cung ứng vải thun quen thuộc của hàng trăm xưởng may gia công, xưởng may đồng phục, xưởng thời trang trẻ em và các thương hiệu local brand trên toàn quốc.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              Chúng tôi sở hữu năng lực cung ứng dồi dào, cập nhật nhanh nhạy các chất liệu vải thun mới, cam kết sợi dệt mềm mại, thớ vải đanh chắc, không xù lông và màu nhuộm bền đẹp theo năm tháng.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Nguồn vải sẵn kho số lượng lớn, đáp ứng đơn hàng gấp từ vài cây đến hàng tấn.',
                'Bảng màu phong phú, liên tục cập nhật theo xu hướng thời trang quốc tế.',
                'Hỗ trợ cắt mẫu gửi tận tay khách hàng kiểm tra thớ vải và độ co giãn.',
                'Chính sách giá sỉ ưu đãi và hỗ trợ vận chuyển chuyên nghiệp.'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-gray-800 font-medium">
                  <div className="w-5 h-5 rounded-full bg-orange-100 text-[#fc9631] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <a
                href="#quote-section"
                className="btn-shimmer bg-[#fc9631] hover:bg-[#e57d19] text-white font-bold text-sm px-6 py-3 rounded uppercase tracking-wider transition shadow-md"
              >
                Nhận Báo Giá Mẫu Vải
              </a>
              <a
                href="tel:0938591207"
                className="border-2 border-[#fc9631] text-[#fc9631] hover:bg-[#fc9631] hover:text-white font-bold text-sm px-6 py-3 rounded uppercase tracking-wider transition"
              >
                Hotline: 0938.591.207
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
