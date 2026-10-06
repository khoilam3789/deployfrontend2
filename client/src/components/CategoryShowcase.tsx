import React from 'react';
import type { Category } from '../types';

interface CategoryShowcaseProps {
  categories: Category[];
  onSelectCategory: (id: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ categories, onSelectCategory }) => {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-wide mb-2">
            Danh Mục Dòng Vải Nổi Bật
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Tiến Phát Đạt cung cấp đầy đủ các chủng loại vải thun may mặc thịnh hành nhất thị trường
          </p>
          <div className="w-16 h-1 bg-[#fc9631] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-[#fc9631] transition-all duration-300 flex flex-col text-center"
            >
              <div className="h-36 md:h-44 overflow-hidden bg-gray-100 flex items-center justify-center relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition"></div>
              </div>
              <div className="p-3 md:p-4">
                <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1 group-hover:text-[#fc9631] transition">
                  {cat.name}
                </h3>
                <span className="text-xs font-semibold text-[#fc9631]">
                  {cat.count} Mẫu Vải Có Sẵn
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
