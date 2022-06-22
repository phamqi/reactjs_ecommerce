import { Route, Routes } from 'react-router-dom';
import Error404 from './components/Error404';
import Footer from './features/Footer';
import Header from './features/Header';
import CartPage from './pages/CartPage';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import Personal from './personal';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/:productId/*" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/error" element={<Error404 />} /> */}
        <Route path="/error" element={<Personal />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
