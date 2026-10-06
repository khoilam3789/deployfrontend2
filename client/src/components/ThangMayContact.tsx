import React, { useState } from 'react';
import { CheckCircle2, Phone, MapPin, Mail, AlertCircle } from 'lucide-react';

export const ThangMayContact: React.FC = () => {
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
      setErrorMsg('Vui lòng nhập Họ tên và Số điện thoại!');
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
          product: formData.product || 'Tư vấn chung qua website',
          note: formData.note
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', email: '', product: '', note: '' });
      } else {
        setErrorMsg(data.message || 'Không thể gửi yêu cầu. Vui lòng thử lại hoặc gọi Hotline!');
      }
    } catch {
      setErrorMsg('Lỗi kết nối máy chủ. Quý khách vui lòng gọi trực tiếp Hotline 0938.591.207 để được hỗ trợ ngay!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-0 overflow-hidden bg-white border-b border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* Left Column: Genuine fabric photo with hover effect matching thangmay1 */}
        <div className="relative overflow-hidden group min-h-[380px] lg:min-h-[520px] bg-gray-900">
          <img
            src="/images/products/vải-cottton-2c.jpg"
            alt="Cửa hàng vải thun Tiến Phát Đạt"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white max-w-sm">
            <span className="bg-[#f49712] text-white text-[11px] font-extrabold px-3 py-1 uppercase tracking-wider block w-fit mb-2">
              Kho hàng tại Tân Phú
            </span>
            <h3 className="text-xl font-black uppercase text-white drop-shadow-md">
              Cửa Hàng Vải Thun Tiến Phát Đạt
            </h3>
            <p className="text-xs text-gray-200 mt-1">
              33 Lê Cảnh Tuân, P. Phú Thọ Hòa, Q. Tân Phú, TP.HCM
            </p>
          </div>
        </div>

        {/* Right Column: Form matching thangmay1 */}
        <div className="p-8 md:p-14 lg:p-16 flex flex-col justify-center bg-gray-50">
          <div className="max-w-lg w-full">
            <span className="text-xs uppercase tracking-widest text-[#f49712] font-extrabold block mb-1">
              LIÊN HỆ BÁO GIÁ
            </span>
            <h2 className="text-2xl md:text-3.5xl font-black text-gray-900 uppercase tracking-tight mb-2">
              Liên Hệ Với Chúng Tôi
            </h2>
            <div className="w-12 h-1 bg-[#f49712] mb-6"></div>

            <p className="text-xs md:text-sm text-gray-600 mb-6 leading-relaxed">
              Quý khách vui lòng để lại thông tin loại vải, định lượng hoặc số lượng cây/kg cần nhập. Đội ngũ Tiến Phát Đạt sẽ báo giá sỉ tốt nhất trong ít phút.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {submitted ? (
              <div className="py-8 bg-green-50 rounded p-6 border border-green-200 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-green-900 mb-1">
                  Đã gửi yêu cầu thành công!
                </h4>
                <p className="text-xs text-green-700 mb-4">
                  Cửa Hàng Vải Thun Tiến Phát Đạt sẽ liên hệ lại qua số điện thoại/Zalo trong ít phút.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#f49712] text-white font-bold text-xs px-5 py-2 uppercase tracking-wider cursor-pointer"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Họ và tên của bạn *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-xs md:text-sm bg-white border border-gray-300 rounded-none outline-none focus:border-[#f49712] transition"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại / Zalo *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 text-xs md:text-sm bg-white border border-gray-300 rounded-none outline-none focus:border-[#f49712] transition"
                  />
                  <input
                    type="email"
                    placeholder="Email (không bắt buộc)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-xs md:text-sm bg-white border border-gray-300 rounded-none outline-none focus:border-[#f49712] transition"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Mẫu vải quan tâm (VD: Cotton 4C, Cá sấu PE, Thun lạnh...)"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-4 py-3 text-xs md:text-sm bg-white border border-gray-300 rounded-none outline-none focus:border-[#f49712] transition"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Nội dung yêu cầu báo giá, số lượng cây/kg hoặc yêu cầu gửi mẫu vải..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-4 py-3 text-xs md:text-sm bg-white border border-gray-300 rounded-none outline-none focus:border-[#f49712] transition"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-[#363638] hover:bg-[#f49712] text-white font-black text-xs uppercase px-10 py-3.5 tracking-widest transition-all duration-300 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU BÁO GIÁ'}
                  </button>
                </div>
              </form>
            )}

            {/* Quick Contact Line */}
            <div className="mt-8 pt-6 border-t border-gray-200/80 flex flex-wrap gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#f49712]" />
                33 Lê Cảnh Tuân, Tân Phú, TP.HCM
              </span>
              <span className="flex items-center gap-1.5 font-bold text-gray-900">
                <Phone className="w-3.5 h-3.5 text-[#f49712]" />
                <a href="tel:0938591207" className="hover:text-[#f49712]">0938.591.207</a>
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#f49712]" />
                vaithuntienphatdat@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
