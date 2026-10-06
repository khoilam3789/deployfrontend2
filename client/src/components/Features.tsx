import React from 'react';
import { Award, DollarSign, Truck, Headphones } from 'lucide-react';

const FEATURES = [
  {
    icon: Award,
    title: 'Chất Lượng Xuất Xưởng',
    desc: 'Sợi dệt chuẩn định lượng, độ bền màu cao, co giãn êm ái không xù lông.'
  },
  {
    icon: DollarSign,
    title: 'Giá Xưởng Cạnh Tranh',
    desc: 'Trực tiếp phân phối từ xưởng dệt, không qua trung gian, chiết khấu sỉ hấp dẫn.'
  },
  {
    icon: Truck,
    title: 'Giao Hàng Toàn Quốc',
    desc: 'Giao hỏa tốc nội thành TP.HCM và gửi hàng chành xe các tỉnh nhanh chóng, an toàn.'
  },
  {
    icon: Headphones,
    title: 'Tư Vấn & Gửi Mẫu 24/7',
    desc: 'Hỗ trợ cắt mẫu gửi tận tay xưởng may, tư vấn chọn vải chuẩn theo kiểu dáng áo.'
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-10 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-[#fc9631] transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="w-13 h-13 rounded-xl bg-orange-50 text-[#fc9631] flex items-center justify-center shrink-0 group-hover:bg-[#fc9631] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
