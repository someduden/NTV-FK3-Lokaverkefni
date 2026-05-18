import type { Product } from '@/features/products/model/product';

export type CartItem = {
  product: Product;
  quantity: number;
};
