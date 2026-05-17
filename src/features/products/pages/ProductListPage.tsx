import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { useEffect, useState } from 'react';
import { useGenres } from '../hooks/useGenres';

export function ProductListPage() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const {
    data: products,
    isLoading,
    error,
  } = useProducts({
    search,
  });

  const { data: genres = [] } = useGenres();
  const [genre, setGenre] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="flex">
      <div className="flex flex-col gap-4 justify-center">
        <h2 className="text-black p-4">Manga</h2>
        <div className="flex gap-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* FILTERAR OG DRASL HÉR */}
      <div className="flex flex-col gap-4 p-5">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All categories</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
