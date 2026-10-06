import React from 'react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const handleCategory = (cat: string) => {
    onSelectCategory(cat);
    const el = document.getElementById('products-showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact-section" className="bg-[#22262a] text-[#adb5bd] pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-5 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#fc9631]">
              Vải Thun Tiến Phát Đạt
            </h3>
            <p className="text-xs md:text-sm leading-relaxed mb-4">
              Cầu nối dệt may uy tín và chất lượng. Chúng tôi cung ứng giải pháp nguồn vải thun toàn diện cho xưởng may và thương hiệu thời trang với mức giá tại xưởng.
            </p>
            <div className="inline-block bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white">
              ✓ Nguồn Hàng Ổn Định - Giá Xưởng Tốt
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-5 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#fc9631]">
              Dòng Vải Tiêu Biểu
            </h3>
            <ul className="space-y-2.5 text-xs md:text-sm">
              <li>
                <button onClick={() => handleCategory('cotton')} className="hover:text-[#fc9631] flex items-center gap-1.5 transition text-left cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5 text-[#fc9631]" /> Vải Thun Cotton & Tici 2c/4c
                </button>
              </li>
              <li>
                <button onClick={() => handleCategory('ca-sau')} className="hover:text-[#fc9631] flex items-center gap-1.5 transition text-left cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5 text-[#fc9631]" /> Vải Cá Sấu Cotton & PE
                </button>
              </li>
              <li>
                <button onClick={() => handleCategory('the-thao')} className="hover:text-[#fc9631] flex items-center gap-1.5 transition text-left cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5 text-[#fc9631]" /> Thun Lạnh & Poly 2 Da Thể Thao
                </button>
              </li>
              <li>
                <button onClick={() => handleCategory('me-luoi')} className="hover:text-[#fc9631] flex items-center gap-1.5 transition text-left cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5 text-[#fc9631]" /> Vải Mè Caro & Lưới Nhún
                </button>
              </li>
              <li>
                <button onClick={() => handleCategory('ni-da-ca')} className="hover:text-[#fc9631] flex items-center gap-1.5 transition text-left cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5 text-[#fc9631]" /> Vải Nỉ Bông & Da Cá Tici
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-5 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#fc9631]">
              Thông Tin Liên Hệ
            </h3>
            <ul className="space-y-3 text-xs md:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#fc9631] shrink-0 mt-0.5" />
                <span>33 Lê Cảnh Tuân, P. Phú Thọ Hòa, Q. Tân Phú, TP.HCM</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#fc9631] shrink-0 mt-0.5" />
                <span>
                  Hotline: <strong className="text-white hover:text-[#fc9631]"><a href="tel:0938591207">0938.591.207</a></strong><br />
                  Zalo: <strong className="text-white hover:text-[#fc9631]"><a href="tel:0937116704">0937.116.704</a></strong>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#fc9631] shrink-0 mt-0.5" />
                <a href="mailto:vaithuntienphatdat@gmail.com" className="hover:text-white transition">
                  vaithuntienphatdat@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-5 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#fc9631]">
              Bản Đồ Cửa Hàng
            </h3>
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-xs">
              <iframe
                title="Bản đồ cửa hàng Tiến Phát Đạt"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3566949435653!2d106.62422138421462!3d10.783968931651062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ea8275e9fb9%3A0xc0e812adeb519999!2zMzMgTMOqIEPhuqNuaCBUdcOibiwgUGjDuiBUaOG7jSBIb8OgLCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1711352466718!5m2!1svi!2s"
                width="100%"
                height="150"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© 2026 Cửa Hàng Vải Thun Tiến Phát Đạt. Giao diện chuẩn Thangmay1.</p>
          <p>Hotline tư vấn kỹ thuật dệt may & báo giá sỉ: <strong className="text-[#fc9631]">0938.591.207</strong></p>
        </div>
      </div>
    </footer>
  );
};
