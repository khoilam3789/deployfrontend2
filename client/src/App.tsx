import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PostListPage } from './pages/PostListPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminPostsPage } from './pages/admin/AdminPostsPage';
import { AdminBannersPage } from './pages/admin/AdminBannersPage';
import { AdminQuotesPage } from './pages/admin/AdminQuotesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/san-pham" element={<ProductListPage />} />
          <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
          <Route path="/tin-tuc" element={<PostListPage />} />
          <Route path="/tin-tuc/:slug" element={<PostDetailPage />} />
          <Route path="/lien-he" element={<ContactPage />} />

          {/* Backward compatibility redirects from old WordPress site */}
          <Route path="/product-category/*" element={<Navigate to="/san-pham" replace />} />
          <Route path="/category/*" element={<Navigate to="/tin-tuc" replace />} />

          {/* 404 Catch All */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin Portal Protected Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="posts" element={<AdminPostsPage />} />
          <Route path="banners" element={<AdminBannersPage />} />
          <Route path="quotes" element={<AdminQuotesPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
