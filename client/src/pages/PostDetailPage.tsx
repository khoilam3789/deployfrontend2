import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, User, Phone, MessageSquare } from 'lucide-react';
import type { Post } from '../types';

export const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [otherPosts, setOtherPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setPost(data.data);
          setOtherPosts(data.data.otherPosts || []);
        } else {
          setPost(null);
        }
      })
      .catch((err) => console.error('Lỗi tải bài viết:', err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500 text-sm">
        Đang tải nội dung bài viết...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết này</h2>
        <Link to="/tin-tuc" className="bg-[#f49712] text-white font-bold text-xs uppercase px-6 py-3">
          Quay lại danh sách tin tức
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb Header */}
      <div className="bg-[#242b38] py-8 text-white">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="max-w-3xl">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-gray-300 mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#f49712]" />
                {post.date || '15/08/2024'}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#f49712]" />
                {post.author || 'Tiến Phát Đạt'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300 shrink-0">
            <Link to="/" className="hover:text-[#f49712] transition">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/tin-tuc" className="hover:text-[#f49712] transition">Tin tức</Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Content */}
          <article className="lg:col-span-8">
            {/* HTML Content */}
            <div 
              className="prose prose-sm sm:prose max-w-none text-gray-700 leading-relaxed font-normal
                prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight
                prose-h2:text-xl prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2 prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
                prose-p:my-3 prose-p:text-justify
                prose-a:text-[#f49712] prose-a:font-semibold hover:prose-a:underline
                prose-img:rounded-none prose-img:shadow-sm prose-img:mx-auto prose-img:my-6
                prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content_html || '<p>Nội dung đang được cập nhật...</p>' }}
            />

            {/* Footer CTA of article */}
            <div className="mt-12 p-6 bg-orange-50 border-2 border-[#f49712]/30 text-gray-800">
              <h3 className="text-base font-black uppercase text-[#f49712] mb-2">
                Cửa Hàng Vải Thun Tiến Phát Đạt
              </h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Quý khách có nhu cầu nhập sỉ các dòng vải nêu trong bài viết hoặc cần cắt mẫu vải gửi tận nơi, vui lòng liên hệ ngay với chúng tôi:
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:0938591207"
                  className="bg-[#f49712] hover:bg-[#d8820a] text-white text-xs font-bold uppercase px-5 py-2.5 flex items-center gap-2 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Hotline: 0938.591.207
                </a>
                <a
                  href="https://zalo.me/0938591207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#0084ff] text-[#0084ff] hover:bg-[#0084ff] hover:text-white text-xs font-bold uppercase px-5 py-2.5 flex items-center gap-2 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Zalo 24/7
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Quick Contact Widget */}
            <div className="bg-[#242b38] text-white p-6">
              <h3 className="text-sm font-black uppercase tracking-wider mb-2 text-[#f49712]">
                Tư Vấn & Nhận Mẫu
              </h3>
              <p className="text-xs text-gray-300 mb-5 leading-relaxed">
                Nhận cắt mẫu vải miễn phí gửi về tận xưởng may của quý khách trên toàn quốc.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:0938591207"
                  className="w-full bg-[#f49712] hover:bg-[#d8820a] text-white text-xs font-bold uppercase py-3 flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4" />
                  0938.591.207
                </a>
                <a
                  href="https://zalo.me/0938591207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase py-3 flex items-center justify-center gap-2 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  Nhắn Tin Zalo
                </a>
              </div>
            </div>

            {/* Other Articles */}
            {otherPosts.length > 0 && (
              <div className="border border-gray-200 p-6">
                <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Bài Viết Khác
                </h3>
                <div className="space-y-4">
                  {otherPosts.map((op) => {
                    const img = op.thumbnail || (op.images && op.images[0]) || '/images/products/localbrand.jpg';
                    return (
                      <div key={op.slug} className="flex gap-3 group">
                        <Link to={`/tin-tuc/${op.slug}`} className="w-20 h-16 shrink-0 overflow-hidden bg-gray-100 block">
                          <img src={img} alt={op.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                        </Link>
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#f49712] transition line-clamp-2 leading-snug">
                            <Link to={`/tin-tuc/${op.slug}`}>{op.title}</Link>
                          </h4>
                          <span className="text-[10px] text-gray-400 mt-1 block">
                            {op.date || '15/08/2024'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
