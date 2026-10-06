import React from 'react';
import { X, Phone, MessageSquare, ExternalLink, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  if (!product) return null;
  const imgSrc = product.image || product.main_image || '/images/products/vải-cottton-2c.jpg';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-none max-w-3xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-gray-100 hover:bg-[#f49712] text-gray-700 hover:text-white flex items-center justify-center transition z-20 cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
          {/* Product Image */}
          <div className="flex flex-col items-center justify-center bg-gray-50 overflow-hidden border border-gray-100">
            <img
              src={imgSrc}
              alt={product.title}
              className="w-full h-72 md:h-96 object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-block bg-orange-100 text-[#f49712] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 mb-2">
                {product.category}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight mb-3">
                {product.title}
              </h2>
              
              <div className="bg-orange-50 border border-orange-200 p-3 mb-4 inline-block">
                <span className="text-[11px] text-gray-600 block font-medium">Báo giá sỉ theo cây / kg:</span>
                <span className="text-lg font-extrabold text-[#f49712]">
                  {product.price}
                </span>
              </div>

              <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4">
                {product.description}
              </p>

              <div className="space-y-2 mb-6 text-xs text-gray-700 bg-gray-50 p-3.5 border border-gray-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#f49712] shrink-0" />
                  <span><strong>Định lượng & Khổ vải:</strong> Đạt tiêu chuẩn xưởng may</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#f49712] shrink-0" />
                  <span><strong>Bảng màu:</strong> Đa dạng màu sắc có sẵn tại kho Tân Phú</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#f49712] shrink-0" />
                  <span><strong>Giao hàng:</strong> Hỏa tốc TP.HCM và gửi chành xe toàn quốc</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href="tel:0938591207"
                  className="flex-1 bg-[#f49712] hover:bg-[#d8820a] text-white font-bold text-xs py-3 px-4 flex items-center justify-center gap-2 transition shadow uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4" />
                  Gọi 0938.591.207
                </a>
                <a
                  href={`https://zalo.me/0938591207?text=Chào bạn, tôi muốn nhận báo giá mẫu vải ${encodeURIComponent(product.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border-2 border-[#0084ff] text-[#0084ff] hover:bg-[#0084ff] hover:text-white font-bold text-xs py-3 px-4 flex items-center justify-center gap-2 transition uppercase tracking-wider"
                >
                  <MessageSquare className="w-4 h-4" />
                  Gửi Mẫu Qua Zalo
                </a>
              </div>
              <Link
                to={`/san-pham/${product.slug}`}
                onClick={onClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 transition uppercase tracking-wider"
              >
                <span>Xem trang chi tiết sản phẩm</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
