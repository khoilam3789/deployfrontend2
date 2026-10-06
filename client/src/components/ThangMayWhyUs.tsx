import React from 'react';
import { Award, Layers, Headphones, DollarSign } from 'lucide-react';

const WHY_ITEMS = [
  {
    icon: <Award className="w-8 h-8 text-[#f49712]" />,
    title: 'CHẤT LƯỢNG VƯỢT TRỘI',
    desc: 'Sợi dệt đạt chuẩn định lượng, co giãn 4 chiều êm ái, bề mặt vải đanh mịn, không xù lông và bền màu qua nhiều lần giặt.'
  },
  {
    icon: <Layers className="w-8 h-8 text-[#f49712]" />,
    title: 'ĐA DẠNG CHỦNG LOẠI',
    desc: 'Cung cấp đầy đủ 26+ loại vải: Cotton 2C/4C, Cá Sấu Polo, Thun Lạnh, Vải Mè, Nỉ Da Cá với hàng trăm mã màu thịnh hành.'
  },
  {
    icon: <Headphones className="w-8 h-8 text-[#f49712]" />,
    title: 'TẬN TÂM CHUYÊN NGHIỆP',
    desc: 'Hỗ trợ tư vấn tận tình, cắt và gửi mẫu vải tận tay xưởng may miễn phí. Giao hàng hỏa tốc trong ngày tại TP.HCM.'
  },
  {
    icon: <DollarSign className="w-8 h-8 text-[#f49712]" />,
    title: 'GIÁ XUẤT XƯỞNG TẬN GỐC',
    desc: 'Giá phân phối trực tiếp từ xưởng dệt, không qua trung gian. Chiết khấu cao cho đơn hàng số lượng lớn theo cây, theo tấn.'
  }
];

export const ThangMayWhyUs: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-100 relative">
      <div className="max-w-[1240px] mx-auto px-4 relative z-10">
        {/* Title matching thangmay1 */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#f49712] font-extrabold block mb-1">
            CAM KẾT CHẤT LƯỢNG
          </span>
          <h2 className="text-2xl md:text-3.5xl font-black text-gray-900 tracking-tight">
            Tại Sao Bạn Nên Chọn Vải Thun Tiến Phát Đạt?
          </h2>
          <div className="w-12 h-1 bg-[#f49712] mx-auto mt-3"></div>
        </div>

        {/* 4 Icon Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_ITEMS.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group p-4 hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 rounded-full bg-orange-50 mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs border border-orange-100">
                {item.icon}
              </div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide mb-2 group-hover:text-[#f49712] transition">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
