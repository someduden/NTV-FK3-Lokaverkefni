import { ProductCard } from "@/features/products/components/ProductCard";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useState } from "react";

export function HomePage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  const {
    data: products,
    isLoading,
    error,
  } = useProducts({
    search,
    genre,
  });

  return (
    <section>
      <div className="flex flex-col gap-5">
        <h3 className="border-b-2">Top Sellers</h3>
        <div className="flex">
          {products?.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <h3 className="border-b-2">Popular Mangas</h3>
        <div className="flex">
          {products?.slice(4, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
