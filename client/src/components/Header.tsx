import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone } from 'lucide-react';
import type { Product } from '../types';

interface HeaderProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({ products, onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      const q = searchTerm.toLowerCase();
      const matched = products.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 6);
      setSuggestions(matched);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="bg-white py-4 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center gap-4 md:gap-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <img 
            src="/images/logo/logo.png" 
            alt="Tiến Phát Đạt" 
            className="h-12 md:h-14 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120x60?text=TIEN+PHAT+DAT';
            }}
          />
          <div>
            <span className="text-xl md:text-2xl font-black text-[#fc9631] uppercase tracking-wide block leading-tight">
              Tiến Phát Đạt
            </span>
            <span className="text-[11px] md:text-xs text-gray-500 font-semibold tracking-wider uppercase block">
              Cửa Hàng Vải Thun Cao Cấp
            </span>
          </div>
        </a>

        {/* Live Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block" ref={searchRef}>
          <div className="flex items-center border-2 border-[#fc9631] rounded-full overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-[#fc9631]/40">
            <input 
              type="text" 
              placeholder="Tìm mẫu vải: cotton, cá sấu, tici, mè, thun lạnh..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 text-sm outline-none text-gray-800"
            />
            <button 
              type="button" 
              className="bg-[#fc9631] text-white px-5 py-2.5 flex items-center justify-center hover:bg-[#e57d19] transition"
              aria-label="Tìm kiếm"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Search Dropdown Suggestions */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-96 overflow-y-auto z-50">
              {suggestions.length > 0 ? (
                suggestions.map((p) => (
                  <div 
                    key={p.slug}
                    onClick={() => {
                      onSelectProduct(p);
                      setShowDropdown(false);
                      setSearchTerm('');
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-orange-50 cursor-pointer border-b border-gray-50 transition"
                  >
                    <img src={p.image} alt={p.title} className="w-12 h-12 rounded object-cover border border-gray-100" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{p.title}</h4>
                      <span className="text-xs text-[#fc9631] font-medium">{p.category} - {p.price}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  Không tìm thấy mẫu vải phù hợp với từ khóa
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hotline Callout Box */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-orange-100 text-[#fc9631] flex items-center justify-center shadow-xs">
            <Phone className="w-5 h-5 text-[#fc9631]" />
          </div>
          <div>
            <span className="text-xs text-gray-500 block uppercase font-medium">Tư Vấn & Gửi Mẫu</span>
            <a href="tel:0938591207" className="text-lg font-extrabold text-[#fc9631] tracking-wide block hover:underline">
              0938.591.207
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
