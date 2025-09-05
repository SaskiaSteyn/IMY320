import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from './ui/button-header';

const Header = ({ navigationItems = [] }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    // Update cart count (unique items, not quantity)
    useEffect(() => {
        const updateCartCount = () => {
            try {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                setCartCount(Array.isArray(cart) ? cart.length : 0);
            } catch {
                setCartCount(0);
            }
        };
        updateCartCount();
        window.addEventListener('storage', updateCartCount);
        return () => window.removeEventListener('storage', updateCartCount);
    }, []);

    // Default navigation items if none provided
    const defaultNavItems = [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' },
        { text: 'Write in Peace', href: '/write-in-peace' },
    ];

    const navItems =
        navigationItems.length > 0 ? navigationItems : defaultNavItems;

    // Check if user is logged in
    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkAuthStatus();

        // Listen for storage changes to update auth status
        window.addEventListener('storage', checkAuthStatus);

        return () => {
            window.removeEventListener('storage', checkAuthStatus);
        };
    }, []);

    return (
        <header className='fixed top-0 w-full z-50 transition-all duration-300 bg-black hover:bg-white group'>
            <nav className='flex items-center justify-between w-full px-8 py-4'>
                {/* Left: Cove logo/text */}
                <div className='flex-1 flex items-center'>
                    <Link
                        to='/'
                        className='text-2xl font-bold text-white group-hover:text-black transition-colors'
                    >
                        Cove.
                    </Link>
                </div>

                {/* Center: Navigation Items */}
                <div className='flex-1 flex items-center justify-center gap-2'>
                    {navItems.map((item, index) => (
                        <Button
                            key={index}
                            variant='ghost'
                            asChild
                            className='!text-white group-hover:!text-black !bg-transparent hover:!bg-white/20 group-hover:hover:!bg-black/10'
                        >
                            <Link to={item.href}>{item.text}</Link>
                        </Button>
                    ))}
                </div>

                {/* Right: Login/Account Button And Cart*/}
                <div className='flex-1 flex items-center justify-end'>
                    <div className='flex gap-2'>
                        <Button
                            variant='outline'
                            asChild
                            className='relative !text-white !border-white !bg-transparent group-hover:!text-black group-hover:!border-black hover:!bg-white/20 group-hover:hover:!bg-black/10'
                        >
                            <Link
                                to='/cart'
                                className='flex items-center gap-2'
                            >
                                {cartCount > 0 && (
                                    <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                                        {cartCount}
                                    </span>
                                )}
                                <FaShoppingCart className='w-4 h-4' />
                                Cart
                            </Link>
                        </Button>
                        <Button
                            asChild
                            className='!bg-white !text-black hover:!bg-gray-100 group-hover:!bg-black group-hover:!text-white group-hover:hover:!bg-gray-800'
                        >
                            <Link to={isLoggedIn ? '/account' : '/login'}>
                                {isLoggedIn ? 'Account' : 'Login'}
                            </Link>
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
