import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, Phone, MessageSquare, MapPin } from 'lucide-react';
import { ThangMayCounter } from '../components/ThangMayCounter';
import { ThangMayWhyUs } from '../components/ThangMayWhyUs';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Breadcrumb Header matching thangmay1 style */}
      <div className="bg-[#242b38] py-10 text-white relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-tight text-white">
              Giới Thiệu
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Cửa Hàng Vải Thun Tiến Phát Đạt - Nguồn Cung Cấp Vải Thun May Mặc Uy Tín
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Link to="/" className="hover:text-[#f49712] transition">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[#f49712] font-semibold">Giới thiệu</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-widest text-[#f49712] font-extrabold block">
              VỀ CHÚNG TÔI
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-snug">
              Cửa Hàng Vải Thun Tiến Phát Đạt
            </h2>
            <div className="w-12 h-1 bg-[#f49712]"></div>

            <p className="text-xs md:text-sm text-gray-600 leading-relaxed text-justify">
              Tọa lạc tại địa chỉ <strong>33 Lê Cảnh Tuân, P. Phú Thọ Hòa, Q. Tân Phú, TP.HCM</strong> – trung tâm của khu vực dệt may sầm uất nhất miền Nam, <strong>Cửa Hàng Vải Thun Tiến Phát Đạt</strong> chuyên phân phối sỉ và lẻ các loại vải thun cao cấp phục vụ cho các xưởng may gia công, các thương hiệu thời trang thiết kế và phong cách Local Brand trẻ.
            </p>

            <p className="text-xs md:text-sm text-gray-600 leading-relaxed text-justify">
              Chúng tôi luôn chú trọng vào chất lượng dệt kim đều sợi, độ đàn hồi tự nhiên, định lượng vải chuẩn xác và độ bền màu cao sau nhiều chu kỳ giặt. Với kho hàng phong phú hàng chục tấn vải có sẵn, Tiến Phát Đạt đáp ứng nhanh chóng mọi đơn đặt hàng từ số lượng nhỏ đến các lô hàng lớn theo cây.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-gray-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f49712] shrink-0" />
                <span>Vải Cotton 2C & Cotton 4C</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f49712] shrink-0" />
                <span>Vải Cá Sấu Polo (Poly/PE/Cotton)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f49712] shrink-0" />
                <span>Thun Lạnh & Poly Thể Thao</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f49712] shrink-0" />
                <span>Vải Mè Kiểu & Lưới Nhún</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f49712] shrink-0" />
                <span>Vải Nỉ Bông & Da Cá Dày</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f49712] shrink-0" />
                <span>Bo Gân & Phụ Liệu May Mặc</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href="tel:0938591207"
                className="bg-[#f49712] hover:bg-[#d8820a] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 transition shadow flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Hotline: 0938.591.207
              </a>
              <a
                href="https://zalo.me/0938591207"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#0084ff] text-[#0084ff] hover:bg-[#0084ff] hover:text-white text-xs font-bold uppercase tracking-wider px-6 py-3 transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Tư vấn Zalo
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-none overflow-hidden shadow-lg border-4 border-white">
              <img
                src="/images/banners/localbrand.jpg"
                alt="Xưởng vải thun Tiến Phát Đạt"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-xs text-white p-4">
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="w-4 h-4 text-[#f49712] shrink-0" />
                  <span>Kho hàng chính: 33 Lê Cảnh Tuân, P. Phú Thọ Hòa, Q. Tân Phú, TP.HCM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Animated Counter */}
      <ThangMayCounter />

      {/* Why Choose Us */}
      <ThangMayWhyUs />
    </div>
  );
};
