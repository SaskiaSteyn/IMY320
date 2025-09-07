import { useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import FooterCard from '../cards/footer.jsx';
import Breadcrumbs from '../components/breadcrumbs.jsx';
import Header from '../components/header.jsx';
import { Button } from '../components/ui/button.jsx';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load cart items from localStorage
    useEffect(() => {
        const loadCartItems = () => {
            try {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                setCartItems(Array.isArray(cart) ? cart : []);
            } catch (error) {
                console.error('Error loading cart:', error);
                setCartItems([]);
            } finally {
                setLoading(false);
            }
        };

        loadCartItems();

        // Listen for storage changes to update cart
        const handleStorageChange = () => {
            loadCartItems();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Update localStorage when cart changes
    const updateCart = (newCart) => {
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        // Trigger storage event to update header cart count
        window.dispatchEvent(new Event('storage'));
    };

    // Handle quantity change
    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        updateCart(updatedCart);
    };

    // Handle item removal
    const handleRemoveItem = (itemId) => {
        const updatedCart = cartItems.filter((item) => item.id !== itemId);
        updateCart(updatedCart);
    };

    // Clear entire cart
    const handleClearCart = () => {
        updateCart([]);
    };

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    if (loading) {
        return (
            <div className='min-h-screen bg-[#19191a] flex items-center justify-center'>
                <Header />
                <div className='text-white text-xl'>Loading cart...</div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-[#19191a]'>
            <Header />

            {/* Hero Section */}
            <div className='pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-7xl mx-auto'>
                    <Breadcrumbs showShop={false} />
                    <div className='text-center'>
                        <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
                            Shopping Cart
                        </h1>
                        <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
                            Review your items and proceed to checkout when
                            ready.
                        </p>
                        <div className='w-24 h-1 bg-[#e79210] mx-auto'></div>
                    </div>
                </div>
            </div>

            {/* Top Action Buttons */}
            {cartItems.length > 0 && (
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8'>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center sm:justify-end'>
                        <Button
                            variant='secondary'
                            onClick={handleClearCart}
                            className='text-white'
                        >
                            Clear Cart
                        </Button>
                        <Link to='/products'>
                            <Button
                                variant='default'
                                className='w-full sm:w-auto'
                            >
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Cart Content */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
                {cartItems.length === 0 ? (
                    <div className='text-center py-16'>
                        <FaShoppingCart className='text-6xl text-gray-400 mx-auto mb-6' />
                        <div className='text-gray-400 text-xl mb-4'>
                            Your cart is empty
                        </div>
                        <p className='text-gray-500 mb-8'>
                            Add some amazing products to get started!
                        </p>
                        <Link to='/products'>
                            <Button>Shop Merch</Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className='space-y-6 mb-8'>
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className='bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl'
                                >
                                    <div className='flex flex-col md:flex-row'>
                                        {/* Product Image */}
                                        <div className='md:w-1/4 h-48 md:h-auto overflow-hidden'>
                                            <img
                                                src={
                                                    item.image ||
                                                    '/images/Write-in-peace-product-photo.png'
                                                }
                                                alt={item.name}
                                                className='w-full h-full object-cover'
                                                onError={(e) => {
                                                    // Fallback for subscription items or if primary image fails
                                                    if (
                                                        item.type ===
                                                        'subscription'
                                                    ) {
                                                        e.target.src =
                                                            '/images/Write-in-peace-product-photo.png';
                                                    } else {
                                                        e.target.src =
                                                            '/images/placeholder.png';
                                                    }
                                                }}
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className='md:w-3/4 p-6 flex flex-col justify-between'>
                                            <div>
                                                <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4'>
                                                    <div>
                                                        <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                                                            {item.name}
                                                        </h3>
                                                        <p className='text-lg text-gray-600 mb-2'>
                                                            R
                                                            {item.price.toFixed(
                                                                2
                                                            )}{' '}
                                                            {item.type ===
                                                            'subscription'
                                                                ? 'per month'
                                                                : 'each'}
                                                        </p>
                                                        {item.size &&
                                                            item.size !==
                                                                'One size' && (
                                                                <p className='text-sm text-gray-500 mb-2'>
                                                                    Size:{' '}
                                                                    {item.size}
                                                                </p>
                                                            )}
                                                    </div>

                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveItem(
                                                                item.id
                                                            )
                                                        }
                                                        className='text-red-500 hover:text-red-700 p-2 rounded-full transition-all duration-200'
                                                        title='Remove item'
                                                    >
                                                        <FaTrash className='w-5 h-5' />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Quantity Controls and Total */}
                                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                                                {/* Quantity Controls */}
                                                {item.type ===
                                                'subscription' ? (
                                                    <div className='flex items-center gap-2'>
                                                        <span className='text-sm font-medium text-gray-700 mr-3'>
                                                            Quantity: 1
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className='flex items-center gap-2'>
                                                        <span className='text-sm font-medium text-gray-700 mr-3'>
                                                            Quantity:
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item.id,
                                                                    item.quantity -
                                                                        1
                                                                )
                                                            }
                                                            className='p-2 border border-gray-300 rounded-lg flex items-center justify-center h-10 w-10 text-base font-bold hover:bg-gray-50 transition-colors'
                                                            disabled={
                                                                item.quantity <=
                                                                1
                                                            }
                                                        >
                                                            <FaMinus />
                                                        </button>
                                                        <div className='w-16 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-center text-lg font-medium bg-gray-50'>
                                                            {item.quantity}
                                                        </div>
                                                        <button
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item.id,
                                                                    item.quantity +
                                                                        1
                                                                )
                                                            }
                                                            className='p-2 border border-gray-300 rounded-lg flex items-center justify-center h-10 w-10 text-base font-bold hover:bg-gray-50 transition-colors'
                                                        >
                                                            <FaPlus />
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Item Total */}
                                                <div className='text-right'>
                                                    <p className='text-sm text-gray-500'>
                                                        {item.type ===
                                                        'subscription'
                                                            ? 'Monthly Price:'
                                                            : 'Subtotal:'}
                                                    </p>
                                                    <p className='text-2xl font-bold text-gray-900'>
                                                        R
                                                        {item.type ===
                                                        'subscription'
                                                            ? item.price.toFixed(
                                                                  2
                                                              )
                                                            : (
                                                                  item.price *
                                                                  item.quantity
                                                              ).toFixed(2)}
                                                        {item.type ===
                                                            'subscription' && (
                                                            <span className='text-sm text-gray-500 ml-1'>
                                                                /month
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className='rounded-lg shadow-lg p-6'>
                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                                <div className='text-left'>
                                    <p className='text-lg text-white mb-2'>
                                        Total ({cartItems.length} item
                                        {cartItems.length !== 1 ? 's' : ''}):
                                    </p>
                                    <p className='text-3xl font-bold text-[#e79210] mb-4'>
                                        R{totalPrice.toFixed(2)}
                                    </p>
                                </div>

                                <div className='text-right'>
                                    <Button
                                        size='lg'
                                        className='w-full sm:w-auto'
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <FooterCard />
        </div>
    );
}

export default Cart;
