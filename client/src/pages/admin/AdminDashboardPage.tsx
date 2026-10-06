import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, FileText, MessageSquare, Image, Plus, ArrowRight, Phone } from 'lucide-react';
import type { Quote } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const [productCount, setProductCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('tpd_admin_token');

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then((r) => r.json()),
      fetch('/api/posts').then((r) => r.json()),
      fetch('/api/admin/quotes', {
        headers: { Authorization: `Bearer ${token}` }
      }).then((r) => r.json())
    ])
      .then(([prodRes, postRes, quoteRes]) => {
        if (prodRes.success) setProductCount(prodRes.total || prodRes.data.length);
        if (postRes.success) setPostCount(postRes.total || postRes.data.length);
        if (quoteRes.success) setQuotes(quoteRes.data || []);
      })
      .catch((err) => console.error('Lỗi tải dữ liệu dashboard:', err))
      .finally(() => setLoading(false));
  }, [token]);

  const newQuotesCount = quotes.filter((q) => q.status !== 'closed').length;

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 border border-gray-200 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase">Sản phẩm vải thun</span>
            <div className="text-2xl font-black text-gray-900 mt-1">{productCount}</div>
            <Link to="/admin/products" className="text-[11px] font-bold text-[#f49712] hover:underline mt-1 inline-block">
              Quản lý danh sách &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-full bg-orange-50 text-[#f49712] flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-200 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase">Bài viết tin tức</span>
            <div className="text-2xl font-black text-gray-900 mt-1">{postCount}</div>
            <Link to="/admin/posts" className="text-[11px] font-bold text-[#f49712] hover:underline mt-1 inline-block">
              Quản lý bài viết &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-200 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase">Yêu cầu báo giá</span>
            <div className="text-2xl font-black text-gray-900 mt-1">{quotes.length}</div>
            <span className="text-[11px] text-green-600 font-bold mt-1 inline-block">
              {newQuotesCount} yêu cầu cần tư vấn
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-200 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase">Slider trang chủ</span>
            <div className="text-2xl font-black text-gray-900 mt-1">3 Banner</div>
            <Link to="/admin/banners" className="text-[11px] font-bold text-[#f49712] hover:underline mt-1 inline-block">
              Tùy chỉnh slider &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
            <Image className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/admin/products"
          className="p-4 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-between transition shadow-xs"
        >
          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4" /> Thêm mẫu vải mới
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/admin/posts"
          className="p-4 bg-[#30373f] hover:bg-[#252c34] text-white flex items-center justify-between transition shadow-xs"
        >
          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4" /> Viết bài tin tức mới
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/admin/quotes"
          className="p-4 bg-gray-800 hover:bg-gray-900 text-white flex items-center justify-between transition shadow-xs"
        >
          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4" /> Xem danh sách khách gọi
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Recent Quotes Section */}
      <div className="bg-white border border-gray-200">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xs font-black uppercase tracking-wider text-gray-900">
            Yêu cầu báo giá mới từ khách hàng
          </h2>
          <Link to="/admin/quotes" className="text-xs text-[#f49712] font-bold hover:underline">
            Xem tất cả ({quotes.length})
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-gray-500">Đang tải dữ liệu...</div>
        ) : quotes.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500">Chưa có yêu cầu báo giá nào mới.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-[11px] uppercase text-gray-700 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Khách hàng</th>
                  <th className="py-3 px-4">Số điện thoại</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Mẫu vải quan tâm</th>
                  <th className="py-3 px-4">Ghi chú</th>
                  <th className="py-3 px-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.slice(0, 5).map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-gray-900">{q.name}</td>
                    <td className="py-3 px-4 font-bold text-[#f49712]">
                      <a href={`tel:${q.phone}`}>{q.phone}</a>
                    </td>
                    <td className="py-3 px-4">{q.email || '-'}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{q.product || 'Tư vấn chung'}</td>
                    <td className="py-3 px-4 line-clamp-1 max-w-xs">{q.note || '-'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-xs ${
                        q.status === 'contacted'
                          ? 'bg-blue-100 text-blue-700'
                          : q.status === 'closed'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {q.status === 'contacted' ? 'Đã liên hệ' : q.status === 'closed' ? 'Hoàn tất' : 'Mới'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
