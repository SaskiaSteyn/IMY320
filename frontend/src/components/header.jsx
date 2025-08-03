import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ navigationItems = [] }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hideTimer, setHideTimer] = useState(null);

    // Default navigation items if none provided
    const defaultNavItems = [
        { text: 'Home', href: '/' },
        { text: 'Write in Peace', href: '/write-in-peace' },
        { text: 'Account', href: '/account' },
        { text: 'About', href: '/about' },
    ];

    const navItems =
        navigationItems.length > 0 ? navigationItems : defaultNavItems;

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
        <header
            className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 p-4 transition-all duration-300 ${
                isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-full'
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <nav className='header-nav flex items-center gap-3'>
                {/* Navigation Items */}
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.href}
                        className='header-nav-item cta-button text-white text-sm px-4 py-2'
                    >
                        {item.text}
                    </Link>
                ))}

                {/* Special Login Button */}
                <Link
                    to='/login'
                    className='header-nav-item cta-button text-white text-sm px-4 py-2'
                    style={{ backgroundColor: 'var(--forest)' }}
                >
                    Login
                </Link>
            </nav>
        </header>
    );
};

export default Header;
