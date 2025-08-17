import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App.jsx';
import './global.css';
import About from './pages/about.jsx';
import Account from './pages/account.jsx';
import Community from './pages/community.jsx';
import Generate from './pages/generate.jsx';
import Guides from './pages/guides.jsx';
import Login from './pages/login.jsx';
import ProductPage from './pages/product.jsx';
import Signup from './pages/signup.jsx';
import WeeklyChallenge from './pages/weekly-challenge.jsx';
import WriteInPeace from './pages/write-in-peace.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
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
            </Routes>
        </Router>
    </StrictMode>
);
