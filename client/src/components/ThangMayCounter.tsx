import React, { useState, useEffect, useRef } from 'react';

const STATS = [
  { target: 26, suffix: '+', label: 'Chủng Loại Vải Thun' },
  { target: 100, suffix: '%', label: 'Chất Lượng Xuất Xưởng' },
  { target: 63, suffix: ' Tỉnh', label: 'Giao Hàng Toàn Quốc' },
  { target: 24, suffix: '/7', label: 'Tư Vấn & Báo Giá Nhanh' }
];

export const ThangMayCounter: React.FC = () => {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeProgress = 1 - Math.pow(1 - progress, 2);

            setCounts(
              STATS.map((s) => Math.floor(easeProgress * s.target))
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(STATS.map((s) => s.target));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={containerRef} className="bg-[#242b38] py-12 text-white">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 sm:divide-x divide-white/10">
          {STATS.map((stat, idx) => (
            <div key={idx} className="p-2">
              <div className="text-3xl md:text-4.5xl font-extrabold text-white mb-1 tracking-tight">
                <span>{hasAnimated ? counts[idx] : 0}</span>
                <span className="text-[#f49712] ml-0.5">{stat.suffix}</span>
              </div>
              <div className="text-xs md:text-sm font-bold text-[#f49712] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
