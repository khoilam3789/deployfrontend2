import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, FileText, Image, MessageSquare, Settings, LogOut, ArrowLeft } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminUser, setAdminUser] = useState<string>('Admin');

  useEffect(() => {
    const token = localStorage.getItem('tpd_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetch('/api/admin/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem('tpd_admin_token');
          navigate('/admin/login');
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data && data.admin) {
          setAdminUser(data.admin.username);
        }
      })
      .catch(() => {
        navigate('/admin/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('tpd_admin_token');
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', label: 'Tổng quan', icon: <LayoutDashboard className="w-4 h-4" /> },
    { path: '/admin/products', label: 'Quản lý Sản phẩm', icon: <ShoppingBag className="w-4 h-4" /> },
    { path: '/admin/posts', label: 'Quản lý Bài viết', icon: <FileText className="w-4 h-4" /> },
    { path: '/admin/banners', label: 'Quản lý Banner Slider', icon: <Image className="w-4 h-4" /> },
    { path: '/admin/quotes', label: 'Yêu cầu Báo giá', icon: <MessageSquare className="w-4 h-4" /> },
    { path: '/admin/settings', label: 'Cài đặt Website', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1f2630] text-gray-300 flex flex-col shrink-0">
        <div className="p-5 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-wider">
              Tiến Phát Đạt
            </h2>
            <span className="text-[10px] text-[#f49712] font-bold uppercase tracking-wider block mt-0.5">
              Hệ Thống Quản Trị
            </span>
          </div>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                  active
                    ? 'bg-[#f49712] text-white shadow-xs'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Sidebar */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white py-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Xem website ngoài</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 py-1.5 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          <h1 className="text-sm font-extrabold uppercase text-gray-800 tracking-wider">
            Bảng điều khiển quản trị
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">Xin chào,</span>
            <span className="text-xs font-bold bg-orange-100 text-[#f49712] px-2.5 py-1 uppercase">
              {adminUser}
            </span>
          </div>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
