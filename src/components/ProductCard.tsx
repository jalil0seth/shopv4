import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from './ui/button';
import { useCartStore } from '@/store/cart';
import { Heart, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export function ProductCard({ id, name, price, image, description }: ProductCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const addItem = useCartStore((state) => state.addItem);

  return (
    <div
      ref={ref}
      className={`group relative rounded-lg border p-4 transition-all duration-300 hover:shadow-lg ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="aspect-square overflow-hidden rounded-md">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold">${price}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => {}}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              className="rounded-full"
              onClick={() => addItem({ id, name, price, image, quantity: 1 })}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}