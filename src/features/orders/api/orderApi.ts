import { getOrCreateCustomer } from '@/features/cart/utils/getOrCreateCustomer';
import { supabase } from '@/lib/supabaseClient';

export async function getOrders(user: any) {
  const customer = await getOrCreateCustomer(user);

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_id', customer.id)
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }

  return data;
}

export async function getOrderById(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items (*)')
    .eq('id', orderId)
    .maybeSingle();

  if (error) {
    console.error('error fetching order:', error);
    throw error;
  }

  return data;
}
