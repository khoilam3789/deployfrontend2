import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Post } from '../../types';

export const AdminPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    thumbnail: '/images/products/localbrand.jpg',
    summary: '',
    content_html: '',
    author: 'Tiến Phát Đạt'
  });

  const token = localStorage.getItem('tpd_admin_token');

  const fetchPosts = () => {
    setLoading(true);
    fetch('/api/posts')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setPosts(d.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openAddModal = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      thumbnail: '/images/products/localbrand.jpg',
      summary: '',
      content_html: '<p>Nội dung bài viết kiến thức vải thun...</p>',
      author: 'Tiến Phát Đạt'
    });
    setModalOpen(true);
  };

  const openEditModal = (p: Post) => {
    setEditingPost(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      thumbnail: p.thumbnail || (p.images && p.images[0]) || '/images/products/localbrand.jpg',
      summary: p.summary,
      content_html: p.content_html || '',
      author: p.author || 'Tiến Phát Đạt'
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
        setFormData((prev) => ({ ...prev, thumbnail: data.url }));
        setStatusMsg({ type: 'success', text: 'Tải ảnh đại diện thành công!' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Lỗi tải ảnh' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      const url = editingPost
        ? `/api/admin/posts/${editingPost.id}`
        : '/api/admin/posts';
      const method = editingPost ? 'PUT' : 'POST';

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
        fetchPosts();
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Lỗi lưu bài viết' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Lỗi kết nối máy chủ' });
    }
  };

  const handleDelete = async (id: number | undefined, title: string) => {
    if (!id || !window.confirm(`Bạn có chắc muốn xóa bài viết "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: 'Đã xóa bài viết thành công!' });
        fetchPosts();
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Lỗi xóa bài viết' });
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
            Quản Lý Bài Viết & Kiến Thức
          </h2>
          <p className="text-xs text-gray-500">
            Tổng cộng: {posts.length} bài viết đã xuất bản
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#f49712] hover:bg-[#d8820a] text-white text-xs font-bold uppercase px-4 py-2.5 flex items-center gap-2 transition cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm bài viết mới</span>
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
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {statusMsg.text}
          </span>
          <button onClick={() => setStatusMsg(null)} className="cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 overflow-x-auto">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-500">Đang tải bài viết...</div>
        ) : (
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-[11px] uppercase text-gray-700 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 w-16">Ảnh</th>
                <th className="py-3 px-4">Tiêu đề bài viết</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Tác giả</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => {
                const img = post.thumbnail || (post.images && post.images[0]) || '/images/products/localbrand.jpg';
                return (
                  <tr key={post.id || post.slug} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4">
                      <img src={img} alt={post.title} className="w-12 h-12 object-cover border border-gray-200" />
                    </td>
                    <td className="py-2.5 px-4 font-bold text-gray-900 max-w-sm">
                      {post.title}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-gray-500 text-[11px]">
                      {post.slug}
                    </td>
                    <td className="py-2.5 px-4">{post.author || 'Tiến Phát Đạt'}</td>
                    <td className="py-2.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(post)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
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
          <div className="bg-white max-w-2xl w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {editingPost ? 'Chỉnh Sửa Bài Viết' : 'Soạn Thảo Bài Viết Mới'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Tiêu đề bài viết *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Tiêu đề..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Ảnh đại diện bài viết
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    className="w-16 h-16 object-cover border border-gray-200"
                  />
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                      placeholder="/images/products/..."
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

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Đoạn trích tóm tắt
                </label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Tóm tắt ngắn hiển thị ở trang danh sách tin..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Nội dung chi tiết (HTML / Văn bản)
                </label>
                <textarea
                  rows={8}
                  value={formData.content_html}
                  onChange={(e) => setFormData({ ...formData, content_html: e.target.value })}
                  placeholder="<p>Nội dung bài viết...</p>"
                  className="w-full font-mono px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
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
                  {editingPost ? 'Cập Nhật' : 'Xuất Bản'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
