import { supabase } from '@/lib/supabaseClient';

export async function getOrCreateCart(customerId: string) {
  const { data: existingCart } = await supabase
    .from('carts')
    .select('*')
    .eq('customer_id', customerId)
    .single();

  if (existingCart) return existingCart;

  const { data, error } = await supabase
    .from('carts')
    .insert({
      customer_id: customerId,
      shop_id: '3f623d8e-032a-4e56-b6b4-6f7cb933d37f',
    })
    .select()
    .single();

  if (error) {
    console.error('error inserting cart', error);
    throw error;
  }

  return data;
}
