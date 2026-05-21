import type { CartItem } from '@/features/cart/model/cart';
import { getOrCreateCart } from '@/features/cart/utils/getOrCreateCart';
import { getOrCreateCustomer } from '@/features/cart/utils/getOrCreateCustomer';
import { supabase } from '@/lib/supabaseClient';

export async function createOrder(user: any, items: CartItem[]) {
  const customer = await getOrCreateCustomer(user);
  const cart = await getOrCreateCart(customer.id);

  const shopId = '3f623d8e-032a-4e56-b6b4-6f7cb933d37f';

  const subtotal_cents = items.reduce(
    (sum, item) => sum + item.product.price_cents * item.quantity,
    0,
  );

  const total_cents = subtotal_cents;

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      shop_id: shopId,
      customer_id: customer.id,
      status: 'pending',
      subtotal_cents,
      total_cents,
      submitted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (orderError) {
    console.error('order error:', orderError);
    throw orderError;
  }

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_name: item.product.name,
    unit_price_cents: item.product.price_cents,
    quantity: item.quantity,
    line_total_cents: item.product.price_cents * item.quantity,
    product_id: item.product.id,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('order items error:', itemsError);
    throw itemsError;
  }

  await supabase.from('cart_items').delete().eq('cart_id', cart.id);

  return order;
}
