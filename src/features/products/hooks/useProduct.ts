import { useQuery } from '@tanstack/react-query';
import type { Product } from '../model/product';
import { getProductById } from '@/lib/shopApi';

export function useProduct(id: string | undefined) {
  return useQuery<Product>({
    queryKey: ['products', id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });
}
