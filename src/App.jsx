import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage'
import Login from './pages/login.jsx'
import ProductDetails from './pages/productDetails.jsx';
import NotFound from './pages/notFound.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productDetails/:id" element={ <ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
