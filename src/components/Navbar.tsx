import React from 'react';
import { ShieldCheck, Search } from 'lucide-react';
import { Button } from './ui/button';
import { CartDrawer } from './CartDrawer';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">SoftwareDeals</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#featured" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Featured
            </a>
            <a href="#categories" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Categories
            </a>
            <a href="#deals" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Deals
            </a>
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
          <Button variant="default">Sign In</Button>
        </div>
      </div>
    </nav>
  );
}