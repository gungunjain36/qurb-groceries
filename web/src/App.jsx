import { Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;