import './App.css';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ummgqxuzxnmltylxggvq.supabase.co',
  'sb_publishable_1vhPvmZx9MamVXwnmnhDQg_pl35yn1w',
);

const shopId = '3f623d8e-032a-4e56-b6b4-6f7cb933d37f';

const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('shop_id', shopId);

console.log(data);
console.log(error?.message);

function App() {
  return <div></div>;
}

export default App;
