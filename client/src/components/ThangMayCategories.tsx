import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ThangMayCategoriesProps {
  onSelectCategory?: (catId: string) => void;
}

const CAT_ITEMS = [
  {
    id: 'cotton',
    title: 'VẢI THUN COTTON & TICI',
    image: '/images/products/screenshot_1705137401-450x450.png',
    count: '5 sản phẩm'
  },
  {
    id: 'ca-sau',
    title: 'VẢI THUN CÁ SẤU POLO',
    image: '/images/products/vải-thun-cá-sấu-pe-4c-450x450.jpg',
    count: '4 sản phẩm'
  },
  {
    id: 'the-thao',
    title: 'THUN LẠNH & THỂ THAO',
    image: '/images/products/vải-thun-poly-2da-4c-450x450.jpg',
    count: '10 sản phẩm'
  },
  {
    id: 'me-luoi',
    title: 'VẢI MÈ & LƯỚI NHÚN',
    image: '/images/products/x11-450x450.jpg',
    count: '5 sản phẩm'
  },
  {
    id: 'ni-da-ca',
    title: 'VẢI NỈ BÔNG & DA CÁ',
    image: '/images/products/vải-thun-nỉ-pe-2c-cào-lông--450x450.jpg',
    count: '2 sản phẩm'
  }
];

export const ThangMayCategories: React.FC<ThangMayCategoriesProps> = ({ onSelectCategory }) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    if (onSelectCategory) {
      onSelectCategory(id);
      const el = document.getElementById('catalog-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(`/san-pham?category=${id}`);
  };

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Row 2 columns matching thangmay1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-10 border-b border-gray-100 mb-10">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-widest text-[#f49712] font-extrabold block mb-1">
              DANH MỤC TIÊU BIỂU
            </span>
            <h2 className="text-2xl md:text-3.5xl font-black text-gray-900 tracking-tight leading-tight">
              Các Loại Vải Thun
            </h2>
            <div className="w-12 h-1 bg-[#f49712] mt-3"></div>
          </div>
          <div className="lg:col-span-7 text-gray-600 text-xs md:text-sm leading-relaxed text-justify">
            Cung cấp đa dạng bảng màu và các định lượng từ mỏng nhẹ đến dày dặn. Nhận dệt nhuộm và phân phối sỉ lẻ toàn quốc cho các xưởng may gia công, xưởng in lụa, xưởng thêu và các thương hiệu thời trang thiết kế.
          </div>
        </div>

        {/* 5 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {CAT_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="cursor-pointer group text-center flex flex-col"
            >
              <div className="h-48 sm:h-56 rounded-none overflow-hidden bg-gray-100 relative mb-3 shadow-xs group-hover:shadow-md transition">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="text-xs sm:text-[13px] font-bold text-gray-900 group-hover:text-[#f49712] uppercase tracking-wide transition leading-snug">
                {item.title}
              </h3>
              <span className="text-[11px] text-gray-500 mt-1">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
