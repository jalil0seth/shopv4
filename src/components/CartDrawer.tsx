import React from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { Button } from './ui/button';
import { useCartStore } from '@/store/cart';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export function CartDrawer() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {items.length > 0 && (
            <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <div className="mt-1 flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 rounded border p-1 text-center"
                  />
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        {items.length > 0 ? (
          <div className="mt-8">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="mt-4 w-full">Checkout</Button>
          </div>
        ) : (
          <p className="mt-8 text-center text-gray-500">Your cart is empty</p>
        )}
      </SheetContent>
    </Sheet>
  );
}