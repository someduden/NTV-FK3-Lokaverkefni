import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useParams } from 'react-router';
import { useProduct } from '../hooks/useProduct';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) return <p>Loading...</p>;
  if (error || !product) return <p>Product not found</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.price_cents} ISK</CardDescription>
      </CardHeader>
      <img src={product.image_url} alt={product.name} />
      <CardContent>{product.description}</CardContent>
    </Card>
  );
}
