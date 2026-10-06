import React from 'react';
import { Phone } from 'lucide-react';

export const ThangMayFloating: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3.5 z-50">
      {/* Hotline Call Button with Wave & Shake Animation */}
      <a
        href="tel:0938591207"
        className="relative flex items-center justify-center w-13 h-13 rounded-full bg-[#f49712] text-white shadow-xl hover:scale-105 transition-all group"
        title="Gọi Hotline: 0938.591.207"
      >
        {/* Pulse Waves */}
        <div className="absolute inset-0 rounded-full border-2 border-[#f49712] animate-pulse-ring pointer-events-none"></div>
        <div className="absolute inset-0 rounded-full bg-[#f49712]/30 animate-pulse-wave pointer-events-none"></div>

        <Phone className="w-5 h-5 animate-phone-shake" />

        {/* Hover Label */}
        <span className="absolute right-full mr-3 bg-white text-gray-900 font-bold text-xs py-1.5 px-3 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
          Hotline: 0938.591.207
        </span>
      </a>

      {/* Zalo Button */}
      <a
        href="https://zalo.me/0938591207"
        target="_blank"
        rel="noreferrer"
        className="relative flex items-center justify-center w-13 h-13 rounded-full bg-[#0084ff] text-white shadow-xl hover:scale-105 transition-all group"
        title="Chat Zalo Báo Giá"
      >
        <span className="font-black text-xs tracking-tighter">Zalo</span>
        <span className="absolute right-full mr-3 bg-white text-gray-900 font-bold text-xs py-1.5 px-3 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
          Chat Zalo Báo Giá
        </span>
      </a>

      {/* Messenger Button */}
      <a
        href="https://m.me"
        target="_blank"
        rel="noreferrer"
        className="relative flex items-center justify-center w-13 h-13 rounded-full bg-[#0099ff] text-white shadow-xl hover:scale-105 transition-all group"
        title="Messenger"
      >
        <span className="font-bold text-xs">Chat</span>
        <span className="absolute right-full mr-3 bg-white text-gray-900 font-bold text-xs py-1.5 px-3 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
          Gửi tin nhắn
        </span>
      </a>
    </div>
  );
};
