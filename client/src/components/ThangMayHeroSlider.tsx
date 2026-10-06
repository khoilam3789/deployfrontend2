import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    title: 'Giải Pháp Vải Thun Toàn Diện\nCho Mọi Xưởng May',
    desc: 'Khám phá bộ sưu tập 26 mẫu vải thun cao cấp của Cửa Hàng Tiến Phát Đạt với giá xuất xưởng tốt nhất.',
    image: '/images/banners/www.reallygreatsite.com_.png',
    btnText: 'Xem Bộ Sưu Tập',
    btnLink: '/san-pham'
  },
  {
    title: 'Nguồn Cung Ổn Định\nĐa Dạng Bảng Màu',
    desc: 'Cam kết độ bền màu xuất sắc, co giãn đàn hồi cao, đáp ứng mọi đơn hàng lớn nhỏ của xưởng may toàn quốc.',
    image: '/images/banners/1-1.png',
    btnText: 'Nhận Báo Giá Ngay',
    btnLink: '/lien-he'
  },
  {
    title: 'Vải May Local Brand\nChất Lượng Xuất Khẩu',
    desc: 'Chuyên cung cấp vải Cotton 2C, Cotton 4C định lượng cao, bề mặt đanh mịn không xù lông cho các thương hiệu thời trang.',
    image: '/images/banners/localbrand.jpg',
    btnText: 'Khám Phá Thêm',
    btnLink: '/san-pham'
  }
];

export const ThangMayHeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length);

  return (
    <section 
      id="home" 
      className="relative w-full h-[450px] md:h-[520px] overflow-hidden bg-gray-950 group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 flex items-center ${
            idx === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Subtle Dark Gradient Overlay matching thangmay1 */}
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="max-w-[1240px] mx-auto px-6 relative z-20 w-full text-center">
            <span className="inline-block bg-[#f49712]/90 text-white text-[11px] font-extrabold uppercase px-3 py-1 mb-4 rounded-xs tracking-wider">
              Cửa Hàng Vải Thun Tiến Phát Đạt
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 whitespace-pre-line drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-gray-100 text-xs sm:text-base md:text-lg max-w-2xl mx-auto mb-8 drop-shadow-md font-light leading-relaxed">
              {slide.desc}
            </p>
            <div>
              <Link
                to={slide.btnLink}
                className="inline-block bg-[#f49712] hover:bg-[#d8820a] text-white font-bold text-xs md:text-sm px-8 py-3.5 rounded-xs uppercase tracking-wider transition shadow-lg hover:shadow-orange-500/40"
              >
                {slide.btnText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-[#f49712] text-white flex items-center justify-center transition z-30 opacity-70 group-hover:opacity-100 cursor-pointer"
        aria-label="Slide trước"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-[#f49712] text-white flex items-center justify-center transition z-30 opacity-70 group-hover:opacity-100 cursor-pointer"
        aria-label="Slide sau"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all rounded-full cursor-pointer ${
              idx === current ? 'w-8 h-2.5 bg-[#f49712]' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
