import React, { useState, useEffect } from 'react';
import { Plus, X, Upload, CheckCircle2 } from 'lucide-react';
import type { Banner } from '../../types';

export const AdminBannersPage: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    image: '/images/banners/www.reallygreatsite.com_.png',
    btnText: 'Xem Sản Phẩm',
    btnLink: '/san-pham'
  });

  const token = localStorage.getItem('tpd_admin_token');

  const fetchBanners = () => {
    setLoading(true);
    fetch('/api/banners')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setBanners(d.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const openAddModal = () => {
    setEditingBanner(null);
    setFormData({
      title: 'Tiêu đề banner\nmới ở đây',
      desc: 'Mô tả ngắn hiển thị bên dưới tiêu đề slider...',
      image: '/images/banners/www.reallygreatsite.com_.png',
      btnText: 'Xem Sản Phẩm',
      btnLink: '/san-pham'
    });
    setModalOpen(true);
  };

  const openEditModal = (b: Banner) => {
    setEditingBanner(b);
    setFormData({
      title: b.title,
      desc: b.desc,
      image: b.image,
      btnText: b.btnText,
      btnLink: b.btnLink
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const fd = new FormData();
    fd.append('image', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        setStatusMsg({ type: 'success', text: 'Tải ảnh banner thành công!' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Lỗi tải ảnh' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingBanner
        ? `/api/admin/banners/${editingBanner.id}`
        : '/api/admin/banners';
      const method = editingBanner ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: data.message });
        setModalOpen(false);
        fetchBanners();
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Lỗi kết nối máy chủ' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa banner này?')) return;
    try {
      const res = await fetch(`/api/admin/banners/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: 'Đã xóa banner!' });
        fetchBanners();
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Lỗi kết nối máy chủ' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black uppercase tracking-wider text-gray-900">
            Quản Lý Slider Banner Trang Chủ
          </h2>
          <p className="text-xs text-gray-500">
            Các slide hiển thị luân phiên ở đầu trang chủ (6 giây/slide)
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#f49712] hover:bg-[#d8820a] text-white text-xs font-bold uppercase px-4 py-2.5 flex items-center gap-2 transition cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm slide mới</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3 text-xs bg-green-50 text-green-700 border border-green-200 rounded flex justify-between items-center">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {statusMsg.text}
          </span>
          <button onClick={() => setStatusMsg(null)}><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      {/* Grid of Banners */}
      {loading ? (
        <div className="bg-white p-12 text-center text-xs text-gray-500 border border-gray-200">
          Đang tải banner slider...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((b, idx) => (
          <div key={b.id || idx} className="bg-white border border-gray-200 overflow-hidden shadow-xs flex flex-col">
            <div className="h-44 relative bg-gray-900">
              <img src={b.image} alt="Banner" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5">
                Slide #{idx + 1}
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1 whitespace-pre-line leading-tight">
                  {b.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{b.desc}</p>
                <div className="text-[11px] text-gray-600 bg-gray-50 p-2 mb-3">
                  Nút bấm: <strong>{b.btnText}</strong> &rarr; <span className="font-mono text-gray-400">{b.btnLink}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  onClick={() => openEditModal(b)}
                  className="px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 font-bold uppercase transition cursor-pointer"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 font-bold uppercase transition cursor-pointer"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full p-6 relative shadow-2xl">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-black uppercase text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {editingBanner ? 'Sửa Slide Banner' : 'Thêm Slide Banner Mới'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tiêu đề (Enter để xuống dòng)</label>
                <textarea
                  rows={2}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mô tả phụ</label>
                <textarea
                  rows={2}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Ảnh banner nền</label>
                <div className="flex items-center gap-3">
                  <img src={formData.image} alt="Preview" className="w-16 h-12 object-cover border border-gray-200" />
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 outline-none"
                    />
                    <label className="inline-flex items-center gap-1.5 text-xs text-[#f49712] font-bold cursor-pointer hover:underline">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Đang tải lên...' : 'Tải ảnh từ máy'}</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Chữ trên nút</label>
                  <input
                    type="text"
                    value={formData.btnText}
                    onChange={(e) => setFormData({ ...formData, btnText: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Đường dẫn liên kết</label>
                  <input
                    type="text"
                    value={formData.btnLink}
                    onChange={(e) => setFormData({ ...formData, btnLink: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-bold uppercase text-gray-600">
                  Hủy
                </button>
                <button type="submit" className="bg-[#f49712] text-white text-xs font-bold uppercase px-6 py-2">
                  Lưu Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
