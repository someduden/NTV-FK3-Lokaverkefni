import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '../model/product';
import { Link } from 'react-router';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/recipes/${product.id}`}>
      <Card>
        <CardHeader>{product.Genre}</CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <img src={product.image_url} className="w-50 h-50"></img>
        <CardFooter>{product.price_cents} ISK</CardFooter>
      </Card>
    </Link>
  );
}
