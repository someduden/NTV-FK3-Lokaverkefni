import type { Product } from '@/features/products/model/product';
import type { CartItem } from '../model/cart';
import { createContext, useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import {
  getCart,
  addToCartDB,
  removeFromCartDB,
  clearCartDB,
} from '../api/cartApi';

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, change: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    async function initCart() {
      await syncLocalCartToDB(user);

      if (!user) return;
      const data = await getCart(user);

      setItems(
        data.map((item: any) => ({
          id: item.id,
          product: item.product,
          quantity: item.quantity,
        })),
      );
    }

    initCart();
  }, [user]);

  async function syncLocalCartToDB(user: any) {
    const local = localStorage.getItem('cart');
    if (!local) return;

    const parsed = JSON.parse(local);

    await Promise.all(
      parsed.map((item: any) =>
        addToCartDB(user, item.product.id, item.quantity),
      ),
    );
  }

  async function refreshCart() {
    if (!user) return;

    const data = await getCart(user);

    setItems(
      data.map((item: any) => ({
        id: item.id,
        product: item.product,
        quantity: item.quantity,
      })),
    );
  }

  async function addToCart(product: Product) {
    if (user) {
      await addToCartDB(user, product.id);
      await refreshCart();

      const updated = await getCart(user);

      setItems(
        updated.map((item: any) => ({
          id: item.id,
          product: item.product,
          quantity: item.quantity,
        })),
      );
    } else {
      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);

        const updated = existing
          ? prev.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            )
          : [...prev, { product, quantity: 1 }];

        localStorage.setItem('cart', JSON.stringify(updated));

        return updated;
      });
    }
  }

  async function updateQuantity(productId: string, change: number) {
    if (user) {
      const item = items.find((i) => i.product.id === productId);

      if (!item) return;

      const newQuantity = item.quantity + change;

      if (newQuantity <= 0) {
        if (!item?.id) return;
        await removeFromCartDB(item.id);

        setItems((prev) => prev.filter((i) => i.product.id !== productId));

        return;
      }

      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId ? { ...i, quantity: newQuantity } : i,
        ),
      );
    } else {
      setItems((prev) =>
        prev
          .map((i) =>
            i.product.id === productId
              ? { ...i, quantity: i.quantity + change }
              : i,
          )
          .filter((i) => i.quantity > 0),
      );
    }
  }

  async function removeFromCart(productId: string) {
    if (user) {
      const item = items.find((i) => i.product.id === productId);
      if (!item?.id) return;

      await removeFromCartDB(item.id);
      await refreshCart();

      const updated = await getCart(user);
      setItems(
        updated.map((item: any) => ({
          id: item.id,
          product: item.product,
          quantity: item.quantity,
        })),
      );
    } else {
      const updated = items.filter((i) => i.product.id !== productId);

      setItems(updated);
      localStorage.setItem('cart', JSON.stringify(updated));
    }
  }

  async function clearCart() {
    if (user) {
      await clearCartDB(user);
      await refreshCart();
    }

    setItems([]);

    localStorage.removeItem('cart');
  }

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
