import { supabase } from './supabaseClient';
import type { Product } from '@/features/products/model/product';

const shopId = '3f623d8e-032a-4e56-b6b4-6f7cb933d37f';

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('shop_id', shopId);

  if (error) throw error;
  return data ?? [];
}

export async function getProductById(id: string): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}
