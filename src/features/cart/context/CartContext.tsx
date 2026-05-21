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
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, user]);

  useEffect(() => {
    if (!user) return;

    const local = localStorage.getItem('cart');
    if (!local) return;

    const parsed = JSON.parse(local);

    parsed.forEach(async (item: any) => {
      await addToCartDB(user, item.product.id);
    });

    localStorage.removeItem('cart');
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const userId = user.id;

    async function loadCart() {
      const data = await getCart(userId);

      const formatted = data.map((item: any) => ({
        id: item.id,
        product: item.product,
        quantity: item.quantity,
      }));

      setItems(formatted);
    }

    loadCart();
  }, [user]);

  async function addToCart(product: Product) {
    if (user) {
      await addToCartDB(user, product.id);

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
        const existing = prev.find((item) => item.product.id === product.id);

        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          );
        }

        return [...prev, { product, quantity: 1 }];
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

      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    }
  }

  async function clearCart() {
    if (user) {
      await clearCartDB(user.id);
    }
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
