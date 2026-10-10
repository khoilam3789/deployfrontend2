import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Phone, MessageSquare, Flame, Layers, Filter } from 'lucide-react';
import type { Post } from '../types';

export const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setPosts(data.data);
        }
      })
      .catch((err) => console.error('Lỗi tải bài viết:', err))
      .finally(() => setLoading(false));
  }, []);

  const getDdMm = (dateStr?: string) => {
    if (!dateStr) return '18/07';
    const parts = dateStr.split('/');
    if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
    return dateStr.slice(0, 5);
  };

  const categories = [
    { id: 'all', label: 'Tất cả bài viết' },
    { id: 'Quy mô xưởng & Năng lực', label: 'Quy mô xưởng & Năng lực' },
    { id: 'Kiến thức vải thun', label: 'Kiến thức vải thun' },
    { id: 'So sánh & Bảng màu', label: 'So sánh & Bảng màu' },
    { id: 'Cung ứng & Giao hàng', label: 'Cung ứng & Giao hàng' }
  ];

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const filteredPosts = posts.slice(1).filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb Header */}
      <div className="bg-[#181e26] py-12 text-white border-b-2 border-[#F58634] relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
          <div>
            <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-wide text-white">
              Tin Tức Vải Thun
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1.5">
              Cập nhật thông tin vải, quy mô xưởng dệt, đặc tính chất liệu và xu hướng may mặc
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Link to="/" className="hover:text-[#F58634] transition">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[#F58634] font-semibold">Tin tức vải thun</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 py-10">
        {/* Category Filter Tabs (Song King Style) */}
        <div className="flex flex-wrap items-center gap-2.5 pb-6 mb-8 border-b border-gray-200">
          <span className="text-xs font-black uppercase text-gray-500 flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-[#F58634]" />
            Chuyên mục:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#F58634] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-24 text-center text-gray-500 text-sm">
            Đang tải dữ liệu bài viết...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Area (8 Cols) */}
            <div className="lg:col-span-8">
              {/* TOP FEATURED POST BANNER (Song King style) */}
              {featuredPost && selectedCategory === 'all' && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition mb-10 group">
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-7 h-72 sm:h-80 md:h-auto overflow-hidden bg-slate-900 relative">
                      <Link to={`/tin-tuc/${featuredPost.slug}`} className="block w-full h-full">
                        <img
                          src={featuredPost.thumbnail || '/images/factory/day-chuyen-may-det-cong-nghe-cao.jpg'}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                      <span className="absolute top-4 left-4 bg-[#F58634] text-white text-[11px] font-black uppercase px-3 py-1 rounded shadow-md tracking-wider">
                        ★ BÀI VIẾT NỔI BẬT
                      </span>
                    </div>

                    <div className="md:col-span-5 p-6 sm:p-7 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-amber-100 border border-amber-300 text-amber-900 text-sm font-black px-3 py-1 rounded">
                            {getDdMm(featuredPost.date)}
                          </span>
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2.5 py-1 rounded">
                            {featuredPost.category || 'Quy mô xưởng'}
                          </span>
                        </div>

                        <h2 className="text-base sm:text-lg font-black text-gray-900 group-hover:text-[#F58634] transition leading-snug mb-3">
                          <Link to={`/tin-tuc/${featuredPost.slug}`}>{featuredPost.title}</Link>
                        </h2>

                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
                          {featuredPost.summary}
                        </p>
                      </div>

                      <div>
                        <Link
                          to={`/tin-tuc/${featuredPost.slug}`}
                          className="inline-flex items-center gap-2 bg-[#F58634] hover:bg-[#d97022] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition"
                        >
                          <span>Đọc thêm</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* POSTS GRID (2 COLUMNS SONG KING STYLE) */}
              <div className="mb-4">
                <h3 className="text-base font-black text-gray-900 uppercase tracking-wide border-l-4 border-[#F58634] pl-3 mb-6">
                  {selectedCategory === 'all' ? 'Bài Viết Mới Cập Nhật' : `Chuyên mục: ${selectedCategory}`}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredPosts.map((post) => {
                  const img = post.thumbnail || '/images/products/localbrand.jpg';
                  return (
                    <article
                      key={post.slug}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col sm:flex-row group"
                    >
                      {/* Left Thumbnail */}
                      <Link
                        to={`/tin-tuc/${post.slug}`}
                        className="w-full sm:w-44 h-44 sm:h-auto shrink-0 overflow-hidden bg-gray-100 block relative"
                      >
                        <img
                          src={img}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/products/localbrand.jpg';
                          }}
                        />
                      </Link>

                      {/* Right Body */}
                      <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-black px-2 py-0.5 rounded">
                              {getDdMm(post.date)}
                            </span>
                            <span className="text-[10.5px] font-bold text-gray-400 uppercase truncate">
                              {post.category || 'Kiến thức'}
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#F58634] transition leading-snug line-clamp-2 mb-2">
                            <Link to={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                          </h4>

                          <p className="text-[11.5px] text-gray-500 leading-relaxed line-clamp-2 mb-3">
                            {post.summary}
                          </p>
                        </div>

                        <div>
                          <Link
                            to={`/tin-tuc/${post.slug}`}
                            className="text-xs font-bold text-[#F58634] hover:underline inline-flex items-center gap-1"
                          >
                            <span>Đọc thêm</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Box 1: Recent Posts */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs">
                <h3 className="text-xs font-black uppercase text-gray-900 border-b-2 border-[#F58634] pb-2.5 mb-4 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#F58634]" />
                  Bài Viết Đọc Nhiều
                </h3>
                <div className="space-y-3.5 divide-y divide-gray-100">
                  {posts.slice(0, 5).map((p) => (
                    <div key={p.slug} className="pt-3 first:pt-0 flex items-center gap-3">
                      <Link
                        to={`/tin-tuc/${p.slug}`}
                        className="w-16 h-13 shrink-0 rounded-md overflow-hidden bg-gray-100 block"
                      >
                        <img
                          src={p.thumbnail || '/images/products/localbrand.jpg'}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-gray-800 hover:text-[#F58634] line-clamp-2 leading-snug">
                          <Link to={`/tin-tuc/${p.slug}`}>{p.title}</Link>
                        </h4>
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          {p.date || '15/08/2026'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 2: Consultation CTA */}
              <div className="bg-gradient-to-br from-[#181e26] to-[#0f172a] rounded-xl p-6 text-white text-center shadow-md">
                <span className="bg-[#F58634] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block mb-3">
                  Tư Vấn Nguồn Hàng
                </span>
                <h4 className="text-base font-black text-white mb-2">
                  Cần Tìm Mẫu Vải Cho Xưởng May?
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-5">
                  Gửi mẫu vải hoặc nhận bảng màu thực tế tận nơi hoàn toàn miễn phí từ kho xưởng Tiến Phát Đạt!
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:0938591207"
                    className="flex items-center justify-center gap-2 bg-[#e11d48] hover:bg-[#be123c] text-white text-xs font-bold py-2.5 rounded-lg transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Hotline: 0938.591.207</span>
                  </a>
                  <a
                    href="https://zalo.me/0938591207"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#0084ff] hover:bg-[#0070d6] text-white text-xs font-bold py-2.5 rounded-lg transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat Zalo Báo Giá</span>
                  </a>
                </div>
              </div>

              {/* Box 3: Categories Quick Nav */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs">
                <h3 className="text-xs font-black uppercase text-gray-900 border-b-2 border-[#F58634] pb-2.5 mb-3.5 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#F58634]" />
                  Danh Mục Vải Sản Xuất
                </h3>
                <ul className="text-xs divide-y divide-gray-100">
                  <li className="py-2.5">
                    <Link to="/san-pham" className="text-gray-700 hover:text-[#F58634] font-semibold block">
                      • Vải Thun Cotton & Tici 2C / 4C
                    </Link>
                  </li>
                  <li className="py-2.5">
                    <Link to="/san-pham" className="text-gray-700 hover:text-[#F58634] font-semibold block">
                      • Vải Thun Cá Sấu (Polo, CVC, Poly)
                    </Link>
                  </li>
                  <li className="py-2.5">
                    <Link to="/san-pham" className="text-gray-700 hover:text-[#F58634] font-semibold block">
                      • Vải Thun Lạnh & Thể Thao Interlock
                    </Link>
                  </li>
                  <li className="py-2.5">
                    <Link to="/san-pham" className="text-gray-700 hover:text-[#F58634] font-semibold block">
                      • Vải Thun Mè & Lưới Nhún Thoáng Khí
                    </Link>
                  </li>
                  <li className="py-2.5">
                    <Link to="/san-pham" className="text-gray-700 hover:text-[#F58634] font-semibold block">
                      • Vải Nỉ Bông & Da Cá Giữ Ấm
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostListPage;
