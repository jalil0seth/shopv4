import React from 'react';
import { ShieldCheck, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <ShieldCheck className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">SoftwareDeals</span>
            </div>
            <p className="text-sm">Premium software licenses at unbeatable prices. 100% genuine and authorized reseller.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#products" className="hover:text-white transition">Products</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-white transition">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                support@softwaredeals.com
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                1-800-SOFTWARE
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Trust & Security</h3>
            <div className="flex flex-wrap gap-4">
              <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=100&h=40" alt="Security Badge" className="h-10 rounded" />
              <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=100&h=40" alt="SSL Certificate" className="h-10 rounded" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>© 2024 SoftwareDeals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}