import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/supabase';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadProduct() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url,
        quantity: 1
      });
      toast.success('Added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.featured && (
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
                Featured
              </span>
            )}
          </div>
          <div className="flex gap-4">
            <Button onClick={handleAddToCart} className="flex-1">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}