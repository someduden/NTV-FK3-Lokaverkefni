import { useAuth } from '@/features/auth/hooks/useAuth';
import { useCart } from '@/features/cart/hooks/useCart';
import { Button } from '@/shared/components/ui/button';
import { useState } from 'react';
import { createOrder } from '../api/checkoutApi';

export function CheckoutPage() {
  const { items, clearCart } = useCart();

  const { user } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.product.price_cents * item.quantity,
    0,
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in');
      return;
    }

    handleCheckout();
  }

  async function handleCheckout() {
    if (!user) {
      alert('You must be logged in');
      return;
    }

    setLoading(true);

    try {
      await createOrder(user, items);

      clearCart();

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Checkout failed');
    }

    setLoading(false);
  }

  if (success) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Placed!</h1>
        <p>Thanks for your money, loser</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-10 p-10">
      <div>
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <div className="space-y-4">
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <input
              name="zip"
              placeholder="ZIP Code"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <div className="mt-8">
              <h3 className="font-semibold mb-2">Payment</h3>
              <div className="border p-4 rounded bg-gray-50 text-sm text-gray-600">
                This is a demo checkout. No real payment will be processed.
              </div>
            </div>

            <Button
              variant="secondary"
              type="submit"
              disabled={loading || items.length === 0}
              className="mt-6 w-full bg-black text-white py-3 rounded hover:opacity-90"
            >
              {loading ? 'Processing...' : `Pay ${total.toLocaleString()} kr.`}
            </Button>
          </form>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between">
            <div>
              <p>{item.product.name}</p>
              <p className="text-sm text-gray-500">x{item.quantity}</p>
            </div>
            <p>
              {(item.product.price_cents * item.quantity).toLocaleString()} kr.
            </p>
          </div>
        ))}
      </div>

      <div className="border-t mt-6 pt-4 flex justify-between font-bold">
        <span>Total</span>
        <span>{total.toLocaleString()} kr.</span>
      </div>
    </div>
  );
}
