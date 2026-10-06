import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ThangMayTopbar } from '../components/ThangMayTopbar';
import { ThangMayHeader } from '../components/ThangMayHeader';
import { ThangMayFooter } from '../components/ThangMayFooter';
import { ThangMayFloating } from '../components/ThangMayFloating';
import { ThangMaySearchModal } from '../components/ThangMaySearchModal';
import type { Product } from '../types';

export const MainLayout: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error('Lỗi tải sản phẩm layout:', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans selection:bg-[#f49712] selection:text-white">
      {/* Top Bar matching thangmay1 */}
      <ThangMayTopbar />

      {/* Main Single-row Header */}
      <ThangMayHeader onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Wave Footer */}
      <ThangMayFooter />

      {/* Floating CTA Hotlines & Zalo */}
      <ThangMayFloating />

      {/* Search Modal */}
      <ThangMaySearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
      />
    </div>
  );
};
