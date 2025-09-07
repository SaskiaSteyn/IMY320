import { useEffect, useState } from 'react';
import {
    FaApple,
    FaCreditCard,
    FaGooglePay,
    FaLock,
    FaPaypal,
    FaShieldAlt,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import FooterCard from '../cards/footer.jsx';
import Breadcrumbs from '../components/breadcrumbs.jsx';
import Header from '../components/header.jsx';
import { Button } from '../components/ui/button.jsx';

function Checkout() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    // Form states
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
    });

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'South Africa',
    });

    const [cardInfo, setCardInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
    });

    // Load cart items
    useEffect(() => {
        const loadCartItems = () => {
            try {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                if (cart.length === 0) {
                    navigate('/cart');
                    return;
                }
                setCartItems(Array.isArray(cart) ? cart : []);
            } catch (error) {
                console.error('Error loading cart:', error);
                navigate('/cart');
            } finally {
                setLoading(false);
            }
        };

        loadCartItems();
    }, [navigate]);

    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    const shipping = subtotal > 500 ? 0 : 50; // Free shipping over R500
    const tax = subtotal * 0.15; // 15% VAT
    const total = subtotal + shipping + tax;

    // Payment methods
    const paymentMethods = [
        {
            id: 'card',
            name: 'Credit/Debit Card',
            icon: FaCreditCard,
            description: 'Visa, Mastercard, American Express',
        },
        {
            id: 'apple',
            name: 'Apple Pay',
            icon: FaApple,
            description: 'Pay with Touch ID or Face ID',
        },
        {
            id: 'google',
            name: 'Google Pay',
            icon: FaGooglePay,
            description: 'Fast and secure payment',
        },
        {
            id: 'paypal',
            name: 'PayPal',
            icon: FaPaypal,
            description: 'Pay with your PayPal account',
        },
    ];

    // Handle form submissions
    const handleInputChange = (section, field, value) => {
        if (section === 'customer') {
            setCustomerInfo((prev) => ({ ...prev, [field]: value }));
        } else if (section === 'shipping') {
            setShippingAddress((prev) => ({ ...prev, [field]: value }));
        } else if (section === 'card') {
            setCardInfo((prev) => ({ ...prev, [field]: value }));
        }
    };

    // Format card number input
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    // Format expiry date
    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    // Handle order placement
    const handlePlaceOrder = async () => {
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setOrderComplete(true);
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('storage'));
        }, 3000);
    };

    if (loading) {
        return (
            <div className='min-h-screen bg-[#19191a] flex items-center justify-center'>
                <Header />
                <div className='text-white text-xl'>Loading checkout...</div>
            </div>
        );
    }

    if (orderComplete) {
        return (
            <div className='min-h-screen bg-[#19191a]'>
                <Header />
                <div className='pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
                    <div className='max-w-2xl mx-auto text-center'>
                        <div className='bg-green-100 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center'>
                            <FaShieldAlt className='text-green-600 text-4xl' />
                        </div>
                        <h1 className='text-4xl font-bold text-white mb-4'>
                            Order Complete!
                        </h1>
                        <p className='text-xl text-gray-300 mb-8'>
                            Thank you for your purchase. Your order has been
                            successfully placed.
                        </p>
                        <div className='space-y-4'>
                            <Button onClick={() => navigate('/products')}>
                                Continue Shopping
                            </Button>
                            <div>
                                <Link
                                    to='/'
                                    className='text-[#e79210] hover:underline'
                                >
                                    Return to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterCard />
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
                            Checkout
                        </h1>
                        <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
                            Complete your order and get your items delivered.
                        </p>
                        <div className='w-24 h-1 bg-[#e79210] mx-auto'></div>
                    </div>
                </div>
            </div>

            {/* Checkout Content */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Left Column - Forms */}
                    <div className='lg:col-span-2 space-y-8'>
                        {/* Customer Information */}
                        <div className='bg-white rounded-lg p-6 shadow-lg'>
                            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                                Customer Information
                            </h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Email Address *
                                    </label>
                                    <input
                                        type='email'
                                        value={customerInfo.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'customer',
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79210] focus:border-transparent'
                                        placeholder='your@email.com'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Phone Number
                                    </label>
                                    <input
                                        type='tel'
                                        value={customerInfo.phone}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'customer',
                                                'phone',
                                                e.target.value
                                            )
                                        }
                                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79210] focus:border-transparent'
                                        placeholder='+27 12 345 6789'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        First Name *
                                    </label>
                                    <input
                                        type='text'
                                        value={customerInfo.firstName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'customer',
                                                'firstName',
                                                e.target.value
                                            )
                                        }
                                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79210] focus:border-transparent'
                                        placeholder='John'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Last Name *
                                    </label>
                                    <input
                                        type='text'
                                        value={customerInfo.lastName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'customer',
                                                'lastName',
                                                e.target.value
                                            )
                                        }
                                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79210] focus:border-transparent'
                                        placeholder='Doe'
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className='bg-white rounded-lg p-6 shadow-lg'>
                            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                                Shipping Address
                            </h2>
                            <div className='space-y-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Street Address *
                                    </label>
                                    <input
                                        type='text'
                                        value={shippingAddress.address}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'shipping',
                                                'address',
                                                e.target.value
                                            )
                                        }
                                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79210] focus:border-transparent'
                                        placeholder='123 Main Street'
                                        required
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            City *
                                        </label>
                                        <input
                                            type='text'
                                            value={shippingAddress.city}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'shipping',
                                                    'city',
                                                    e.target.value
                                                )
                                            }
                                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79210] focus:border-transparent'
                                            placeholder='Cape Town'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            Province *
                                        </label>
                                        <select
                                            value={shippingAddress.state}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'shipping',
                                                    'state',
                                                    e.target.value
                                                )
                                            }
                                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79210] focus:border-transparent'
                                            required
                                        >
                                            <option value=''>
                                                Select Province
                                            </option>
                                            <option value='WC'>
                                                Western Cape
                                            </option>
                                            <option value='GP'>Gauteng</option>
                                            <option value='KZN'>
                                                KwaZulu-Natal
                                            </option>
                                            <option value='EC'>
                                                Eastern Cape
                                            </option>
                                            <option value='FS'>
                                                Free State
                                            </option>
                                            <option value='MP'>
                                                Mpumalanga
                                            </option>
                                            <option value='LP'>Limpopo</option>
                                            <option value='NW'>
                                                North West
                                            </option>
                                            <option value='NC'>
                                                Northern Cape
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            Postal Code *
                                        </label>
                                        <input
                                            type='text'
                                            value={shippingAddress.zipCode}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'shipping',
                                                    'zipCode',
                                                    e.target.value
                                                )
                                            }
                                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79210] focus:border-transparent'
                                            placeholder='8001'
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className='bg-white rounded-lg p-6 shadow-lg'>
                            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                                Payment Method
                            </h2>

                            {/* Payment Method Selection */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method.id}
                                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                                            selectedPaymentMethod === method.id
                                                ? 'border-[#e79210] bg-orange-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() =>
                                            setSelectedPaymentMethod(method.id)
                                        }
                                    >
                                        <div className='flex items-center space-x-3'>
                                            <method.icon
                                                className={`text-2xl ${
                                                    selectedPaymentMethod ===
                                                    method.id
                                                        ? 'text-[#e79210]'
                                                        : 'text-gray-400'
                                                }`}
                                            />
                                            <div>
                                                <div className='font-medium text-gray-900'>
                                                    {method.name}
                                                </div>
                                                <div className='text-sm text-gray-500'>
                                                    {method.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Card Details Form */}
                            {selectedPaymentMethod === 'card' && (
                                <div className='space-y-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            Cardholder Name *
                                        </label>
                                        <input
                                            type='text'
                                            value={cardInfo.cardholderName}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'card',
                                                    'cardholderName',
                                                    e.target.value
                                                )
                                            }
                                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79210] focus:border-transparent'
                                            placeholder='John Doe'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            Card Number *
                                        </label>
                                        <input
                                            type='text'
                                            value={cardInfo.cardNumber}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'card',
                                                    'cardNumber',
                                                    formatCardNumber(
                                                        e.target.value
                                                    )
                                                )
                                            }
                                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79210] focus:border-transparent'
                                            placeholder='1234 5678 9012 3456'
                                            maxLength='19'
                                            required
                                        />
                                    </div>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                                Expiry Date *
                                            </label>
                                            <input
                                                type='text'
                                                value={cardInfo.expiryDate}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'card',
                                                        'expiryDate',
                                                        formatExpiryDate(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79210] focus:border-transparent'
                                                placeholder='MM/YY'
                                                maxLength='5'
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                                CVV *
                                            </label>
                                            <input
                                                type='text'
                                                value={cardInfo.cvv}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'card',
                                                        'cvv',
                                                        e.target.value.replace(
                                                            /[^0-9]/g,
                                                            ''
                                                        )
                                                    )
                                                }
                                                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79210] focus:border-transparent'
                                                placeholder='123'
                                                maxLength='4'
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Alternative Payment Methods */}
                            {selectedPaymentMethod !== 'card' && (
                                <div className='text-center py-8'>
                                    <div className='text-gray-600 mb-4'>
                                        You will be redirected to{' '}
                                        {
                                            paymentMethods.find(
                                                (m) =>
                                                    m.id ===
                                                    selectedPaymentMethod
                                            )?.name
                                        }{' '}
                                        to complete your payment.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-lg p-6 shadow-lg sticky top-8'>
                            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                                Order Summary
                            </h2>

                            {/* Cart Items */}
                            <div className='space-y-4 mb-6'>
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className='flex items-center space-x-4'
                                    >
                                        <img
                                            src={
                                                item.image ||
                                                '/images/Write-in-peace-product-photo.png'
                                            }
                                            alt={item.name}
                                            className='w-16 h-16 object-cover rounded-lg'
                                        />
                                        <div className='flex-1'>
                                            <div className='font-medium text-gray-900'>
                                                {item.name}
                                            </div>
                                            <div className='text-sm text-gray-500'>
                                                Quantity: {item.quantity}
                                                {item.size &&
                                                    item.size !== 'One size' &&
                                                    ` • Size: ${item.size}`}
                                            </div>
                                        </div>
                                        <div className='font-medium text-gray-900'>
                                            R
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Totals */}
                            <div className='border-t pt-4 space-y-2'>
                                <div className='flex justify-between text-gray-600'>
                                    <span>Subtotal</span>
                                    <span>R{subtotal.toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between text-gray-600'>
                                    <span>Shipping</span>
                                    <span>
                                        {shipping === 0
                                            ? 'Free'
                                            : `R${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className='flex justify-between text-gray-600'>
                                    <span>VAT (15%)</span>
                                    <span>R{tax.toFixed(2)}</span>
                                </div>
                                <div className='border-t pt-2 flex justify-between text-xl font-bold text-gray-900'>
                                    <span>Total</span>
                                    <span>R{total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Security Notice */}
                            <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
                                <div className='flex items-center space-x-2 text-sm text-gray-600'>
                                    <FaLock className='text-green-600' />
                                    <span>
                                        Your payment information is secure and
                                        encrypted
                                    </span>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <Button
                                className='w-full mt-6'
                                size='lg'
                                onClick={handlePlaceOrder}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <div className='flex items-center space-x-2'>
                                        <div className='w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin'></div>
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    `Place Order • R${total.toFixed(2)}`
                                )}
                            </Button>

                            {/* Back to Cart */}
                            <div className='mt-4 text-center'>
                                <Link
                                    to='/cart'
                                    className='text-[#e79210] hover:underline text-sm'
                                >
                                    ← Back to Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterCard />
        </div>
    );
}

export default Checkout;
