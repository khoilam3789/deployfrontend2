import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import type { Product } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Form states
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formNote, setFormNote] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setFormSuccess(false);

    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const p = data.data;
          setProduct(p);
          const initialImg = p.image || p.main_image || (p.gallery && p.gallery[0]) || '/images/products/vải-cottton-2c.jpg';
          setActiveImage(initialImg);
          setRelated(p.related || []);
        } else {
          setProduct(null);
        }
      })
      .catch((err) => console.error('Lỗi tải chi tiết sản phẩm:', err))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim() || !product) return;
    setFormSubmitting(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          product: product.title,
          note: formNote || `Yêu cầu báo giá và gửi mẫu vải ${product.title}`
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormSuccess(true);
        setFormName('');
        setFormPhone('');
        setFormNote('');
      }
    } catch {
      alert('Không thể gửi yêu cầu lúc này. Quý khách vui lòng gọi Hotline 0938.591.207 để được phục vụ ngay!');
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500 text-sm">
        Đang tải thông tin mẫu vải...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sản phẩm này</h2>
        <p className="text-gray-600 text-sm mb-6">Mẫu vải bạn tìm kiếm có thể đã được cập nhật hoặc thay đổi.</p>
        <Link to="/san-pham" className="bg-[#f49712] text-white font-bold text-xs uppercase px-6 py-3">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const galleryList = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image || product.main_image || '/images/products/vải-cottton-2c.jpg'];

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-3.5 border-b border-gray-200 text-xs text-gray-600">
        <div className="max-w-[1240px] mx-auto px-4 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-[#f49712]">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/san-pham" className="hover:text-[#f49712]">Sản phẩm</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-semibold">{product.title}</span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="h-[420px] sm:h-[480px] bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center relative">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <span className="absolute top-4 left-4 bg-[#f49712] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 shadow-sm">
                {product.category}
              </span>
            </div>

            {/* Thumbnails */}
            {galleryList.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {galleryList.map((g, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(g)}
                    className={`w-20 h-20 shrink-0 border-2 overflow-hidden transition cursor-pointer ${
                      activeImage === g ? 'border-[#f49712]' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={g} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Direct CTAs */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#f49712] mb-1">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-4">
              {product.title}
            </h1>

            <div className="bg-orange-50 border-l-4 border-[#f49712] p-4 mb-6">
              <span className="text-xs text-gray-600 block mb-1">Giá phân phối sỉ tại xưởng:</span>
              <span className="text-2xl font-black text-[#f49712]">
                {product.price}
              </span>
              <span className="text-xs text-gray-500 block mt-1">
                (Giá tính theo cây, kg hoặc theo tấn với chiết khấu tốt nhất thị trường)
              </span>
            </div>

            <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-6 text-justify">
              {product.description}
            </p>

            {/* Specifications Table */}
            <div className="border border-gray-200 mb-6 divide-y divide-gray-200 text-xs">
              <div className="grid grid-cols-3 p-3 bg-gray-50">
                <span className="font-bold text-gray-700">Chất liệu / Phân loại:</span>
                <span className="col-span-2 text-gray-900 font-semibold">{product.category}</span>
              </div>
              <div className="grid grid-cols-3 p-3">
                <span className="font-bold text-gray-700">Xuất xứ dệt:</span>
                <span className="col-span-2 text-gray-900">Việt Nam (Cửa Hàng Vải Thun Tiến Phát Đạt)</span>
              </div>
              <div className="grid grid-cols-3 p-3 bg-gray-50">
                <span className="font-bold text-gray-700">Ứng dụng may mặc:</span>
                <span className="col-span-2 text-gray-900">Áo thun thời trang, Local Brand, đồng phục công sở, đồ thể thao</span>
              </div>
              <div className="grid grid-cols-3 p-3">
                <span className="font-bold text-gray-700">Đặc tính kỹ thuật:</span>
                <span className="col-span-2 text-gray-900">Bề mặt đanh mịn, co giãn êm, bền màu cao, không đổ lông</span>
              </div>
              <div className="grid grid-cols-3 p-3 bg-gray-50">
                <span className="font-bold text-gray-700">Hotline tư vấn:</span>
                <span className="col-span-2 text-[#f49712] font-extrabold">0938.591.207 - 0937.116.704</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <a
                href="tel:0938591207"
                className="bg-[#f49712] hover:bg-[#d8820a] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 flex items-center justify-center gap-2 transition shadow-md"
              >
                <Phone className="w-4 h-4" />
                Gọi Báo Giá: 0938.591.207
              </a>
              <a
                href={`https://zalo.me/0938591207?text=Chào bạn, tôi muốn nhận mẫu và báo giá sỉ cho vải: ${encodeURIComponent(product.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#0084ff] text-[#0084ff] hover:bg-[#0084ff] hover:text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                Gửi Mẫu Vải Qua Zalo
              </a>
            </div>

            {/* In-page Quote Request Box */}
            <div className="bg-gray-50 p-6 border border-gray-200">
              <h3 className="text-sm font-black uppercase text-gray-900 mb-2">
                Để lại thông tin nhận mẫu vải miễn phí
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Tiến Phát Đạt sẽ liên hệ xác nhận và gửi mẫu vải tận tay xưởng may của quý khách.
              </p>

              {formSuccess ? (
                <div className="p-4 bg-green-50 border border-green-200 text-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-green-900">Đã gửi yêu cầu thành công!</p>
                  <p className="text-[11px] text-green-700">Chúng tôi sẽ gọi lại trong ít phút.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Họ và tên của bạn *"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="px-3 py-2 text-xs bg-white border border-gray-300 outline-none focus:border-[#f49712]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại / Zalo *"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="px-3 py-2 text-xs bg-white border border-gray-300 outline-none focus:border-[#f49712]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Ghi chú số lượng cây hoặc địa chỉ nhận mẫu vải..."
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-300 outline-none focus:border-[#f49712]"
                  />
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full bg-[#30373f] hover:bg-[#f49712] text-white text-xs font-bold uppercase tracking-wider py-2.5 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {formSubmitting ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU NHẬN MẪU'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="pt-10 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                Sản Phẩm Cùng Danh Mục
              </h3>
              <Link to="/san-pham" className="text-xs font-bold text-[#f49712] hover:underline uppercase">
                Xem tất cả &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {related.map((item) => {
                const img = item.image || item.main_image || '/images/products/vải-cottton-2c.jpg';
                return (
                  <div key={item.slug} className="bg-white border border-gray-200 group overflow-hidden flex flex-col">
                    <Link to={`/san-pham/${item.slug}`} className="h-44 sm:h-52 overflow-hidden bg-gray-50 block">
                      <img
                        src={img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      />
                    </Link>
                    <div className="p-3 flex flex-col flex-1">
                      <h4 className="font-bold text-xs text-gray-900 mb-1 line-clamp-1 group-hover:text-[#f49712] transition">
                        <Link to={`/san-pham/${item.slug}`}>{item.title}</Link>
                      </h4>
                      <span className="text-[11px] font-bold text-[#f49712] mt-auto">
                        {item.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
