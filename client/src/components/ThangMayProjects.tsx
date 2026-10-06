import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FABRIC_HIGHLIGHTS = [
  {
    title: 'Vải Cá Sấu Polo Cao Cấp',
    specs: [
      { label: 'Chất liệu', value: 'Cá Sấu Cotton / Poly 4C' },
      { label: 'Đặc tính', value: 'Đứng form, mắt dệt đều, thoáng mát' },
      { label: 'Bền màu', value: 'Không phai, không xù lông' },
      { label: 'Ứng dụng', value: 'May áo Polo, đồng phục công sở' }
    ],
    image: '/images/products/cá-sấu-cotton-lục-giác-may-áo-polo.jpg'
  },
  {
    title: 'Bảng Màu Cotton Đa Dạng',
    specs: [
      { label: 'Chủng loại', value: 'Cotton 2C & Cotton 4C' },
      { label: 'Số lượng màu', value: 'Đầy đủ màu sắc thịnh hành' },
      { label: 'Định lượng', value: 'Nhiều định lượng chuẩn xưởng' },
      { label: 'Độ đàn hồi', value: 'Co giãn tự nhiên êm ái' }
    ],
    image: '/images/products/bảng-màu-cotton-2c-new-1024x1024.jpg'
  },
  {
    title: 'Vải May Áo Local Brand',
    specs: [
      { label: 'Độ mịn', value: 'Sợi dệt đanh chắc, bề mặt mịn' },
      { label: 'Khả năng in', value: 'Ăn mực in lụa, DTG, Decal sắc nét' },
      { label: 'Phân phối', value: 'Sỉ theo cây & cuộn toàn quốc' },
      { label: 'Tư vấn mẫu', value: 'Cắt mẫu vải gửi tận nơi' }
    ],
    image: '/images/products/vải-cottton-2c.jpg'
  }
];

export const ThangMayProjects: React.FC = () => {
  return (
    <section 
      id="projects" 
      className="py-16 md:py-24 bg-[#f8f9fa] relative border-b border-gray-200"
    >
      <div className="max-w-[1240px] mx-auto px-4 relative z-10">
        {/* Header matching thangmay1 */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10 pb-4 border-b border-gray-300">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#f49712] font-extrabold block mb-1">
              CHẤT LƯỢNG THỰC TẾ
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">
              Hình Ảnh Vải & Bảng Màu Thực Tế
            </h2>
          </div>
          <Link
            to="/san-pham"
            className="inline-flex items-center gap-2 bg-[#f49712] hover:bg-[#d8820a] text-white text-xs font-bold px-6 py-2.5 rounded uppercase tracking-wider transition self-start sm:self-auto shadow-sm"
          >
            <span>xem tất cả</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Banner Cards matching thangmay1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FABRIC_HIGHLIGHTS.map((p, idx) => (
            <div
              key={idx}
              className="relative h-[420px] rounded-none overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-900"
            >
              {/* Background Image */}
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300"></div>

              {/* Centered Content matching thangmay1 */}
              <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center text-white">
                <h3 className="text-xl font-black uppercase tracking-wide mb-5 text-[#f49712] border-b border-white/20 pb-3 w-full">
                  {p.title}
                </h3>
                <div className="space-y-2 text-xs md:text-sm text-gray-200 w-full text-left max-w-[280px]">
                  {p.specs.map((s, sIdx) => (
                    <div key={sIdx} className="flex justify-between items-center border-b border-white/10 pb-1.5">
                      <span className="text-gray-300 font-medium">{s.label}:</span>
                      <span className="font-bold text-white text-right">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
