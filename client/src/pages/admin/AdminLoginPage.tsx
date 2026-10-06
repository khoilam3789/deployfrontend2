import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập tài khoản và mật khẩu!');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('tpd_admin_token', data.token);
        navigate('/admin');
      } else {
        setError(data.message || 'Tài khoản hoặc mật khẩu không chính xác!');
      }
    } catch {
      setError('Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c222b] flex items-center justify-center p-4">
      <div className="bg-white rounded-none max-w-md w-full p-8 shadow-2xl relative">
        <div className="text-center mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#f49712] block mb-1">
            TIẾN PHÁT ĐẠT
          </span>
          <h1 className="text-xl font-black uppercase text-gray-900 tracking-tight">
            Đăng Nhập Quản Trị
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Hệ thống quản lý sản phẩm, bài viết và báo giá khách hàng
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Tên tài khoản
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
                placeholder="admin"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
                placeholder="••••••••"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f49712] hover:bg-[#d8820a] text-white text-xs font-black uppercase py-3 tracking-wider transition cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP HỆ THỐNG'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
          <Link to="/" className="hover:text-[#f49712] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về trang chủ</span>
          </Link>
          <span className="text-[11px] text-gray-400">Tiến Phát Đạt © 2026</span>
        </div>
      </div>
    </div>
  );
};
