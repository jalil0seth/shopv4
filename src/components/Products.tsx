import React from 'react';
import { Check } from 'lucide-react';

const products = [
  {
    name: 'AutoCAD 2024',
    originalPrice: 1775,
    discountPrice: 532.50,
    features: ['Full Version', 'Official License', '3 Year Subscription', 'Technical Support']
  },
  {
    name: 'Adobe Creative Suite',
    originalPrice: 599.88,
    discountPrice: 179.96,
    features: ['All Creative Apps', 'Annual Plan', 'Cloud Storage', '24/7 Support']
  },
  {
    name: 'Microsoft Office',
    originalPrice: 249.99,
    discountPrice: 74.99,
    features: ['Lifetime License', 'All Apps Bundle', 'Free Updates', 'Install on 5 Devices']
  }
];

export default function Products() {
  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.name} className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">{product.name}</h3>
              <div className="mb-4">
                <span className="text-gray-500 line-through">${product.originalPrice}</span>
                <span className="text-3xl font-bold text-blue-600 ml-2">
                  ${product.discountPrice}
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}