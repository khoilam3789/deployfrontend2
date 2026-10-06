import React, { useState, useEffect } from 'react';
import { Phone, Trash2, CheckCircle2, X } from 'lucide-react';
import type { Quote } from '../../types';

export const AdminQuotesPage: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const token = localStorage.getItem('tpd_admin_token');

  const fetchQuotes = () => {
    setLoading(true);
    fetch('/api/admin/quotes', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setQuotes(d.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/quotes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: 'Đã cập nhật trạng thái!' });
        fetchQuotes();
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Lỗi cập nhật trạng thái' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa yêu cầu này?')) return;
    try {
      const res = await fetch(`/api/admin/quotes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: 'Đã xóa yêu cầu!' });
        fetchQuotes();
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Lỗi xóa yêu cầu' });
    }
  };

  const filtered = quotes.filter((q) => {
    if (filterStatus === 'all') return true;
    return (q.status || 'new') === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black uppercase tracking-wider text-gray-900">
            Quản Lý Yêu Cầu Báo Giá & Khách Hàng
          </h2>
          <p className="text-xs text-gray-500">
            Khách hàng điền biểu mẫu liên hệ hoặc yêu cầu gửi mẫu vải
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-white p-1 border border-gray-200">
          {['all', 'new', 'contacted', 'closed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 text-xs font-bold uppercase transition cursor-pointer ${
                filterStatus === st ? 'bg-[#f49712] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {st === 'all' ? 'Tất cả' : st === 'new' ? 'Chưa gọi' : st === 'contacted' ? 'Đã gọi' : 'Hoàn tất'}
            </button>
          ))}
        </div>
      </div>

      {statusMsg && (
        <div className="p-3 text-xs bg-green-50 text-green-700 border border-green-200 rounded flex justify-between items-center">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {statusMsg.text}
          </span>
          <button onClick={() => setStatusMsg(null)}><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 overflow-x-auto">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-500">Đang tải yêu cầu...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-500">Không có yêu cầu báo giá nào trong mục này.</div>
        ) : (
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-[11px] uppercase text-gray-700 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-4">Khách hàng</th>
                <th className="py-3 px-4">Số điện thoại</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Mẫu vải cần báo</th>
                <th className="py-3 px-4">Nội dung ghi chú</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-400 whitespace-nowrap">
                    {q.createdAt ? new Date(q.createdAt).toLocaleString('vi-VN') : '-'}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900">{q.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <a href={`tel:${q.phone}`} className="font-bold text-[#f49712] hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {q.phone}
                      </a>
                      <a
                        href={`https://zalo.me/${q.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-bold bg-blue-50 text-[#0084ff] px-1.5 py-0.5 rounded hover:bg-blue-100"
                      >
                        Zalo
                      </a>
                    </div>
                  </td>
                  <td className="py-3 px-4">{q.email || '-'}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{q.product || 'Tư vấn chung'}</td>
                  <td className="py-3 px-4 max-w-xs">{q.note || '-'}</td>
                  <td className="py-3 px-4">
                    <select
                      value={q.status || 'new'}
                      onChange={(e) => handleUpdateStatus(q.id, e.target.value)}
                      className={`text-[11px] font-bold uppercase px-2 py-1 border outline-none cursor-pointer ${
                        q.status === 'contacted'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : q.status === 'closed'
                          ? 'bg-gray-100 text-gray-600 border-gray-200'
                          : 'bg-green-50 text-green-700 border-green-200'
                      }`}
                    >
                      <option value="new">Mới (Chưa gọi)</option>
                      <option value="contacted">Đã liên hệ</option>
                      <option value="closed">Đã hoàn tất</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition cursor-pointer"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
