import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import type { Post } from '../types';

interface NewsSectionProps {
  posts: Post[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ posts }) => {
  return (
    <section id="news" className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-wide mb-2">
            Cẩm Nang & Kinh Nghiệm Dệt May
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Chia sẻ kiến thức chuyên sâu về chất liệu vải thun, kỹ thuật chọn vải và mẹo bảo quản đồ may
          </p>
          <div className="w-16 h-1 bg-[#fc9631] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, idx) => {
            const img = post.images && post.images.length > 0 ? post.images[0] : '/images/banners/1-1.png';
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                <div className="h-44 overflow-hidden bg-gray-100 relative">
                  <img
                    src={img}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/banners/1-1.png';
                    }}
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#fc9631]" />
                    <span>Tin Tức Tiến Phát Đạt</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base mb-2 line-clamp-2 group-hover:text-[#fc9631] transition">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">
                    {post.summary}
                  </p>
                  <a
                    href="#quote-section"
                    className="mt-auto text-xs font-bold text-[#fc9631] hover:text-[#e57d19] inline-flex items-center gap-1 transition group-hover:gap-2"
                  >
                    Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
