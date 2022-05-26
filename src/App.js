import { Route, Routes } from 'react-router-dom';
import './App.css';
import Error404 from './components/Error404';
import Cart from './features/Cart';
import Footer from './features/Footer';
import Header from './features/Header';
import DetailPage from './features/Products/pages/DetailPage';
import ListPage from './features/Products/pages/ListPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<ListPage />} />
        <Route path="/:productId/*" element={<DetailPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/error" element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
