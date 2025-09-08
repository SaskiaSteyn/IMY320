import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button-header';

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
                onAuthChange({ isLoggedIn: loggedIn, isAdmin: admin });
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

    if (isLoggedIn) {
        return (
            <Button
                onClick={handleLogout}
                variant={variant}
                className={className}
            >
                Logout
            </Button>
        );
    }

    return (
        <Button asChild variant={variant} className={className}>
            <Link to='/login'>Login</Link>
        </Button>
    );
};

export default AuthButton;
