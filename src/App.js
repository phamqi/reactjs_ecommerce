import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Error404 from './components/Error404';
import Footer from './features/Footer';
import Header from './features/Header';
import CartPage from './pages/CartPage';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';

function App() {
  const [ready, setReady] = useState(true);
  useEffect(() => {
    setReady(false);
  }, []);
  return (
    <div>
      {ready ? (
        <div className="loading"></div>
      ) : (
        <>
          <Header />
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="products/:productId/*" element={<DetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/error" element={<Error404 />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
