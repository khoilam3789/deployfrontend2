import React from 'react';
import { Eye, Phone } from 'lucide-react';
import type { Product } from '../types';

interface ProductShowcaseProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onQuickView: (product: Product) => void;
}

const TABS = [
  { id: 'all', label: 'Tất Cả 26 Mẫu Vải' },
  { id: 'cotton', label: 'Vải Cotton & Tici' },
  { id: 'ca-sau', label: 'Vải Cá Sấu' },
  { id: 'the-thao', label: 'Thun Lạnh & Thể Thao' },
  { id: 'me-luoi', label: 'Vải Mè & Lưới' },
  { id: 'ni-da-ca', label: 'Vải Nỉ & Da Cá' }
];

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onQuickView
}) => {
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    const c = p.category.toLowerCase();
    if (selectedCategory === 'cotton') return c.includes('cotton') || c.includes('tici');
    if (selectedCategory === 'ca-sau') return c.includes('cá sấu');
    if (selectedCategory === 'the-thao') return c.includes('lạnh') || c.includes('poly') || c.includes('thể thao');
    if (selectedCategory === 'me-luoi') return c.includes('mè') || c.includes('lưới');
    if (selectedCategory === 'ni-da-ca') return c.includes('nỉ') || c.includes('da cá');
    return true;
  });

  return (
    <section id="products-showcase" className="py-16 bg-[#f8f9fa] border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3.5xl font-black text-gray-900 uppercase tracking-wide mb-2">
            Bộ Sưu Tập Mẫu Vải Thun Thực Tế
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Xem chi tiết từng thớ vải dệt, nhận báo giá xưởng trực tiếp và yêu cầu gửi mẫu tận nơi
          </p>
          <div className="w-16 h-1 bg-[#fc9631] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center items-center gap-2 md:gap-3 flex-wrap mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#fc9631] text-white shadow-md shadow-orange-500/30 -translate-y-0.5'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#fc9631] hover:text-[#fc9631]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.slug}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-[#fc9631] transition-all duration-300 flex flex-col group"
            >
              {/* Product Thumbnail */}
              <div className="relative h-60 overflow-hidden bg-gray-50 flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#fc9631] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-xs">
                  {p.category.split(' ').pop()}
                </span>

                {/* Hover Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => onQuickView(p)}
                    className="w-10 h-10 rounded-full bg-white hover:bg-[#fc9631] text-gray-900 hover:text-white flex items-center justify-center transition shadow-lg transform hover:scale-110 cursor-pointer"
                    title="Xem chi tiết mẫu vải"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <a
                    href="tel:0938591207"
                    className="w-10 h-10 rounded-full bg-white hover:bg-[#fc9631] text-gray-900 hover:text-white flex items-center justify-center transition shadow-lg transform hover:scale-110"
                    title="Gọi báo giá ngay"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col flex-1">
                <span className="text-xs font-semibold text-[#fc9631] uppercase tracking-wider mb-1 block">
                  {p.category}
                </span>
                <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 leading-snug group-hover:text-[#fc9631] transition">
                  <a href="#quickview" onClick={(e) => { e.preventDefault(); onQuickView(p); }}>
                    {p.title}
                  </a>
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                  {p.description}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="font-extrabold text-[#fc9631] text-sm">
                    {p.price}
                  </span>
                  <button
                    onClick={() => onQuickView(p)}
                    className="bg-orange-50 hover:bg-[#fc9631] text-[#fc9631] hover:text-white text-xs font-bold px-3 py-1.5 rounded transition cursor-pointer"
                  >
                    Xem Chi Tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
