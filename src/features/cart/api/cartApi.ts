import { supabase } from '@/lib/supabaseClient';
import { getOrCreateCustomer } from '../utils/getOrCreateCustomer';
import { getOrCreateCart } from '../utils/getOrCreateCart';

export async function getCart(user: any) {
  const customer = await getOrCreateCustomer(user);

  const { data, error } = await supabase
    .from('cart_items')
    .select('*, product:products(*), cart:carts!inner(customer_id)')
    .eq('cart.customer_id', customer.id);

  if (error) {
    console.error('getCart error:', error);
    throw error;
  }

  return data;
}

export async function addToCartDB(user: any, productId: string) {
  const customer = await getOrCreateCustomer(user);

  const cart = await getOrCreateCart(customer.id);

  const { data: existing, error: fetchError } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cart.id)
    .eq('product_id', productId)
    .maybeSingle();

  if (fetchError) {
    console.error('fetch existing error:', fetchError);
  }

  if (existing) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + 1 })
      .eq('id', existing.id);

    if (error) {
      console.error('update error:', error);
    }
  } else {
    const { error } = await supabase.from('cart_items').insert({
      cart_id: cart.id,
      product_id: productId,
      quantity: 1,
    });

    if (error) {
      console.error('insert error:', error);
    }
  }
}

export async function removeFromCartDB(id: string) {
  const { error } = await supabase.from('cart_items').delete().eq('id', id);

  if (error) {
    console.error('remove error:', error);
  }
}

export async function clearCartDB(userId: string) {
  const customer = await getOrCreateCustomer(userId);
  const cart = await getOrCreateCart(customer.id);

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cart.id);

  if (error) {
    console.error('clear error:', error);
  }
}
