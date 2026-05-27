import { z } from 'zod';

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price_cents: z.number(),
  currency: z.string(),
  stock_quantity: z.number().int().nonnegative(),
  image_url: z.string(),
  genre: z.string(),
});

export type Product = z.infer<typeof productSchema>;
