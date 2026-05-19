import type { Product } from '@/features/products/model/product';

export type CartItem = {
  id?: string;
  product: Product;
  quantity: number;
};
