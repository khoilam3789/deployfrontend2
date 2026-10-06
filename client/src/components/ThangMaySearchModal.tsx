import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';

interface ThangMaySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct?: (product: Product) => void;
}

export const ThangMaySearchModal: React.FC<ThangMaySearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const matched = query.trim().length >= 2
    ? products.filter(p => 
        (p.title || '').toLowerCase().includes(query.toLowerCase()) ||
        (p.category || '').toLowerCase().includes(query.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleItemClick = (p: Product) => {
    onClose();
    if (onSelectProduct) {
      onSelectProduct(p);
    }
    navigate(`/san-pham/${p.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white rounded-none max-w-2xl w-full p-6 relative shadow-2xl animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black p-1 cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-4">
          Tìm kiếm mẫu vải thun
        </h3>

        <div className="flex items-center border-b-2 border-[#f49712] pb-2 mb-4">
          <input
            type="text"
            autoFocus
            placeholder="Nhập tên loại vải (ví dụ: Cotton, Cá sấu, Thun lạnh, Mè, Nỉ...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm outline-none text-gray-800"
          />
          <Search className="w-5 h-5 text-[#f49712]" />
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto space-y-2">
          {query.trim().length >= 2 ? (
            matched.length > 0 ? (
              matched.map(p => {
                const img = p.image || p.main_image || '/images/products/vải-cottton-2c.jpg';
                return (
                  <div
                    key={p.slug}
                    onClick={() => handleItemClick(p)}
                    className="flex items-center gap-3 p-2.5 hover:bg-orange-50 cursor-pointer border-b border-gray-100 transition"
                  >
                    <img src={img} alt={p.title} className="w-12 h-12 object-cover shrink-0 border border-gray-200" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 hover:text-[#f49712] transition">{p.title}</h4>
                      <span className="text-[11px] text-[#f49712] font-semibold">{p.category} - {p.price}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-gray-500 py-6 text-center">Không tìm thấy mẫu vải nào phù hợp với từ khóa "{query}"</p>
            )
          ) : (
            <p className="text-xs text-gray-400 py-6 text-center">Nhập ít nhất 2 ký tự để tìm kiếm 26 mẫu vải thun</p>
          )}
        </div>
      </div>
    </div>
  );
};
