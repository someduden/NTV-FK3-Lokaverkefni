import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CartProvider, CartContext } from '@/features/cart/context/CartContext';
import { useContext } from 'react';
import { AuthProvider } from '@/features/auth/context/AuthContext';

vi.mock('@/lib/supabaseClient', async () => {
  const mod = await import('@/lib/test/mockSupabase');
  return { supabase: mod.mockSupabase };
});

function TestComponent() {
  const cart = useContext(CartContext)!;

  return (
    <div>
      <button
        onClick={() =>
          cart.addToCart({
            id: '1',
            name: 'Book',
            price_cents: 1000,
          } as any)
        }
      >
        Add
      </button>

      <span data-testid="count">{cart.items.length}</span>
    </div>
  );
}

describe('Cart Context', () => {
  it('adds item to cart (guest)', async () => {
    render(
      <AuthProvider>
        <CartProvider>
          <TestComponent />
        </CartProvider>
      </AuthProvider>,
    );

    await userEvent.click(screen.getByText('Add'));

    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });
});
