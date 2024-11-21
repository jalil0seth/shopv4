import { createClient } from '@supabase/supabase-js';

// Database Configuration
const SUPABASE_URL = 'http://217.76.51.2:3000';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q';

// Supabase Client Configuration
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

// Admin Client with Service Role
export const adminSupabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
});

// Types
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

// Mock Data
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Adobe Creative Suite',
    description: 'Complete creative software collection including Photoshop, Illustrator, and more.',
    price: 599.99,
    image_url: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=400&h=400',
    category: 'creative',
    featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'AutoCAD 2024',
    description: 'Professional CAD software for 2D and 3D design.',
    price: 1299.99,
    image_url: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=400&h=400',
    category: 'engineering',
    featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Microsoft Office 365',
    description: 'Essential productivity suite including Word, Excel, and PowerPoint.',
    price: 99.99,
    image_url: 'https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?auto=format&fit=crop&w=400&h=400',
    category: 'productivity',
    featured: true,
    created_at: new Date().toISOString()
  }
];

// Database State Management
let isOfflineMode = false;
let hasInitialized = false;

// Utility Functions
const handleDatabaseError = (error: any) => {
  console.error('Database operation failed:', error);
  isOfflineMode = true;
  return null;
};

const checkConnection = async () => {
  try {
    const { data, error } = await supabase.from('products').select('count');
    if (error) throw error;
    isOfflineMode = false;
    return true;
  } catch (error) {
    isOfflineMode = true;
    return false;
  }
};

// Database Operations
export async function initializeDatabase() {
  if (hasInitialized) return;
  
  try {
    const isOnline = await checkConnection();
    if (!isOnline) {
      console.log('Running in offline mode with mock data');
      return;
    }

    // Use admin client for database initialization
    const { error: profilesError } = await adminSupabase.rpc('create_profiles_table');
    if (profilesError) console.error('Error creating profiles table:', profilesError);

    const { error: productsError } = await adminSupabase.rpc('create_products_table');
    if (productsError) console.error('Error creating products table:', productsError);

    const { data: existingProducts } = await adminSupabase.from('products').select('id');
    if (!existingProducts?.length) {
      await insertSampleProducts();
    }

    hasInitialized = true;
  } catch (error) {
    handleDatabaseError(error);
  }
}

async function insertSampleProducts() {
  try {
    const { error } = await adminSupabase.from('products').insert(MOCK_PRODUCTS);
    if (error) throw error;
  } catch (error) {
    handleDatabaseError(error);
  }
}

export async function getProducts(): Promise<Product[]> {
  if (isOfflineMode) return MOCK_PRODUCTS;

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Product[];
  } catch (error) {
    handleDatabaseError(error);
    return MOCK_PRODUCTS;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (isOfflineMode) return MOCK_PRODUCTS.filter(p => p.featured);

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Product[];
  } catch (error) {
    handleDatabaseError(error);
    return MOCK_PRODUCTS.filter(p => p.featured);
  }
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<void> {
  if (isOfflineMode) {
    console.log('Update operation not available in offline mode');
    return;
  }

  try {
    const { error } = await adminSupabase
      .from('products')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    handleDatabaseError(error);
  }
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<void> {
  if (isOfflineMode) {
    console.log('Create operation not available in offline mode');
    return;
  }

  try {
    const { error } = await adminSupabase
      .from('products')
      .insert([product]);
    
    if (error) throw error;
  } catch (error) {
    handleDatabaseError(error);
  }
}

export async function deleteProduct(id: string): Promise<void> {
  if (isOfflineMode) {
    console.log('Delete operation not available in offline mode');
    return;
  }

  try {
    const { error } = await adminSupabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    handleDatabaseError(error);
  }
}