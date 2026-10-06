import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';

const SLIDES = [
  {
    badge: 'Xưởng Dệt & Phân Phối Vải Thun',
    title: 'Vải Thun Tiến Phát Đạt\nChất Lượng Xuất Xưởng',
    desc: 'Chuyên cung cấp sỉ và lẻ toàn diện các dòng vải thun may mặc: Cotton 2C/4C, Cá Sấu Poly, Tici, Thun Lạnh, Mè Thể Thao với giá xuất xưởng tốt nhất tại TP.HCM.',
    image: '/images/banners/www.reallygreatsite.com_.png',
    primaryCta: 'Xem 26 Mẫu Vải Thun',
    primaryLink: '#products-showcase',
    secondaryCta: 'Gọi 0938.591.207',
    secondaryLink: 'tel:0938591207'
  },
  {
    badge: 'Nguồn Cung Ổn Định Toàn Quốc',
    title: 'Đa Dạng Bảng Màu\nĐịnh Lượng Chuẩn Xác',
    desc: 'Cam kết độ bền màu xuất sắc, co giãn đàn hồi cao, thớ dệt mềm mịn không xù lông. Đáp ứng tiêu chuẩn khắt khe cho xưởng may thời trang và thương hiệu local brand.',
    image: '/images/banners/1-1.png',
    primaryCta: 'Nhận Mẫu Vải Qua Zalo',
    primaryLink: 'https://zalo.me/0938591207',
    secondaryCta: 'Liên Hệ Báo Giá',
    secondaryLink: '#quote-section'
  },
  {
    badge: 'Ưu Đãi Đặc Biệt Cho Xưởng May',
    title: 'Giá Thành Cạnh Tranh\nGiao Hàng Hỏa Tốc',
    desc: 'Hỗ trợ giao hàng hỏa tốc trong nội thành TP.HCM và vận chuyển ra chành xe đi tất cả các tỉnh thành trên toàn quốc an toàn, nhanh chóng.',
    image: '/images/banners/2-3.png',
    primaryCta: 'Khám Phá Bộ Sưu Tập',
    primaryLink: '#products-showcase',
    secondaryCta: 'Đến Thăm Kho Vải',
    secondaryLink: '#contact-section'
  }
];

export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);

  return (
    <div id="home" className="relative w-full h-[420px] md:h-[540px] overflow-hidden bg-gray-900 group">
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center flex items-center ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent"></div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full">
            <div className="max-w-2xl text-white">
              <span className="inline-block bg-[#fc9631] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 shadow-md">
                {slide.badge}
              </span>
              <h2 className="text-2.5xl md:text-5xl font-black leading-tight mb-4 whitespace-pre-line tracking-tight drop-shadow-md">
                {slide.title}
              </h2>
              <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6 drop-shadow-sm line-clamp-3 md:line-clamp-none">
                {slide.desc}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={slide.primaryLink}
                  className="btn-shimmer bg-[#fc9631] hover:bg-[#e57d19] text-white font-bold text-xs md:text-sm px-6 py-3 rounded uppercase tracking-wider transition shadow-lg inline-flex items-center gap-2"
                >
                  {slide.primaryCta}
                </a>
                <a
                  href={slide.secondaryLink}
                  className="border-2 border-white/80 hover:bg-white hover:text-gray-900 text-white font-bold text-xs md:text-sm px-6 py-3 rounded uppercase tracking-wider transition inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#fc9631]" />
                  {slide.secondaryCta}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-[#fc9631] text-white flex items-center justify-center transition backdrop-blur-xs z-30 opacity-70 group-hover:opacity-100"
        aria-label="Slide trước"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-[#fc9631] text-white flex items-center justify-center transition backdrop-blur-xs z-30 opacity-70 group-hover:opacity-100"
        aria-label="Slide sau"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === current ? 'w-8 bg-[#fc9631]' : 'w-2.5 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Chuyển tới slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
