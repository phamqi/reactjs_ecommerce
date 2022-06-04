import { Route, Routes } from 'react-router-dom';
import Error404 from './components/Error404';
import Cart from './features/Cart';
import Footer from './features/Footer';
import Header from './features/Header';
import DetailPage from './features/Products/pages/DetailPage';
import MainPage from './features/Products/pages/MainPage';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/:productId/*" element={<DetailPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/error" element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
