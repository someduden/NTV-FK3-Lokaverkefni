import { getProducts } from '../../../lib/shopApi';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '../model/product';

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });
}
