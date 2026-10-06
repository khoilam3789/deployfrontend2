import React from 'react';
import { Eye, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ThangMayCatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  onQuickView: (product: Product) => void;
}

const TABS = [
  { id: 'all', label: 'Tất Cả 26 Mẫu Vải' },
  { id: 'cotton', label: 'Vải Thun Cotton & Tici' },
  { id: 'ca-sau', label: 'Vải Cá Sấu' },
  { id: 'the-thao', label: 'Thun Lạnh & Thể Thao' },
  { id: 'me-luoi', label: 'Vải Mè & Lưới' },
  { id: 'ni-da-ca', label: 'Vải Nỉ & Da Cá' }
];

export const ThangMayCatalog: React.FC<ThangMayCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onQuickView
}) => {
  const filtered = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (p.categoryId === selectedCategory) return true;
    const c = (p.category || '').toLowerCase();
    if (selectedCategory === 'cotton') return c.includes('cotton') || c.includes('tici');
    if (selectedCategory === 'ca-sau') return c.includes('cá sấu');
    if (selectedCategory === 'the-thao') return c.includes('lạnh') || c.includes('poly') || c.includes('thể thao');
    if (selectedCategory === 'me-luoi') return c.includes('mè') || c.includes('lưới');
    if (selectedCategory === 'ni-da-ca') return c.includes('nỉ') || c.includes('da cá');
    return true;
  });

  return (
    <section id="catalog-section" className="scroll-mt-20 py-16 bg-[#f7f7f7] border-b border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-[#f49712] font-extrabold block mb-1">
            DANH MỤC TRƯNG BÀY
          </span>
          <h2 className="text-2xl md:text-3.5xl font-black text-gray-900 uppercase tracking-tight mb-2">
            Danh Mục Sản Phẩm Vải Thun
          </h2>
          <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto">
            Trưng bày đầy đủ 26 mẫu vải thun chất lượng cao. Quý khách có thể xem chi tiết hoặc liên hệ nhận mẫu vải tận nơi miễn phí.
          </p>
          <div className="w-12 h-1 bg-[#f49712] mx-auto mt-3"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center items-center gap-2 flex-wrap mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={`px-4 py-2 rounded-xs text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#f49712] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#f49712] hover:text-[#f49712]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 26 Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((p) => {
            const imgSrc = p.image || p.main_image || '/images/products/vải-cottton-2c.jpg';
            return (
              <div
                key={p.slug}
                className="bg-white rounded-none border border-gray-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-52 sm:h-60 overflow-hidden bg-gray-50 flex items-center justify-center">
                  <Link to={`/san-pham/${p.slug}`} className="w-full h-full block">
                    <img
                      src={imgSrc}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      loading="lazy"
                    />
                  </Link>
                  <span className="absolute top-2.5 left-2.5 bg-[#f49712] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-xs">
                    {p.category.split(' ').pop()}
                  </span>

                  {/* Hover action overlay */}
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <button
                      onClick={() => onQuickView(p)}
                      className="w-9 h-9 rounded-full bg-white hover:bg-[#f49712] text-gray-900 hover:text-white flex items-center justify-center transition shadow cursor-pointer"
                      title="Xem nhanh"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a
                      href="tel:0938591207"
                      className="w-9 h-9 rounded-full bg-white hover:bg-[#f49712] text-gray-900 hover:text-white flex items-center justify-center transition shadow"
                      title="Gọi báo giá"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col flex-1">
                  <span className="text-[11px] font-semibold text-[#f49712] uppercase tracking-wider mb-1 block">
                    {p.category}
                  </span>
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1.5 line-clamp-2 leading-snug group-hover:text-[#f49712] transition">
                    <Link to={`/san-pham/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="text-[11px] text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-auto pt-2.5 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-extrabold text-[#f49712] text-xs">
                      {p.price}
                    </span>
                    <Link
                      to={`/san-pham/${p.slug}`}
                      className="bg-orange-50 hover:bg-[#f49712] text-[#f49712] hover:text-white text-[11px] font-bold px-2.5 py-1 transition cursor-pointer"
                    >
                      Chi Tiết &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
