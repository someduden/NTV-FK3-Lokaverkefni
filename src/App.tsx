import { Route, Routes } from 'react-router';
import './App.css';
import { ProductListPage } from './features/products/pages/ProductListPage';
import { Layout } from './shared/components/Layout';
import { ProductDetails } from './features/products/components/ProductDetails';
import { HomePage } from './features/shell/pages/HomePage';
import { CartPage } from './features/cart/pages/CartPage';
import { CheckoutPage } from './features/checkout/page/CheckoutPage';
import { OrderHistory } from './features/orders/pages/OrderHistory';
import { OrderDetails } from './features/orders/pages/OrderDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
