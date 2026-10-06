import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

export const ThangMayTopbar: React.FC = () => {
  return (
    <div className="bg-[#30373f] text-gray-300 text-xs py-2 border-b border-white/5 hidden md:block">
      <div className="max-w-[1240px] mx-auto px-4 flex justify-between items-center">
        {/* Left greeting */}
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#f49712]" />
          <span>CỬA HÀNG VẢI THUN TIẾN PHÁT ĐẠT KÍNH CHÀO QUÝ KHÁCH</span>
        </div>

        {/* Center hours & Right contact */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#f49712]" />
            <span>8:00 sáng tới 6:00 chiều</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#f49712]" />
            <span>Hotline: <strong className="text-white hover:text-[#f49712]"><a href="tel:0938591207">0938.591.207</a></strong></span>
          </div>

          {/* Social Icons matching thangmay1 */}
          <div className="flex items-center gap-2 text-gray-400 pl-2 border-l border-white/10">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#f49712] transition">
              <span className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center text-[10px] font-bold">f</span>
            </a>
            <a href="https://zalo.me/0938591207" target="_blank" rel="noreferrer" className="hover:text-[#f49712] transition">
              <span className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center text-[10px] font-bold">Z</span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#f49712] transition">
              <span className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center text-[10px] font-bold">▶</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
