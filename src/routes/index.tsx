import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import AuthPage from '@/pages/AuthPage';
import UserProfilePage from '@/pages/UserProfilePage';
import AdminDashboard from '@/pages/AdminDashboard';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  const { user, isAdmin } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route
          path="/auth"
          element={user ? <Navigate to="/profile" /> : <AuthPage />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}