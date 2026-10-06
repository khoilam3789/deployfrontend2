import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

export const Topbar: React.FC = () => {
  return (
    <div className="bg-[#30373f] text-[#cdd4dc] text-xs md:text-sm py-2 border-b border-white/10 hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#fc9631]" />
            <span>33 Lê Cảnh Tuân, P. Phú Thọ Hòa, Q. Tân Phú, TP.HCM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-[#fc9631]" />
            <a href="mailto:vaithuntienphatdat@gmail.com" className="hover:text-white transition">
              vaithuntienphatdat@gmail.com
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-[#fc9631]" />
            <span>
              Hotline: <strong className="text-white hover:text-[#fc9631] cursor-pointer"><a href="tel:0938591207">0938.591.207</a></strong> - <strong><a href="tel:0937116704">0937.116.704</a></strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
