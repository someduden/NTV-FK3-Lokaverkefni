import { supabase } from '../../../lib/supabaseClient';
import type { Product } from '@/features/products/model/product';

const shopId = '3f623d8e-032a-4e56-b6b4-6f7cb933d37f';

type ProductFilters = {
  search?: string;
  genre?: string;
};

export async function getProducts(
  filters: ProductFilters = {},
): Promise<Product[]> {
  let query = supabase.from('products').select('*').eq('shop_id', shopId);

  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  if (filters.genre) {
    query = query.eq('genre', filters.genre);
  }

  const { data, error } = await query;

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
