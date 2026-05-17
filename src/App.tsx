import { Route, Routes } from 'react-router';
import './App.css';
import { ProductListPage } from './features/products/pages/ProductListPage';
import { Layout } from './shared/components/Layout';
import { ProductDetails } from './features/products/components/ProductDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductListPage />} />
        <Route path="/recipes/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
