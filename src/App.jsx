import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage'
import Login from './pages/login.jsx'
import NotFound from './pages/notFound.jsx';

function App() {

  const products = [
    { title: 'Cabbage', id: 1, img_url: 'https://tse4.mm.bing.net/th/id/OIP.kqFZ4oqq-gW4nR9ju0WCQwHaEK?w=307&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1' },
    { title: 'Ajo de plantas vs zombies', id: 2, img_url: 'https://tse2.mm.bing.net/th/id/OIP.xPX1LleE84_kz9mhi4_74AHaG4?w=179&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1' },
    { title: 'Manzana de apple', id: 3, img_url: 'https://tse2.mm.bing.net/th/id/OIP.YVF2PDPlkiC0VzwhNQ6EMQHaHa?w=175&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1' },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
