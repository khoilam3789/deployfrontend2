import React, { useState, useEffect } from 'react';
import { ThangMayHeroSlider } from '../components/ThangMayHeroSlider';
import { ThangMayCategories } from '../components/ThangMayCategories';
import { ThangMayCatalog } from '../components/ThangMayCatalog';
import { ThangMayAboutBanner } from '../components/ThangMayAboutBanner';
import { ThangMayWhyUs } from '../components/ThangMayWhyUs';
import { ThangMayCounter } from '../components/ThangMayCounter';
import { ThangMayServices } from '../components/ThangMayServices';
import { ThangMayProjects } from '../components/ThangMayProjects';
import { ThangMayNews } from '../components/ThangMayNews';
import { ThangMayContact } from '../components/ThangMayContact';
import { QuickViewModal } from '../components/QuickViewModal';
import type { Product, Post } from '../types';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch Products
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error('Lỗi tải sản phẩm:', err));

    // Fetch Posts
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setPosts(data.data);
        }
      })
      .catch((err) => console.error('Lỗi tải bài viết:', err));
  }, []);

  return (
    <>
      {/* 1. Hero Slider (100% genuine fabric banners, 6s cycle, pause on hover) */}
      <ThangMayHeroSlider />

      {/* 2. Categories Showcase (5 standard categories) */}
      <ThangMayCategories onSelectCategory={(catId) => setSelectedCategory(catId)} />

      {/* 3. Catalog Section (26 fabric items with filter tabs) */}
      <ThangMayCatalog
        products={products}
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* 4. About Banner */}
      <ThangMayAboutBanner />

      {/* 5. Why Choose Us */}
      <ThangMayWhyUs />

      {/* 6. Dynamic Animated Counter */}
      <ThangMayCounter />

      {/* 7. Services Section (4 alternating orange/white cards) */}
      <ThangMayServices />

      {/* 8. Fabric Showcase */}
      <ThangMayProjects />

      {/* 9. News & Knowledge */}
      <ThangMayNews posts={posts} />

      {/* 10. Contact Section */}
      <ThangMayContact />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};
