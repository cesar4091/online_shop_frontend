import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage'
import Login from './pages/login.jsx'
import ProductDetails from './pages/productDetails.jsx';
import NotFound from './pages/notFound.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Register from './pages/registration_.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';

function App() {

  return (
    <BrowserRouter>
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productDetails/:id" element={ <ProductDetails />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thanks" element={<ThankYouPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
