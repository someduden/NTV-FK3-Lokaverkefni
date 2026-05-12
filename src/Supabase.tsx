import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ummgqxuzxnmltylxggvq.supabase.co/rest/v1/',
  'sb_publishable_1vhPvmZx9MamVXwnmnhDQg_pl35yn1w',
);

const { data, error } = await supabase.from('characters').select();

export function Supabase() {
  return (
    <div>
      <p>{data}</p>
      <p>{error?.message}</p>
    </div>
  );
}
