import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = ({ navigationItems = [] }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hideTimer, setHideTimer] = useState(null);
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

    useEffect(() => {
        let scrollTimeout;

        const handleScroll = () => {
            // Show navbar when scrolling
            setIsVisible(true);

            // Clear existing timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            // Clear hide timer when scrolling
            if (hideTimer) {
                clearTimeout(hideTimer);
                setHideTimer(null);
            }

            // Set timeout to start hide timer after scrolling stops
            scrollTimeout = setTimeout(() => {
                if (!isHovered) {
                    const timer = setTimeout(() => {
                        setIsVisible(false);
                    }, 5000); // Hide after 5 seconds
                    setHideTimer(timer);
                }
            }, 150); // Wait 150ms after scroll stops
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            if (hideTimer) {
                clearTimeout(hideTimer);
            }
        };
    }, [isHovered, hideTimer]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        setIsVisible(true);
        // Clear hide timer when hovering
        if (hideTimer) {
            clearTimeout(hideTimer);
            setHideTimer(null);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Start hide timer when not hovering
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);
        setHideTimer(timer);
    };

    return (
        <>
            {/* Hover zone at the very top of the page to reveal navbar */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: 32,
                    zIndex: 60,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <header
                className={`fixed top-0 transform w-full z-50 transition-all duration-300 ${
                    isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-full'
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <nav className='header-nav flex items-center justify-between w-full px-8 py-2'>
                    {/* Left: Cove logo/text */}
                    <div className='flex-1 flex items-center'>
                        <span className='text-2xl font-bold header-logo text-black'>
                            Cove.
                        </span>
                    </div>
                    {/* Center: Navigation Items */}
                    <div className='flex-1 flex items-center justify-center gap-3'>
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.href}
                                className='header-nav-item header-button text-[#19191a] text-sm px-4 py-2'
                            >
                                {item.text}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Login/Account Button And Cart*/}
                    <div className='flex-1 flex items-center justify-end'>
                        <div className='flex gap-3'>
                            <Link
                                to='/cart'
                                className='cta-button flex items-center justify-center w-32 px-4 h-10 text-white font-medium rounded-lg shadow transition-all duration-200 relative'
                                style={{ backgroundColor: 'var(--cafe)' }}
                            >
                                {/* Cart badge absolutely positioned relative to the button */}
                                {cartCount > 0 && (
                                    <span className='absolute top-1 right-5 bg-white text-[var(--cafe)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-[var(--cafe)] shadow z-10'>
                                        {cartCount}
                                    </span>
                                )}
                                <span className='flex items-center justify-center w-full h-full'>
                                    <FaShoppingCart className='w-5 h-5 mr-2' />
                                    <span className='flex items-center justify-center w-full h-full text-center'>
                                        Cart
                                    </span>
                                </span>
                            </Link>
                            <Link
                                to={isLoggedIn ? '/account' : '/login'}
                                className='cta-button flex items-center justify-center w-32 px-4 h-10 text-white font-medium rounded-lg shadow transition-all duration-200'
                                style={{ backgroundColor: 'var(--forest)' }}
                            >
                                <span className='flex items-center justify-center w-full h-full text-center'>
                                    {isLoggedIn ? 'Account' : 'Login'}
                                </span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
