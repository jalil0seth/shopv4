import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'http://217.76.51.2:8000',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE'
);

// Initialize the database with required tables
export async function initializeDatabase() {
  const { error: profilesError } = await supabase.rpc('create_profiles_table');
  if (profilesError) console.error('Error creating profiles table:', profilesError);

  const { error: productsError } = await supabase.rpc('create_products_table');
  if (productsError) console.error('Error creating products table:', productsError);

  // Insert sample products if none exist
  const { data: existingProducts } = await supabase.from('products').select('id');
  if (!existingProducts?.length) {
    await insertSampleProducts();
  }
}

async function insertSampleProducts() {
  const sampleProducts = [
    {
      name: 'Adobe Creative Suite',
      description: 'Complete creative software collection including Photoshop, Illustrator, and more.',
      price: 599.99,
      image_url: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=400&h=400',
      category: 'creative',
      featured: true
    },
    {
      name: 'AutoCAD 2024',
      description: 'Professional CAD software for 2D and 3D design.',
      price: 1299.99,
      image_url: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=400&h=400',
      category: 'engineering',
      featured: true
    },
    {
      name: 'Microsoft Office 365',
      description: 'Essential productivity suite including Word, Excel, and PowerPoint.',
      price: 99.99,
      image_url: 'https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?auto=format&fit=crop&w=400&h=400',
      category: 'productivity',
      featured: true
    }
  ];

  const { error } = await supabase.from('products').insert(sampleProducts);
  if (error) console.error('Error inserting sample products:', error);
}

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  featured: boolean;
  created_at: string;
};

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Product[];
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Product[];
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const { error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id);
  
  if (error) throw error;
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>) {
  const { error } = await supabase
    .from('products')
    .insert([product]);
  
  if (error) throw error;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}