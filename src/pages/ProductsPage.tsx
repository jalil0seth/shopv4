import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(category 
          ? data.filter(p => p.category === category)
          : data
        );
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Software` : 'All Products'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}