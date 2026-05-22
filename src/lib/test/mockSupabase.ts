import { vi } from 'vitest';

function createBuilder() {
  const builder: any = {
    select: vi.fn(() => builder),
    insert: vi.fn(() => builder),
    delete: vi.fn(() => builder),
    update: vi.fn(() => builder),
    eq: vi.fn(() => builder),
    single: vi.fn(),
    maybeSingle: vi.fn(),
  };

  builder.then = (resolve: any) =>
    Promise.resolve({ data: null, error: null }).then(resolve);

  return builder;
}

export const mockSupabase = {
  from: vi.fn(() => createBuilder()),
};
