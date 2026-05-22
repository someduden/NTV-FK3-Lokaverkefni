import { supabase } from '@/lib/supabaseClient';

export async function getOrCreateCustomer(user: any) {
  const { data: existing } = await supabase
    .from('shop_customers')
    .select('*')
    .eq('email', user.email)
    .maybeSingle();

  if (existing) return existing;

  const { data, error } = await supabase
    .from('shop_customers')
    .insert({
      shop_id: '3f623d8e-032a-4e56-b6b4-6f7cb933d37f',
      name: user.email,
      email: user.email,
    })
    .select()
    .single();

  if (error) {
    console.error('error inserting user', error);
    throw error;
  }

  return data;
}
