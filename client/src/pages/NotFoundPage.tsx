import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 text-center px-4 bg-white">
      <div className="max-w-md mx-auto">
        <span className="text-6xl font-black text-[#f49712] block mb-2">404</span>
        <h1 className="text-xl font-black uppercase text-gray-900 tracking-tight mb-3">
          Không Tìm Thấy Trang
        </h1>
        <p className="text-xs text-gray-500 mb-8 leading-relaxed">
          Đường dẫn quý khách truy cập không tồn tại hoặc đã được chuyển sang địa chỉ mới.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="bg-[#f49712] hover:bg-[#d8820a] text-white text-xs font-bold uppercase px-6 py-3 transition flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang Chủ</span>
          </Link>
          <Link
            to="/san-pham"
            className="border border-gray-300 text-gray-700 hover:border-[#f49712] hover:text-[#f49712] text-xs font-bold uppercase px-6 py-3 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Xem Danh Mục Vải</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
