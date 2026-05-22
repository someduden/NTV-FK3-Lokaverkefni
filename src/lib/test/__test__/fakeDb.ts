type CartItem = {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
};

let cartItems: CartItem[] = [];

export const resetDb = () => {
  cartItems = [];
};

export const fakeDb = {
  cart_items: {
    find(filters: Record<string, any>) {
      const rows = this.all();

      if (!filters || Object.keys(filters).length === 0) {
        return rows; // ✅ return all if no filters
      }

      return rows.filter((row: any) =>
        Object.entries(filters).every(([k, v]) => row[k] === v),
      );
    },

    findOne: (filters: Partial<CartItem>) =>
      cartItems.find((item) =>
        Object.entries(filters).every(
          ([key, value]) => item[key as keyof CartItem] === value,
        ),
      ) || null,

    insert: (item: CartItem) => {
      cartItems.push(item);
      return item;
    },

    update: (id: string, updates: Partial<CartItem>) => {
      const item = cartItems.find((i) => i.id === id);
      if (item) Object.assign(item, updates);
      return item;
    },

    delete: (filters: Partial<CartItem>) => {
      cartItems = cartItems.filter(
        (item) =>
          !Object.entries(filters).every(
            ([key, value]) => item[key as keyof CartItem] === value,
          ),
      );
    },

    all: () => cartItems,
  },
};
