import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';

interface ThangMayNewsProps {
  posts: Post[];
}

export const ThangMayNews: React.FC<ThangMayNewsProps> = ({ posts }) => {
  return (
    <section id="news" className="py-16 bg-[#f7f7f7] border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Header matching thangmay1 */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-3">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#f49712] font-extrabold block mb-1">
              KIẾN THỨC VẢI THUN
            </span>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">
              Tin Tức & Kiến Thức Ngành Dệt May
            </h2>
          </div>
          <Link
            to="/tin-tuc"
            className="text-xs font-bold text-[#f49712] hover:underline flex items-center gap-1 uppercase"
          >
            xem tất cả <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 News Grid matching thangmay1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, idx) => {
            const img = post.thumbnail || (post.images && post.images.length > 0 ? post.images[0] : '/images/products/localbrand.jpg');
            return (
              <div
                key={idx}
                className="bg-white rounded-none border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col"
              >
                <Link to={`/tin-tuc/${post.slug}`} className="h-44 overflow-hidden bg-gray-100 relative block">
                  <img
                    src={img}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/products/localbrand.jpg';
                    }}
                  />
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-2 line-clamp-2 leading-snug group-hover:text-[#f49712] transition">
                    <Link to={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-[11px] text-gray-500 line-clamp-3 leading-relaxed mb-3">
                    {post.summary}
                  </p>
                  <Link
                    to={`/tin-tuc/${post.slug}`}
                    className="mt-auto text-[11px] font-bold text-[#f49712] hover:underline inline-flex items-center gap-1"
                  >
                    Xem chi tiết &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
