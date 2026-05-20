import { ProductCard } from '@/features/products/components/ProductCard';
import { useCart } from '../hooks/useCart';

export function CartPage() {
  const { items, removeFromCart, clearCart } = useCart();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items
    .reduce((acc, item) => acc + item.product.price_cents * item.quantity, 0)
    .toLocaleString();

  return (
    <div className="p-2 flex flex-col gap-2">
      <h2>Cart Items</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">Your cart is empty</p>
      ) : (
        <ul className="flex">
          {items.map((item) => (
            <li key={item.product.id} className="">
              <ProductCard key={item.id} product={item.product} />
            </li>
          ))}
        </ul>
      )}

      <div>
        <span>Total:</span>
        <span>{total} kr.</span>
      </div>
    </div>
  );
}
