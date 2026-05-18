import { useParams } from 'react-router';
import { useProduct } from '../hooks/useProduct';
import { useCart } from '@/features/cart/hooks/useCart';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id);
  const { addToCart } = useCart();

  if (isLoading) return <p>Loading...</p>;
  if (error || !product) return <p>Product not found</p>;

  return (
    <div className="max-w-6xl max-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <img src={product.image_url} alt={product.name} />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">
            {product.price_cents.toLocaleString()} kr.
          </p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          <button
            className="border px-3 py-2 rounded bg-orange-400 hover:shadow-lg transition"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
