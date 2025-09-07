import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import App from './App.jsx';
import './global.css';
import About from './pages/about.jsx';
import Account from './pages/account.jsx';
import AddProduct from './pages/edit-products.jsx';
import AllProducts from './pages/all-products.jsx';
import Cart from './pages/cart.jsx';
import Category from './pages/category.jsx';
import Community from './pages/community.jsx';
import CreateProduct from './pages/create-product.jsx';
import Generate from './pages/generate.jsx';
import Guides from './pages/guides.jsx';
import Login from './pages/login.jsx';
import ProductPage from './pages/product.jsx';
import Signup from './pages/signup.jsx';
import WeeklyChallenge from './pages/weekly-challenge.jsx';
import WriteInPeace from './pages/write-in-peace.jsx';
import ScrollToTop from './scroll-to-top.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/write-in-peace' element={<WriteInPeace />} />
                <Route path='/generate' element={<Generate />} />
                <Route path='/weekly-challenge' element={<WeeklyChallenge />} />
                <Route path='/guides' element={<Guides />} />
                <Route path='/community' element={<Community />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/account' element={<Account />} />
                <Route path='/product/:id' element={<ProductPage />} />
                <Route path='/category/:categoryName' element={<Category />} />
                <Route path='/products' element={<AllProducts />} />
                <Route path='/all-products' element={<AllProducts />} />
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/create-product' element={<CreateProduct />} />
                <Route path='/cart' element={<Cart />} />
            </Routes>
        </Router>
    </StrictMode>
);
