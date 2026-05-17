import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';

export function ProductListPage() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Error loading products</p>;

  return (
    <section>
      <h2 className="text-black p-4">Manga</h2>
      <div className="flex gap-4 justify-center">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
