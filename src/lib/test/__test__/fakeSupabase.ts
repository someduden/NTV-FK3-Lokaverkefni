import { fakeDb } from './fakeDb';

type Builder = {
  _updates?: any;
  _isDelete?: boolean;

  select: () => Builder;
  eq: (key: string, value: any) => Builder;
  maybeSingle: () => Promise<any>;
  single: () => Promise<any>;
  then: (resolve: any) => Promise<any>;
  insert: (payload: any) => Promise<any>;
  update: (updates: any) => Builder;
  delete: () => Builder;
};

export function createFakeSupabase() {
  return {
    from(table: 'cart_items') {
      return createQuery(table);

      function createQuery(table: 'cart_items') {
        let filters: Record<string, any> = {};
        let updates: any = null;
        let isDelete = false;

        const builder: Builder = {
          _updates: undefined,
          _isDelete: false,

          select() {
            return this;
          },

          eq(key: string, value: any) {
            filters[key] = value;

            if (updates) {
              const existing = fakeDb[table].findOne(filters);
              if (existing) {
                fakeDb[table].update(existing.id, updates);
              }
              updates = null;
            }

            if (isDelete) {
              fakeDb[table].delete(filters);
              isDelete = false;
            }

            return this;
          },

          maybeSingle() {
            const data = fakeDb[table].findOne(filters);
            return Promise.resolve({ data, error: null });
          },

          single() {
            const data = fakeDb[table].findOne(filters);
            return Promise.resolve({ data, error: null });
          },

          then(resolve: any) {
            console.log('FILTERS:', filters);
            console.log('ALL ROWS:', fakeDb[table].all());

            const data = fakeDb[table].find(filters);
            return Promise.resolve({ data, error: null }).then(resolve);
          },

          insert(payload: any) {
            if (Array.isArray(payload)) {
              payload.forEach((p) => fakeDb[table].insert(p));
            } else {
              fakeDb[table].insert(payload);
            }
            return Promise.resolve({ data: payload, error: null });
          },

          update(u: any) {
            updates = u;
            return this;
          },

          delete() {
            isDelete = true;
            return this;
          },
        };

        return builder;
      }
    },
  };
}
