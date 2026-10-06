import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Upload, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Product } from '../../types';

const CATEGORIES = [
  { id: 'cotton', name: 'Vải Thun Cotton & Tici' },
  { id: 'ca-sau', name: 'Vải Thun Cá Sấu' },
  { id: 'the-thao', name: 'Thun Lạnh & Thể Thao' },
  { id: 'me-luoi', name: 'Vải Mè & Lưới Nhún' },
  { id: 'ni-da-ca', name: 'Vải Nỉ & Da Cá' }
];

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    categoryId: 'cotton',
    category: 'Vải Thun Cotton & Tici',
    price: 'Liên hệ báo giá',
    main_image: '/images/products/vải-cottton-2c.jpg',
    description: ''
  });

  const token = localStorage.getItem('tpd_admin_token');

  const fetchProducts = () => {
    setLoading(true);
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProducts(d.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      slug: '',
      categoryId: 'cotton',
      category: 'Vải Thun Cotton & Tici',
      price: 'Liên hệ báo giá',
      main_image: '/images/products/vải-cottton-2c.jpg',
      description: 'Chuyên cung cấp sỉ và lẻ các loại vải thun chất lượng cao, độ co giãn và độ bền màu tốt, giá cả cạnh tranh tại xưởng.'
    });
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      categoryId: p.categoryId || 'cotton',
      category: p.category,
      price: p.price,
      main_image: p.main_image || p.image || '/images/products/vải-cottton-2c.jpg',
      description: p.description
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
        setFormData((prev) => ({ ...prev, main_image: data.url }));
        setStatusMsg({ type: 'success', text: 'Tải ảnh lên thành công!' });
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Lỗi tải ảnh' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Lỗi tải ảnh lên máy chủ' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const payload = {
      ...formData,
      category: CATEGORIES.find((c) => c.id === formData.categoryId)?.name || formData.category,
      gallery: [formData.main_image]
    };

    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: data.message });
        setModalOpen(false);
        fetchProducts();
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Lỗi lưu sản phẩm' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Lỗi kết nối máy chủ' });
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa sản phẩm "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: 'Đã xóa sản phẩm thành công!' });
        fetchProducts();
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Lỗi xóa sản phẩm' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Lỗi kết nối máy chủ' });
    }
  };

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black uppercase tracking-wider text-gray-900">
            Quản Lý Sản Phẩm Vải Thun
          </h2>
          <p className="text-xs text-gray-500">
            Tổng cộng: {products.length} mẫu vải thun đang trưng bày
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#f49712] hover:bg-[#d8820a] text-white text-xs font-bold uppercase px-4 py-2.5 flex items-center gap-2 transition cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm mẫu vải mới</span>
        </button>
      </div>

      {statusMsg && (
        <div
          className={`p-3 text-xs rounded flex items-center justify-between ${
            statusMsg.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          <span className="flex items-center gap-2">
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {statusMsg.text}
          </span>
          <button onClick={() => setStatusMsg(null)} className="cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Filter and Search */}
      <div className="bg-white p-4 border border-gray-200 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Tìm theo tên vải, danh mục..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
        </div>
        <span className="text-xs text-gray-500">
          Hiển thị: <strong>{filtered.length}</strong> / {products.length}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 overflow-x-auto">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-500">Đang tải sản phẩm...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-500">Không tìm thấy sản phẩm nào.</div>
        ) : (
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-[11px] uppercase text-gray-700 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 w-16">Ảnh</th>
                <th className="py-3 px-4">Tên sản phẩm</th>
                <th className="py-3 px-4">Danh mục</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Giá bán</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => {
                const img = p.image || p.main_image || '/images/products/vải-cottton-2c.jpg';
                return (
                  <tr key={p.id || p.slug} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4">
                      <img src={img} alt={p.title} className="w-12 h-12 object-cover border border-gray-200" />
                    </td>
                    <td className="py-2.5 px-4 font-bold text-gray-900">
                      {p.title}
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="bg-orange-50 text-[#f49712] font-semibold px-2 py-0.5 text-[10px] uppercase">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-gray-500 font-mono text-[11px]">
                      {p.slug}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-gray-900">
                      {p.price}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition cursor-pointer"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-xl w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {editingProduct ? 'Chỉnh Sửa Mẫu Vải' : 'Thêm Mẫu Vải Mới'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Tên mẫu vải *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Vải Thun Cotton 4 Chiều..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Danh mục phân loại *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712] bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Giá bán hiển thị
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Liên hệ báo giá"
                    className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Ảnh chính sản phẩm
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={formData.main_image}
                    alt="Preview"
                    className="w-16 h-16 object-cover border border-gray-200"
                  />
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={formData.main_image}
                      onChange={(e) => setFormData({ ...formData, main_image: e.target.value })}
                      placeholder="/images/products/..."
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 outline-none"
                    />
                    <label className="inline-flex items-center gap-1.5 text-xs text-[#f49712] font-bold cursor-pointer hover:underline">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Đang tải lên...' : 'Tải ảnh từ máy tính'}</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Mô tả & Ứng dụng vải
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Đặc tính, ứng dụng may mặc, định lượng..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 uppercase"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-[#f49712] hover:bg-[#d8820a] text-white text-xs font-bold uppercase px-6 py-2 transition cursor-pointer"
                >
                  {editingProduct ? 'Cập Nhật' : 'Thêm Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
