import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ThangMayHeaderProps {
  onSelectCategory?: (catId: string) => void;
  onOpenSearch: () => void;
}

export const ThangMayHeader: React.FC<ThangMayHeaderProps> = ({ onSelectCategory, onOpenSearch }) => {
  const [isStuck, setIsStuck] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsStuck(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (catId: string) => {
    setMobileOpen(false);
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    navigate(`/san-pham?category=${catId}`);
  };

  return (
    <header className={`bg-white transition-all duration-300 z-40 border-b border-gray-100 ${
      isStuck ? 'fixed top-0 left-0 right-0 shadow-md h-[72px]' : 'relative h-[82px]'
    }`}>
      <div className="max-w-[1240px] mx-auto px-4 h-full flex justify-between items-center">
        {/* Logo left */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo/logo.png"
            alt="Tiến Phát Đạt Logo"
            className="h-12 md:h-14 w-auto object-contain"
          />
          <div className="hidden sm:block">
            <span className="text-xl font-extrabold text-[#f49712] uppercase tracking-wide block leading-none">
              Tiến Phát Đạt
            </span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mt-0.5">
              Cửa Hàng Vải Thun Cao Cấp
            </span>
          </div>
        </Link>

        {/* Desktop Menu right on the same line matching thangmay1 */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            to="/"
            className="text-gray-800 hover:text-[#f49712] px-3.5 py-2 text-[13.5px] font-bold uppercase tracking-wider transition"
          >
            Trang chủ
          </Link>
          <Link
            to="/gioi-thieu"
            className="text-gray-800 hover:text-[#f49712] px-3.5 py-2 text-[13.5px] font-bold uppercase tracking-wider transition"
          >
            Giới thiệu
          </Link>

          {/* Dropdown Products */}
          <div className="relative group">
            <Link
              to="/san-pham"
              className="text-gray-800 group-hover:text-[#f49712] px-3.5 py-2 text-[13.5px] font-bold uppercase tracking-wider flex items-center gap-1 transition"
            >
              Sản phẩm
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#f49712] transition-transform group-hover:rotate-180" />
            </Link>
            <div className="absolute top-full left-0 w-64 bg-white rounded-b-md shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-t-2 border-[#f49712]">
              <button
                onClick={() => handleCategoryClick('cotton')}
                className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-orange-50 hover:text-[#f49712] hover:pl-6 transition-all border-b border-gray-50 cursor-pointer"
              >
                Vải Thun Cotton & Tici
              </button>
              <button
                onClick={() => handleCategoryClick('ca-sau')}
                className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-orange-50 hover:text-[#f49712] hover:pl-6 transition-all border-b border-gray-50 cursor-pointer"
              >
                Vải Thun Cá Sấu
              </button>
              <button
                onClick={() => handleCategoryClick('the-thao')}
                className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-orange-50 hover:text-[#f49712] hover:pl-6 transition-all border-b border-gray-50 cursor-pointer"
              >
                Vải Thun Lạnh & Thể Thao
              </button>
              <button
                onClick={() => handleCategoryClick('me-luoi')}
                className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-orange-50 hover:text-[#f49712] hover:pl-6 transition-all border-b border-gray-50 cursor-pointer"
              >
                Vải Thun Mè & Lưới Nhún
              </button>
              <button
                onClick={() => handleCategoryClick('ni-da-ca')}
                className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-orange-50 hover:text-[#f49712] hover:pl-6 transition-all cursor-pointer"
              >
                Vải Nỉ Bông & Da Cá
              </button>
            </div>
          </div>

          <Link
            to="/san-pham"
            className="text-gray-800 hover:text-[#f49712] px-3.5 py-2 text-[13.5px] font-bold uppercase tracking-wider transition"
          >
            Bảng màu vải
          </Link>
          <Link
            to="/tin-tuc"
            className="text-gray-800 hover:text-[#f49712] px-3.5 py-2 text-[13.5px] font-bold uppercase tracking-wider transition"
          >
            Tin tức
          </Link>
          <Link
            to="/lien-he"
            className="text-gray-800 hover:text-[#f49712] px-3.5 py-2 text-[13.5px] font-bold uppercase tracking-wider transition"
          >
            Liên hệ
          </Link>

          {/* Search Trigger Icon */}
          <button
            onClick={onOpenSearch}
            className="text-gray-700 hover:text-[#f49712] p-2 ml-1 transition cursor-pointer"
            aria-label="Tìm kiếm vải thun"
          >
            <Search className="w-4 h-4" />
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenSearch}
            className="text-gray-700 p-2 cursor-pointer"
            aria-label="Tìm kiếm vải thun"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-800 p-2 cursor-pointer"
            aria-label="Mở menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl px-5 py-4 space-y-2">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-bold text-gray-800 border-b border-gray-100 uppercase">Trang chủ</Link>
          <Link to="/gioi-thieu" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-bold text-gray-800 border-b border-gray-100 uppercase">Giới thiệu</Link>
          <Link to="/san-pham" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-bold text-gray-800 border-b border-gray-100 uppercase">Tất cả sản phẩm</Link>
          <div className="pl-4 space-y-1.5 py-1 text-xs text-gray-600 border-b border-gray-100">
            <button onClick={() => handleCategoryClick('cotton')} className="block py-1 hover:text-[#f49712]">▪ Vải Cotton & Tici</button>
            <button onClick={() => handleCategoryClick('ca-sau')} className="block py-1 hover:text-[#f49712]">▪ Vải Cá Sấu Polo</button>
            <button onClick={() => handleCategoryClick('the-thao')} className="block py-1 hover:text-[#f49712]">▪ Thun Lạnh & Thể Thao</button>
            <button onClick={() => handleCategoryClick('me-luoi')} className="block py-1 hover:text-[#f49712]">▪ Vải Mè & Lưới</button>
            <button onClick={() => handleCategoryClick('ni-da-ca')} className="block py-1 hover:text-[#f49712]">▪ Vải Nỉ & Da Cá</button>
          </div>
          <Link to="/tin-tuc" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-bold text-gray-800 border-b border-gray-100 uppercase">Tin tức & Kinh nghiệm</Link>
          <Link to="/lien-he" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-bold text-gray-800 uppercase">Liên hệ & Báo giá</Link>
        </div>
      )}
    </header>
  );
};
