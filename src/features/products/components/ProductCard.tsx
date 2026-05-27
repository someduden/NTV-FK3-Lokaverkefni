import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import type { Product } from '../model/product';
import { Link } from 'react-router';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="h-80 flex flex-col hover:shadow-lg transition">
        <CardHeader>
          <p className="text-xs text-muted-foreground">{product.genre}</p>
          <h3 className="font-medium line-clamp-2">{product.name}</h3>
        </CardHeader>

        <CardContent className="flex-1 flex items-center justify-center">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-40 object-contain"
          />
        </CardContent>

        <div className="p-4 pt-0">
          <p className="font-semibold">
            {product.price_cents.toLocaleString()} kr.
          </p>
        </div>
      </Card>
    </Link>
  );
}
