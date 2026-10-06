import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';
import type { Post } from '../types';

export const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb Header */}
      <div className="bg-[#242b38] py-10 text-white">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-tight text-white">
              Tin Tức & Kiến Thức Vải Thun
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Cập nhật kiến thức chuyên sâu về đặc tính vải, phân biệt chất liệu và xu hướng may mặc
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Link to="/" className="hover:text-[#f49712] transition">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[#f49712] font-semibold">Tin tức</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 py-12">
        {loading ? (
          <div className="py-20 text-center text-gray-500 text-sm">
            Đang tải danh sách bài viết...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => {
              const img = post.thumbnail || (post.images && post.images.length > 0 ? post.images[0] : '/images/products/localbrand.jpg');
              return (
                <article
                  key={post.slug}
                  className="bg-white border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col group"
                >
                  <Link to={`/tin-tuc/${post.slug}`} className="h-60 sm:h-72 overflow-hidden bg-gray-100 relative block">
                    <img
                      src={img}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/products/localbrand.jpg';
                      }}
                    />
                  </Link>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-[11px] text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#f49712]" />
                        {post.date || '15/08/2024'}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#f49712]" />
                        {post.author || 'Tiến Phát Đạt'}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-black text-gray-900 group-hover:text-[#f49712] transition leading-snug mb-3 line-clamp-2">
                      <Link to={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-xs text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {post.summary}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        to={`/tin-tuc/${post.slug}`}
                        className="text-xs font-bold text-[#f49712] hover:underline uppercase inline-flex items-center gap-1.5"
                      >
                        <span>Đọc tiếp</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
