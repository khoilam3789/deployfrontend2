import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    title: 'Cung Cấp Vải Sỉ\nCho Xưởng May',
    desc: 'Phân phối theo cây, theo kg với giá xuất xưởng trực tiếp, không qua trung gian. Đảm bảo nguồn hàng ổn định lâu dài.',
    isOrange: false
  },
  {
    title: 'Dệt & Nhuộm\nTheo Yêu Cầu',
    desc: 'Nhận dệt kim tròn và nhuộm màu độc quyền theo mã Pantone khách hàng yêu cầu, chuẩn thông số và độ bền màu cao.',
    isOrange: true
  },
  {
    title: 'Cắt & Gửi Mẫu\nVải Miễn Phí',
    desc: 'Hỗ trợ cắt và gửi mẫu vải tận tay xưởng may để kiểm tra định lượng, độ đàn hồi và cảm nhận chất liệu thực tế.',
    isOrange: false
  },
  {
    title: 'Tư Vấn Kỹ Thuật\nĐịnh Lượng Vải',
    desc: 'Đội ngũ chuyên viên giàu kinh nghiệm hỗ trợ tính toán định lượng vải tối ưu cho từng mẫu áo, giúp tiết kiệm tối đa chi phí.',
    isOrange: true
  }
];

export const ThangMayServices: React.FC = () => {
  return (
    <section 
      id="services" 
      className="py-16 md:py-24 bg-[#f4f4f4] relative border-b border-gray-200"
    >
      <div className="max-w-[1240px] mx-auto px-4 relative z-10">
        {/* Header with right link button matching thangmay1 */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10 pb-4 border-b border-gray-300">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#f49712] font-extrabold block mb-1">
              DỊCH VỤ CHUYÊN NGHIỆP
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">
              Dịch Vụ Của Chúng Tôi
            </h2>
          </div>
          <Link
            to="/lien-he"
            className="inline-flex items-center gap-2 bg-[#f49712] hover:bg-[#d8820a] text-white text-xs font-bold px-6 py-2.5 rounded uppercase tracking-wider transition self-start sm:self-auto shadow-sm"
          >
            <span>Tư vấn dịch vụ</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Cards Grid with alternating colors matching thangmay1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className={`p-6 md:p-8 rounded-none shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                srv.isOrange
                  ? 'bg-[#f58634] text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <div>
                <h3 className={`text-base md:text-lg font-black uppercase mb-3 whitespace-pre-line leading-snug tracking-tight ${
                  srv.isOrange ? 'text-white' : 'text-gray-900 group-hover:text-[#f49712]'
                }`}>
                  {srv.title}
                </h3>
                <p className={`text-xs md:text-sm leading-relaxed ${
                  srv.isOrange ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {srv.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/20">
                <Link
                  to="/lien-he"
                  className={`text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 transition ${
                    srv.isOrange ? 'text-white hover:underline' : 'text-[#f49712] hover:underline'
                  }`}
                >
                  Liên hệ dịch vụ &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
