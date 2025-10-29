import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import AuthButton from './auth-button';
import CartButton from './cart-button';
import OrderHistoryButton from './orderHistory-button';

// Utility function to check if user has admin role
const isUserAdmin = () => {
    try {
        // Check if user data is stored in localStorage
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        return userData.role === 'admin';
    } catch {
        // Fallback for when userData is not properly stored
        // In a real implementation, you'd decode the JWT token to check role

        // For testing admin functionality, you can run this in browser console:
        // localStorage.setItem('userData', JSON.stringify({role: 'admin', username: 'admin'}))
        // localStorage.setItem('token', 'test-token')
        // Then refresh the page to see "Edit Products" link

        return false;
    }
};

const Header = ({navigationItems = []}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();

    // Handle auth state changes from AuthButton
    const handleAuthChange = ({isLoggedIn: loggedIn, isAdmin: admin}) => {
        setIsLoggedIn(loggedIn);
        setIsAdmin(admin);
    };

    // Check if user is logged in (initial check)
    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
            setIsAdmin(isUserAdmin());
        };

        checkAuthStatus();

        // Listen for storage changes to update auth status
        window.addEventListener('storage', checkAuthStatus);

        return () => {
            window.removeEventListener('storage', checkAuthStatus);
        };
    }, []);

    // Default navigation items if none provided (computed after state updates)
    const defaultNavItems = [
        {text: 'Home', href: '/'},
        {text: 'About', href: '/about'},
        {text: 'Write in Peace', href: '/write-in-peace'},
        {text: 'Shop Merch', href: '/products'},
        // Add admin link if user is admin
        ...(isAdmin ? [{text: 'Manage Products', href: '/add-product'}] : []),
    ];

    const navItems =
        navigationItems.length > 0 ? navigationItems : defaultNavItems;

    return (
        <header className='fixed top-0 w-full z-50 transition-all duration-300 bg-black hover:bg-white group'>
            <style jsx>{`
                .animated-link {
                    display: inline-block;
                    text-decoration: none;
                    transition: color 0.3s ease;
                    padding: 8px 12px;
                }
                .animated-link:hover,
                .animated-link.active-nav-link {
                    color: #e79210;
                }
                .group:hover .animated-link {
                    color: black;
                }
                .group:hover .animated-link:hover,
                .group:hover .animated-link.active-nav-link {
                    color: #e79210;
                }
            `}</style>
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
                <div className='flex-2 flex items-center justify-center gap-2'>
                    {navItems.map((item, index) => {
                        const isActive =
                            location.pathname === item.href ||
                            (item.href !== '/' &&
                                location.pathname.startsWith(item.href));
                        return (
                            <Link
                                key={index}
                                to={item.href}
                                className={`animated-link text-white ${isActive ? 'active-nav-link' : ''
                                    }`}
                            >
                                {item.text}
                            </Link>
                        );
                    })}
                </div>

                {/* Right: Login/Account Button And Cart*/}
                <div className='flex-1 flex items-center justify-end'>
                    <div className='flex gap-2'>
                        <OrderHistoryButton
                            variant='outline'
                            className='relative !text-white !border-white !bg-transparent group-hover:!text-black group-hover:!border-black hover:!bg-white/20 group-hover:hover:!bg-black/10'
                        />
                        <CartButton
                            variant='outline'
                            className='relative !text-white !border-white !bg-transparent group-hover:!text-black group-hover:!border-black hover:!bg-white/20 group-hover:hover:!bg-black/10'
                        />
                        {isLoggedIn ? (
                            <AuthButton
                                onAuthChange={handleAuthChange}
                                className='!bg-white !text-black hover:!bg-[#e79210] hover:!text-white group-hover:!bg-black group-hover:!text-white group-hover:hover:!bg-[#e79210]'
                            />
                        ) : (
                            <AuthButton
                                onAuthChange={handleAuthChange}
                                className='!bg-white !text-black hover:!bg-[#e79210] hover:!text-white group-hover:!bg-black group-hover:!text-white group-hover:hover:!bg-[#e79210]'
                            />
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
