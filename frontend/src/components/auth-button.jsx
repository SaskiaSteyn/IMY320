import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

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

const AuthButton = ({
    variant = 'default',
    className = '',
    onAuthChange = null,
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user is logged in
    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem('token');
            const loggedIn = !!token;
            const admin = isUserAdmin();

            setIsLoggedIn(loggedIn);

            // Notify parent component of auth state change if callback provided
            if (onAuthChange) {
                onAuthChange({isLoggedIn: loggedIn, isAdmin: admin});
            }
        };

        checkAuthStatus();

        // Listen for storage changes to update auth status
        window.addEventListener('storage', checkAuthStatus);

        return () => {
            window.removeEventListener('storage', checkAuthStatus);
        };
    }, [onAuthChange]);

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('cart');

        // Update state
        setIsLoggedIn(false);

        // Dispatch storage event to update other components
        window.dispatchEvent(new Event('storage'));

        // Redirect to home page
        window.location.href = '/';
    };

    // Button variant styles matching the Button component
    const getVariantStyles = (variant) => {
        const variants = {
            default: 'bg-white text-black hover:bg-[#e79210] border border-transparent transition-all',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-transparent hover:border-red-600',
            outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-400',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent hover:border-gray-400',
            ghost: 'hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-gray-300',
            link: 'text-primary underline-offset-4 hover:underline border border-transparent',
        };
        return variants[variant] || variants.default;
    };

    const baseButtonStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2';

    if (isLoggedIn) {
        return (
            <button
                onClick={handleLogout}
                className={`${baseButtonStyles} ${getVariantStyles(variant)} ${className}`}
            >
                Logout
            </button>
        );
    }

    return (
        <Link
            to='/login'
            className={`${baseButtonStyles} ${getVariantStyles(variant)} ${className}`}
        >
            Login
        </Link>
    );
};

export default AuthButton;
