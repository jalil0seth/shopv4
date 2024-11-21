import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from './ui/button';
import { useCartStore } from '@/store/cart';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '@/lib/supabase';

export default function ProductCard({ id, name, price, image_url, description }: Product) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image: image_url,
      quantity: 1
    });
  };

  return (
    <div
      ref={ref}
      className={`group relative rounded-lg border p-4 transition-all duration-300 hover:shadow-lg ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <Link to={`/products/${id}`}>
        <div className="aspect-square overflow-hidden rounded-md">
          <img
            src={image_url}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>
      </Link>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-lg font-bold">${price}</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            className="rounded-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}