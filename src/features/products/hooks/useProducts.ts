import { getProducts } from '../API/shopApi';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '../model/product';

type Filters = {
  search?: string;
  genre?: string;
};

export function useProducts(filters: Filters) {
  return useQuery<Product[]>({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  });
}
