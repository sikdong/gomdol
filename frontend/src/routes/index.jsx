import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import AdminLayout from '../layouts/AdminLayout';
import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import OrdersPage from '../pages/OrdersPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import ProductEditorPage from '../pages/ProductEditorPage';
import LoginPage from '../pages/LoginPage';
import OauthCallbackPage from '../pages/oauth/OauthCallbackPage';

const AppRoutes = () => (
  <Routes>
    <Route element={<DefaultLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth/:provider/callback" element={<OauthCallbackPage />} />
    </Route>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboardPage />} />
      <Route path="products/new" element={<ProductEditorPage mode="create" />} />
      <Route path="products/:productId" element={<ProductEditorPage mode="edit" />} />
    </Route>
  </Routes>
);

export default AppRoutes;
