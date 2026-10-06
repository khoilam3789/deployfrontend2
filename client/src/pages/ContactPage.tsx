import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    note: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ Họ tên và Số điện thoại!');
      return;
    }
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          product: formData.product || 'Liên hệ từ trang Liên hệ',
          note: formData.note
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', email: '', product: '', note: '' });
      } else {
        setErrorMsg(data.message || 'Không thể gửi thông tin lúc này. Vui lòng thử lại!');
      }
    } catch {
      setErrorMsg('Lỗi kết nối máy chủ. Quý khách vui lòng gọi Hotline 0938.591.207 để được hỗ trợ trực tiếp!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb Header */}
      <div className="bg-[#242b38] py-10 text-white">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-tight text-white">
              Liên Hệ & Báo Giá
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Liên hệ trực tiếp với Cửa Hàng Vải Thun Tiến Phát Đạt để nhận tư vấn và mẫu vải nhanh nhất
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Link to="/" className="hover:text-[#f49712] transition">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[#f49712] font-semibold">Liên hệ</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Store Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#f49712] font-extrabold block mb-1">
                THÔNG TIN LIÊN HỆ
              </span>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">
                Cửa Hàng Vải Thun Tiến Phát Đạt
              </h2>
              <div className="w-12 h-1 bg-[#f49712] mb-6"></div>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-6">
                Chuyên cung cấp sỉ và lẻ các loại vải thun may mặc: Cotton 2C, Cotton 4C, Cá Sấu Polo, Thun Lạnh, Vải Mè, Nỉ Da Cá. Nhận dệt nhuộm theo yêu cầu và giao hàng nhanh toàn quốc.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-4 bg-gray-50 border border-gray-200">
                <MapPin className="w-5 h-5 text-[#f49712] shrink-0 mt-0.5" />
                <div className="text-xs text-gray-700">
                  <strong className="block text-gray-900 text-sm mb-0.5">Địa chỉ kho hàng:</strong>
                  <span>33 Lê Cảnh Tuân, P. Phú Thọ Hòa, Q. Tân Phú, TP. Hồ Chí Minh</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-gray-50 border border-gray-200">
                <Phone className="w-5 h-5 text-[#f49712] shrink-0 mt-0.5" />
                <div className="text-xs text-gray-700">
                  <strong className="block text-gray-900 text-sm mb-0.5">Hotline tư vấn & đặt hàng:</strong>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <a href="tel:0938591207" className="text-[#f49712] font-extrabold hover:underline text-sm">
                      0938.591.207
                    </a>
                    <span className="text-gray-400">•</span>
                    <a href="tel:0937116704" className="text-gray-800 font-bold hover:underline text-sm">
                      0937.116.704
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-gray-50 border border-gray-200">
                <MessageSquare className="w-5 h-5 text-[#0084ff] shrink-0 mt-0.5" />
                <div className="text-xs text-gray-700">
                  <strong className="block text-gray-900 text-sm mb-0.5">Zalo gửi ảnh & bảng màu:</strong>
                  <a href="https://zalo.me/0938591207" target="_blank" rel="noopener noreferrer" className="text-[#0084ff] font-bold hover:underline">
                    0938.591.207 (Tiến Phát Đạt)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-gray-50 border border-gray-200">
                <Mail className="w-5 h-5 text-[#f49712] shrink-0 mt-0.5" />
                <div className="text-xs text-gray-700">
                  <strong className="block text-gray-900 text-sm mb-0.5">Email liên hệ:</strong>
                  <span>vaithuntienphatdat@gmail.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-gray-50 border border-gray-200">
                <Clock className="w-5 h-5 text-[#f49712] shrink-0 mt-0.5" />
                <div className="text-xs text-gray-700">
                  <strong className="block text-gray-900 text-sm mb-0.5">Thời gian làm việc:</strong>
                  <span>07:30 - 18:00 (Từ Thứ 2 đến Thứ 7, Chủ nhật hỗ trợ online qua Zalo)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-gray-50 p-8 md:p-12 border border-gray-200">
            <span className="text-xs uppercase tracking-widest text-[#f49712] font-extrabold block mb-1">
              GỬI TIN NHẮN
            </span>
            <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">
              Yêu Cầu Báo Giá & Mẫu Vải
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Điền thông tin dưới đây, chúng tôi sẽ liên hệ lại trong vòng 5 phút để tư vấn giá sỉ tốt nhất.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {submitted ? (
              <div className="py-12 bg-green-50 rounded p-6 border border-green-200 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-green-900 mb-2">
                  Đã gửi yêu cầu thành công!
                </h4>
                <p className="text-xs text-green-700 mb-6">
                  Cửa Hàng Vải Thun Tiến Phát Đạt đã nhận được tin nhắn và sẽ liên hệ lại qua số điện thoại/Zalo trong ít phút.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#f49712] text-white font-bold text-xs uppercase px-6 py-2.5 tracking-wider cursor-pointer"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 outline-none focus:border-[#f49712]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Số điện thoại / Zalo *</label>
                    <input
                      type="tel"
                      required
                      placeholder="09xx xxx xxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 outline-none focus:border-[#f49712]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email (nếu có)</label>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 outline-none focus:border-[#f49712]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mẫu vải cần tư vấn</label>
                    <input
                      type="text"
                      placeholder="Cotton 4C, Cá sấu PE, Thun lạnh..."
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 outline-none focus:border-[#f49712]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nội dung chi tiết</label>
                  <textarea
                    rows={4}
                    placeholder="Quý khách vui lòng cho biết số lượng cây/kg cần nhập, yêu cầu định lượng, địa chỉ gửi mẫu..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 outline-none focus:border-[#f49712]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#30373f] hover:bg-[#f49712] text-white font-black text-xs uppercase px-8 py-3.5 tracking-wider transition cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU NGAY'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Full Google Map Section */}
        <div className="border border-gray-200 p-2 bg-gray-50">
          <iframe
            title="Bản đồ chỉ đường tới Cửa Hàng Vải Thun Tiến Phát Đạt"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3566949435653!2d106.62422138421462!3d10.783968931651062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ea8275e9fb9%3A0xc0e812adeb519999!2zMzMgTMOqIEPhuqNuaCBUdcOibiwgUGjDuiBUaOG7jSBIb8OgLCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1711352466718!5m2!1svi!2s"
            width="100%"
            height="380"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
