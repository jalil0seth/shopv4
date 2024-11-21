import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { Button } from './ui/button';
import { getProducts, Product, updateProduct, createProduct, deleteProduct } from '@/lib/supabase';

export function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateProduct(id: string, updates: Partial<Product>) {
    try {
      await updateProduct(id, updates);
      await loadProducts();
      setEditing(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  async function handleCreateProduct() {
    const newProduct = {
      name: 'New Product',
      description: 'Product description',
      price: 0,
      image_url: 'https://placehold.co/400',
      category: 'software',
      featured: false
    };

    try {
      await createProduct(newProduct);
      await loadProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }

  async function handleDeleteProduct(id: string) {
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Button onClick={handleCreateProduct}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded" />
              <div>
                {editing === product.id ? (
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleUpdateProduct(product.id, { name: e.target.value })}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  <h3 className="font-semibold">{product.name}</h3>
                )}
                <p className="text-sm text-gray-600">${product.price}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setEditing(editing === product.id ? null : product.id)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}