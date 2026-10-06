import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onSelectCategory: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectCategory }) => {
  const [isStuck, setIsStuck] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 160) {
        setIsStuck(true);
      } else {
        setIsStuck(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (cat: string) => {
    onSelectCategory(cat);
    setProductDropdownOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById('products-showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`bg-[#2b3445] transition-all duration-300 z-40 ${isStuck ? 'fixed top-0 left-0 right-0 shadow-lg bg-[#2b3445]/95 backdrop-blur-md' : 'relative'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white p-3 lg:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center">
          <li>
            <a href="#home" className="text-white px-5 py-3.5 text-sm font-bold uppercase tracking-wider block hover:bg-[#fc9631] transition">
              Trang Chủ
            </a>
          </li>
          <li>
            <a href="#about" className="text-white px-5 py-3.5 text-sm font-bold uppercase tracking-wider block hover:bg-[#fc9631] transition">
              Giới Thiệu
            </a>
          </li>
          
          {/* Products Dropdown */}
          <li className="relative group">
            <a 
              href="#products-showcase" 
              className="text-white px-5 py-3.5 text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#fc9631] transition"
            >
              Sản Phẩm Vải Thun
              <ChevronDown className="w-4 h-4 transition group-hover:rotate-180" />
            </a>
            <div className="absolute top-full left-0 w-64 bg-white rounded-b-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 border-t-3 border-[#fc9631]">
              <button 
                onClick={() => handleCategoryClick('cotton')}
                className="w-full text-left px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#fc9631] hover:pl-7 transition-all border-b border-gray-100"
              >
                Vải Thun Cotton & Tici
              </button>
              <button 
                onClick={() => handleCategoryClick('ca-sau')}
                className="w-full text-left px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#fc9631] hover:pl-7 transition-all border-b border-gray-100"
              >
                Vải Cá Sấu Polo
              </button>
              <button 
                onClick={() => handleCategoryClick('the-thao')}
                className="w-full text-left px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#fc9631] hover:pl-7 transition-all border-b border-gray-100"
              >
                Thun Lạnh & Poly 2 Da
              </button>
              <button 
                onClick={() => handleCategoryClick('me-luoi')}
                className="w-full text-left px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#fc9631] hover:pl-7 transition-all border-b border-gray-100"
              >
                Vải Mè & Lưới Nhún
              </button>
              <button 
                onClick={() => handleCategoryClick('ni-da-ca')}
                className="w-full text-left px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#fc9631] hover:pl-7 transition-all border-b border-gray-100"
              >
                Vải Nỉ Bông & Da Cá
              </button>
              <button 
                onClick={() => handleCategoryClick('all')}
                className="w-full text-left px-5 py-2.5 text-sm font-bold text-[#fc9631] hover:bg-orange-100 transition-all"
              >
                Xem Toàn Bộ 26 Mẫu Vải &rarr;
              </button>
            </div>
          </li>

          <li>
            <a href="#news" className="text-white px-5 py-3.5 text-sm font-bold uppercase tracking-wider block hover:bg-[#fc9631] transition">
              Cẩm Nang Dệt May
            </a>
          </li>
          <li>
            <a href="#quote-section" className="text-white px-5 py-3.5 text-sm font-bold uppercase tracking-wider block hover:bg-[#fc9631] transition">
              Liên Hệ & Báo Giá
            </a>
          </li>
        </ul>

        {/* CTA Quote Button */}
        <div>
          <a 
            href="https://zalo.me/0938591207" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-shimmer inline-flex items-center gap-2 bg-[#fc9631] hover:bg-[#e57d19] text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-wider transition shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            Nhận Báo Giá Zalo
          </a>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#242b38] border-t border-white/10 px-4 py-3 space-y-1">
          <a 
            href="#home" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white py-2 text-sm font-semibold border-b border-white/5"
          >
            Trang Chủ
          </a>
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white py-2 text-sm font-semibold border-b border-white/5"
          >
            Giới Thiệu
          </a>
          <div>
            <button 
              onClick={() => setProductDropdownOpen(!productDropdownOpen)}
              className="w-full flex justify-between items-center text-white py-2 text-sm font-semibold border-b border-white/5"
            >
              <span>Sản Phẩm Vải Thun</span>
              <ChevronDown className={`w-4 h-4 transition ${productDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {productDropdownOpen && (
              <div className="pl-4 py-1 space-y-1 bg-black/20 rounded mt-1">
                <button onClick={() => handleCategoryClick('cotton')} className="block text-gray-300 py-1.5 text-xs text-left w-full hover:text-[#fc9631]">Vải Thun Cotton & Tici</button>
                <button onClick={() => handleCategoryClick('ca-sau')} className="block text-gray-300 py-1.5 text-xs text-left w-full hover:text-[#fc9631]">Vải Cá Sấu Polo</button>
                <button onClick={() => handleCategoryClick('the-thao')} className="block text-gray-300 py-1.5 text-xs text-left w-full hover:text-[#fc9631]">Thun Lạnh & Poly 2 Da</button>
                <button onClick={() => handleCategoryClick('me-luoi')} className="block text-gray-300 py-1.5 text-xs text-left w-full hover:text-[#fc9631]">Vải Mè & Lưới Nhún</button>
                <button onClick={() => handleCategoryClick('ni-da-ca')} className="block text-gray-300 py-1.5 text-xs text-left w-full hover:text-[#fc9631]">Vải Nỉ Bông & Da Cá</button>
                <button onClick={() => handleCategoryClick('all')} className="block text-[#fc9631] py-1.5 text-xs font-bold text-left w-full">Xem Tất Cả 26 Mẫu Vải</button>
              </div>
            )}
          </div>
          <a 
            href="#news" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white py-2 text-sm font-semibold border-b border-white/5"
          >
            Cẩm Nang Dệt May
          </a>
          <a 
            href="#quote-section" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white py-2 text-sm font-semibold"
          >
            Liên Hệ & Báo Giá
          </a>
        </div>
      )}
    </nav>
  );
};
