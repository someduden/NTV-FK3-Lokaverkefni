import { supabase } from '../../../lib/supabaseClient';

const shopId = '3f623d8e-032a-4e56-b6b4-6f7cb933d37f';

export async function getGenres(): Promise<string[]> {
  const { data, error } = await supabase
    .from('products')
    .select('genre')
    .eq('shop_id', shopId);

  if (error) throw error;

  const uniqueGenres = Array.from(
    new Set((data ?? []).map((item) => item.genre).filter(Boolean)),
  );

  return uniqueGenres;
}
