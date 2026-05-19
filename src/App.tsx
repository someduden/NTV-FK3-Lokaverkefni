import { Route, Routes } from 'react-router';
import './App.css';
import { ProductListPage } from './features/products/pages/ProductListPage';
import { Layout } from './shared/components/Layout';
import { ProductDetails } from './features/products/components/ProductDetails';
import { HomePage } from './features/shell/pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
