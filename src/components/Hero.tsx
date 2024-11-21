import React from 'react';
import { Percent, Shield, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium Software at
            <span className="text-blue-600"> 70% Off</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get industry-standard software like AutoCAD and Adobe Creative Suite at unbeatable prices. 100% genuine licenses with official support.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
              View Deals
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: 'Genuine Software', desc: '100% authentic licenses' },
              { icon: Percent, title: 'Best Prices', desc: 'Save up to 70% off retail' },
              { icon: Clock, title: 'Instant Delivery', desc: 'Get started in minutes' }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
                <Icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}