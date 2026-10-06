import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp } from 'lucide-react';

export const FloatingButtons: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
        {/* Hotline Call Button */}
        <a
          href="tel:0938591207"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-xl hover:scale-105 transition-all group"
          title="Gọi Hotline 0938.591.207"
        >
          {/* Waves */}
          <div className="absolute inset-0 rounded-full border-2 border-orange-500 animate-pulse-ring pointer-events-none"></div>
          <div className="absolute inset-0 rounded-full bg-orange-500/30 animate-pulse-wave pointer-events-none"></div>

          <Phone className="w-6 h-6 animate-phone-shake" />

          {/* Hover Label */}
          <span className="absolute right-full mr-3 bg-white text-gray-900 font-bold text-xs py-1.5 px-3 rounded-full shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
            Gọi Hotline: 0938.591.207
          </span>
        </a>

        {/* Zalo Button */}
        <a
          href="https://zalo.me/0938591207"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-xl hover:scale-105 transition-all group"
          title="Chat Zalo Báo Giá"
        >
          {/* Waves */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-500 animate-pulse-ring pointer-events-none"></div>
          <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-pulse-wave pointer-events-none"></div>

          <span className="font-black text-sm tracking-tighter">Zalo</span>

          {/* Hover Label */}
          <span className="absolute right-full mr-3 bg-white text-gray-900 font-bold text-xs py-1.5 px-3 rounded-full shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
            Chat Zalo Báo Giá
          </span>
        </a>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 w-11 h-11 rounded-full bg-[#2b3445] hover:bg-[#fc9631] text-white flex items-center justify-center shadow-lg transition-all z-40 cursor-pointer hover:scale-110"
          aria-label="Lên đầu trang"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};
