import { Route, Routes } from 'react-router-dom';
import './App.css';
import Error404 from './components/Error404';
import Cart from './features/Cart';
import Footer from './features/Footer';
import ProductFeature from './features/Products';
import DetailPage from './features/Products/pages/DetailPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<ProductFeature />} />
        <Route path="/:productId/*" element={<DetailPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/error" element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
