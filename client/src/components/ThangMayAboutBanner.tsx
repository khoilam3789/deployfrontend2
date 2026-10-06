import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ThangMayAboutBanner: React.FC = () => {
  return (
    <section id="about" className="py-0 overflow-hidden bg-gray-50 border-b border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* Left column: Genuine Fabric Image with hover effect */}
        <div className="relative overflow-hidden group min-h-[380px] lg:min-h-[460px] bg-gray-900">
          <img
            src="/images/banners/localbrand.jpg"
            alt="Vải may áo thun Local Brand Tiến Phát Đạt"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white text-xs font-bold bg-[#f49712] px-3 py-1 rounded-xs uppercase tracking-wider">
            Hình ảnh vải thực tế tại xưởng
          </div>
        </div>

        {/* Right column: Content with Thangmay1 style dark container */}
        <div className="relative p-8 md:p-14 lg:p-16 flex flex-col justify-center bg-[#252c37] text-white">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#f49712] font-extrabold block mb-2">
              VỀ CHÚNG TÔI
            </span>
            <h2 className="text-2xl md:text-3.5xl font-black uppercase tracking-tight text-white mb-5 leading-tight drop-shadow-md">
              Cửa Hàng Vải Thun Tiến Phát Đạt
            </h2>
            <div className="w-12 h-1 bg-[#f49712] mb-6"></div>
            <p className="text-gray-200 text-xs md:text-sm leading-relaxed mb-8 font-light text-justify">
              Là một trong những đơn vị phân phối nguồn vải thun may mặc uy tín tại TP.HCM, cung ứng đa dạng các chủng loại: Cotton 2C, Cotton 4C, Cá Sấu Polo, Thun Lạnh, Vải Mè, Nỉ Da Cá. Chúng tôi đồng hành cùng các xưởng may, công ty đồng phục và các thương hiệu Local Brand trẻ, đảm bảo chất lượng dệt đều sợi, bền màu và giao hàng nhanh chóng trên toàn quốc.
            </p>
            <div>
              <Link
                to="/gioi-thieu"
                className="inline-flex items-center gap-2 bg-[#f49712] hover:bg-[#d8820a] text-white font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-full transition shadow-lg hover:shadow-orange-500/40"
              >
                <span>Xem chi tiết</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
