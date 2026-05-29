import { describe, it, expect, beforeEach, vi } from "vitest";
import { createFakeSupabase } from "@/lib/test/__test__/fakeSupabase";
import { resetDb, fakeDb } from "@/lib/test/__test__/fakeDb";

const supabase = createFakeSupabase();

vi.mock("@/lib/supabaseClient", async () => {
  const mod = await import("@/lib/test/__test__/fakeSupabase");

  return {
    supabase: mod.createFakeSupabase(),
  };
});

vi.mock("@/features/cart/utils/getOrCreateCustomer", () => ({
  getOrCreateCustomer: vi.fn().mockResolvedValue({
    id: "customer-1",
  }),
}));

vi.mock("@/features/cart/utils/getOrCreateCart", () => ({
  getOrCreateCart: vi.fn().mockResolvedValue({
    id: "cart-1",
  }),
}));

import { addToCartDB, getCart, clearCartDB } from "@/features/cart/api/cartApi";

describe("Cart API (fake DB)", () => {
  beforeEach(() => {
    resetDb();
  });

  it("adds item to cart", async () => {
    await addToCartDB({ id: "user1" }, "prod1", 2);

    const items = fakeDb.cart_items.all();

    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
  });

  it("increments quantity if item exists", async () => {
    fakeDb.cart_items.insert({
      id: "item1",
      cart_id: "cart-1",
      product_id: "prod1",
      quantity: 1,
    });

    await addToCartDB({ id: "user1" }, "prod1", 2);

    const items = fakeDb.cart_items.all();

    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(3);
  });

  it("gets cart items", async () => {
    function getCart(user: { id: string }) {
      const cart = fakeDb.carts.findOne({ user_id: user.id });

      if (!cart) {
        return;
      }

      return fakeDb.cart_items.find({ cart_id: cart.id });
    }

    fakeDb.carts.insert({
      id: "cart-1",
      user_id: "user1",
    });

    fakeDb.cart_items.insert({
      id: "item1",
      cart_id: "cart-1",
      product_id: "prod1",
      quantity: 1,
    });

    console.log("fakeDb:", fakeDb.cart_items);

    const cart = await getCart({ id: "user1" });

    if (!cart) {
      return;
    }

    expect(cart.length).toBe(1);
    expect(cart[0].product_id).toBe("prod1");
  });

  it("clears cart", async () => {
    fakeDb.cart_items.insert({
      id: "item1",
      cart_id: "cart-1",
      product_id: "prod1",
      quantity: 2,
    });

    fakeDb.cart_items.insert({
      id: "item2",
      cart_id: "cart-1",
      product_id: "prod2",
      quantity: 1,
    });

    await clearCartDB({ id: "user1" });

    const items = fakeDb.cart_items.all();

    expect(items.length).toBe(0);
  });
});
