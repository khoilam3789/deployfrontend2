import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronRight, Search, Eye, Phone } from 'lucide-react';
import { QuickViewModal } from '../components/QuickViewModal';
import type { Product } from '../types';

const CATEGORIES = [
  { id: 'all', label: 'Tất Cả Sản Phẩm' },
  { id: 'cotton', label: 'Vải Cotton & Tici' },
  { id: 'ca-sau', label: 'Vải Cá Sấu Polo' },
  { id: 'the-thao', label: 'Thun Lạnh & Poly' },
  { id: 'me-luoi', label: 'Vải Mè & Lưới' },
  { id: 'ni-da-ca', label: 'Vải Nỉ & Da Cá' }
];

export const ProductListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const currentCat = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error('Lỗi tải sản phẩm:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryChange = (catId: string) => {
    const params = new URLSearchParams(searchParams);
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    setSearchParams(params);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  // Filter products
  const filtered = products.filter((p) => {
    // Category filter
    if (currentCat !== 'all') {
      if (p.categoryId === currentCat) {
        // match
      } else {
        const c = (p.category || '').toLowerCase();
        if (currentCat === 'cotton' && !(c.includes('cotton') || c.includes('tici'))) return false;
        if (currentCat === 'ca-sau' && !c.includes('cá sấu')) return false;
        if (currentCat === 'the-thao' && !(c.includes('lạnh') || c.includes('poly') || c.includes('thể thao'))) return false;
        if (currentCat === 'me-luoi' && !(c.includes('mè') || c.includes('lưới'))) return false;
        if (currentCat === 'ni-da-ca' && !(c.includes('nỉ') || c.includes('da cá'))) return false;
      }
    }
    // Search query filter
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const match =
        (p.title || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb Header */}
      <div className="bg-[#242b38] py-10 text-white">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-tight text-white">
              Sản Phẩm Vải Thun
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Khám phá trọn bộ 26 mẫu vải may mặc cao cấp xuất xưởng từ Tiến Phát Đạt
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Link to="/" className="hover:text-[#f49712] transition">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[#f49712] font-semibold">Sản phẩm</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 py-10">
        {/* Top Controls: Search and Filter Tabs */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-white p-4 border border-gray-200">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  currentCat === cat.id
                    ? 'bg-[#f49712] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Tìm kiếm mẫu vải..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="px-3 py-1.5 text-xs border border-gray-300 outline-none focus:border-[#f49712] w-full md:w-56"
            />
            <button
              type="submit"
              className="bg-[#30373f] hover:bg-[#f49712] text-white px-3 py-1.5 transition cursor-pointer flex items-center justify-center"
              aria-label="Tìm kiếm"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6 text-xs text-gray-600">
          <span>Hiển thị <strong>{filtered.length}</strong> mẫu vải thun</span>
          {currentSearch && (
            <button
              onClick={() => {
                setSearchInput('');
                const params = new URLSearchParams(searchParams);
                params.delete('search');
                setSearchParams(params);
              }}
              className="text-[#f49712] hover:underline"
            >
              Xóa bộ lọc tìm kiếm "{currentSearch}"
            </button>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-20 text-center text-gray-500 text-sm">
            Đang tải danh sách mẫu vải thun...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 bg-white border border-gray-200 text-center p-8">
            <p className="text-gray-600 text-sm mb-4">Không tìm thấy mẫu vải nào phù hợp với yêu cầu.</p>
            <button
              onClick={() => {
                setSearchParams({});
                setSearchInput('');
              }}
              className="bg-[#f49712] text-white text-xs font-bold uppercase px-5 py-2.5"
            >
              Xem tất cả mẫu vải
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p) => {
              const imgSrc = p.image || p.main_image || '/images/products/vải-cottton-2c.jpg';
              return (
                <div
                  key={p.slug}
                  className="bg-white rounded-none border border-gray-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-50 flex items-center justify-center">
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

                    {/* Action overlay */}
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                      <button
                        onClick={() => setQuickViewProduct(p)}
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

                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[11px] font-semibold text-[#f49712] uppercase tracking-wider mb-1 block">
                      {p.category}
                    </span>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-2 line-clamp-2 leading-snug group-hover:text-[#f49712] transition">
                      <Link to={`/san-pham/${p.slug}`}>{p.title}</Link>
                    </h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="font-extrabold text-[#f49712] text-xs">
                        {p.price}
                      </span>
                      <Link
                        to={`/san-pham/${p.slug}`}
                        className="bg-orange-50 hover:bg-[#f49712] text-[#f49712] hover:text-white text-[11px] font-bold px-3 py-1 transition"
                      >
                        Chi Tiết &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
