import React from 'react';
import { Link } from 'react-router-dom';

export const ThangMayFooter: React.FC = () => {
  return (
    <footer className="relative bg-[#171010] text-gray-300 pt-0 pb-6 overflow-hidden text-xs">
      {/* Wave shape divider matching thangmay1 */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1000 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 text-[#171010] fill-current">
          <path opacity="0.1" d="M1014 64V186H206L34 100C34 100 344.42 77.16 436 21C542 -44 590 -40 704 9C811 55 899.11 14.94 979 146L1014 64Z"></path>
          <path opacity="0.2" d="M-286 155C-286 155 -72 52 52 26C176 0 255 55 436 127C581.57 184.91 614.7 177.79 708 127C787 84 1009 -96 1093 64C1146 165.63 1031 193 1031 193L924 277L-288 289L-286 155Z"></path>
          <path d="M-12 101C-12 101 58 184 182 158C306 132 342.29 121.23 456 164C565 205 640.82 188.36 721 149C776 122 837.5 91.31 935 153C984 184 1030 179 1030 179L1024 330L-12 340V101Z"></path>
        </svg>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Col 1: Store details */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-white text-sm font-black uppercase tracking-wider mb-3">
              CỬA HÀNG VẢI THUN TIẾN PHÁT ĐẠT
            </h3>
            <div className="space-y-2 text-gray-400 leading-relaxed text-xs">
              <p><strong className="text-gray-200">[ Địa Chỉ ]</strong> 33 Lê Cảnh Tuân, P. Phú Thọ Hòa, Q. Tân Phú, TP. Hồ Chí Minh</p>
              <p><strong className="text-gray-200">[ Hotline ]</strong> <a href="tel:0938591207" className="text-[#f49712] font-bold">0938.591.207</a> - 0937.116.704</p>
              <p><strong className="text-gray-200">[ Website ]</strong> VAITHUNTIENPHATDAT.COM</p>
              <p><strong className="text-gray-200">[ Email ]</strong> vaithuntienphatdat@gmail.com</p>
            </div>

            <div className="flex items-center gap-2 pt-3">
              <a href="https://zalo.me/0938591207" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-gray-600 hover:border-[#f49712] hover:text-[#f49712] text-gray-300 flex items-center justify-center transition text-xs font-bold">
                Z
              </a>
              <a href="tel:0938591207" className="w-8 h-8 rounded-full border border-gray-600 hover:border-[#f49712] hover:text-[#f49712] text-gray-300 flex items-center justify-center transition text-xs font-bold">
                📞
              </a>
            </div>
          </div>

          {/* Col 2: Product list links */}
          <div className="md:col-span-3 space-y-2">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
              Danh Mục Sản Phẩm
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/san-pham?category=cotton" className="hover:text-[#f49712] transition">Vải Thun Cotton & Tici 4C</Link></li>
              <li><Link to="/san-pham?category=ca-sau" className="hover:text-[#f49712] transition">Vải Thun Cá Sấu Polo</Link></li>
              <li><Link to="/san-pham?category=the-thao" className="hover:text-[#f49712] transition">Vải Thun Lạnh & Thể Thao</Link></li>
              <li><Link to="/san-pham?category=me-luoi" className="hover:text-[#f49712] transition">Vải Mè & Lưới Nhún</Link></li>
              <li><Link to="/san-pham?category=ni-da-ca" className="hover:text-[#f49712] transition">Vải Nỉ Cào & Da Cá Dày</Link></li>
              <li><Link to="/san-pham" className="hover:text-[#f49712] transition">Xem tất cả 26 mẫu vải &rarr;</Link></li>
            </ul>
          </div>

          {/* Col 3: Map */}
          <div className="md:col-span-5 space-y-2">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
              Bản Đồ Chỉ Đường
            </h3>
            <div className="rounded-2xl overflow-hidden border-2 border-[#f49712]/60 shadow-lg">
              <iframe
                title="Bản đồ cửa hàng vải thun Tiến Phát Đạt"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3566949435653!2d106.62422138421462!3d10.783968931651062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ea8275e9fb9%3A0xc0e812adeb519999!2zMzMgTMOqIEPhuqNuaCBUdcOibiwgUGjDuiBUaOG7jSBIb8OgLCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1711352466718!5m2!1svi!2s"
                width="100%"
                height="190"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-gray-500 text-[11px]">
          <p>Copyright © 2026 Cửa Hàng Vải Thun Tiến Phát Đạt. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Hotline: <strong className="text-[#f49712]">0938.591.207</strong></span>
            <span>•</span>
            <Link to="/admin" className="text-gray-600 hover:text-gray-400">Quản trị</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
