import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Search, LogOut, User, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { CartDrawer } from './CartDrawer';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">SoftwareDeals</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <Link to="/products?category=deals" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Deals
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Admin Panel
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search software..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <CartDrawer />
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="default">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}