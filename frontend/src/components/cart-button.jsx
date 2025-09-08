import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from './ui/button-header';

const CartButton = ({ variant = 'outline', className = '' }) => {
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

    return (
        <Button variant={variant} asChild className={className}>
            <Link to='/cart' className='flex items-center gap-2'>
                <FaShoppingCart className='w-4 h-4' />
                Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
        </Button>
    );
};

export default CartButton;
