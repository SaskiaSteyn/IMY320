import { useEffect, useState } from 'react';
import {
    FaApple,
    FaCheckCircle,
    FaCreditCard,
    FaGooglePay,
    FaPaypal,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { adjustStock, createOrder } from '../backend/api.js';
import FooterCard from '../cards/footer.jsx';
import Header from '../components/header.jsx';
import { Button } from '../components/ui/button.jsx';

function Checkout() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [completedSteps, setCompletedSteps] = useState(new Set());

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

    // Form errors state
    const [errors, setErrors] = useState({
        customer: {},
        shipping: {},
        card: {},
    });
    const [orderError, setOrderError] = useState(''); // Validation functions
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^(\+27|0)[1-9][0-9]{8}$/;
        return phone === '' || re.test(phone); // Optional field
    };

    const validateName = (name) => {
        return name.length >= 2;
    };

    const validateAddress = (address) => {
        return address.length >= 5;
    };

    const validateZipCode = (zipCode) => {
        const re = /^\d{4}$/;
        return re.test(zipCode);
    };

    const validateCardNumber = (number) => {
        const re = /^[\d\s]{16,19}$/;
        return re.test(number.replace(/\s/g, ''));
    };

    const validateExpiryDate = (date) => {
        if (!/^\d{2}\/\d{2}$/.test(date)) return false;
        const [month, year] = date.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const today = new Date();
        return expiry > today;
    };

    const validateCVV = (cvv) => {
        const re = /^\d{3,4}$/;
        return re.test(cvv);
    };

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
    const total = subtotal + shipping; // VAT is already included in item prices

    // Check form completion for progress tracking
    const isCustomerInfoComplete =
        customerInfo.email && customerInfo.firstName && customerInfo.lastName;
    const isShippingComplete =
        shippingAddress.address &&
        shippingAddress.city &&
        shippingAddress.state &&
        shippingAddress.zipCode;
    const isPaymentComplete =
        selectedPaymentMethod !== 'card' ||
        (cardInfo.cardNumber &&
            cardInfo.expiryDate &&
            cardInfo.cvv &&
            cardInfo.cardholderName);

    // Update progress when forms are completed
    useEffect(() => {
        const newCompletedSteps = new Set();
        if (isCustomerInfoComplete) newCompletedSteps.add(1);
        if (isShippingComplete) newCompletedSteps.add(2);
        if (isPaymentComplete) newCompletedSteps.add(3);

        setCompletedSteps(newCompletedSteps);
    }, [isCustomerInfoComplete, isShippingComplete, isPaymentComplete]);

    // Calculate overall progress
    const progressPercentage = (completedSteps.size / 3) * 100;

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

    // Handle form submissions and validation
    const handleInputChange = (section, field, value) => {
        // Update form state
        if (section === 'customer') {
            setCustomerInfo((prev) => ({ ...prev, [field]: value }));

            // Validate customer info fields
            setErrors((prev) => ({
                ...prev,
                customer: {
                    ...prev.customer,
                    [field]: (() => {
                        switch (field) {
                            case 'email':
                                return !validateEmail(value)
                                    ? 'Please enter a valid email address'
                                    : '';
                            case 'phone':
                                return !validatePhone(value)
                                    ? 'Please enter a valid phone number (e.g., 0123456789)'
                                    : '';
                            case 'firstName':
                            case 'lastName':
                                return !validateName(value)
                                    ? 'Name must be at least 2 characters long'
                                    : '';
                            default:
                                return '';
                        }
                    })(),
                },
            }));
        } else if (section === 'shipping') {
            setShippingAddress((prev) => ({ ...prev, [field]: value }));

            // Validate shipping fields
            setErrors((prev) => ({
                ...prev,
                shipping: {
                    ...prev.shipping,
                    [field]: (() => {
                        switch (field) {
                            case 'address':
                                return !validateAddress(value)
                                    ? 'Please enter a valid address'
                                    : '';
                            case 'city':
                                return !validateName(value)
                                    ? 'Please enter a valid city name'
                                    : '';
                            case 'zipCode':
                                return !validateZipCode(value)
                                    ? 'Please enter a valid 4-digit postal code'
                                    : '';
                            case 'state':
                                return !value ? 'Please select a province' : '';
                            default:
                                return '';
                        }
                    })(),
                },
            }));
        } else if (section === 'card' && selectedPaymentMethod === 'card') {
            setCardInfo((prev) => ({ ...prev, [field]: value }));

            // Validate card fields
            setErrors((prev) => ({
                ...prev,
                card: {
                    ...prev.card,
                    [field]: (() => {
                        switch (field) {
                            case 'cardNumber':
                                return !validateCardNumber(value)
                                    ? 'Please enter a valid card number'
                                    : '';
                            case 'expiryDate':
                                return !validateExpiryDate(value)
                                    ? 'Please enter a valid expiry date (MM/YY)'
                                    : '';
                            case 'cvv':
                                return !validateCVV(value)
                                    ? 'Please enter a valid CVV (3-4 digits)'
                                    : '';
                            case 'cardholderName':
                                return !validateName(value)
                                    ? 'Please enter the cardholder name'
                                    : '';
                            default:
                                return '';
                        }
                    })(),
                },
            }));
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

    // Validate all forms before order placement
    const validateAllForms = () => {
        const customerErrors = {
            email: !validateEmail(customerInfo.email)
                ? 'Please enter a valid email address'
                : '',
            firstName: !validateName(customerInfo.firstName)
                ? 'First name is required'
                : '',
            lastName: !validateName(customerInfo.lastName)
                ? 'Last name is required'
                : '',
            phone: !validatePhone(customerInfo.phone)
                ? 'Please enter a valid phone number'
                : '',
        };

        const shippingErrors = {
            address: !validateAddress(shippingAddress.address)
                ? 'Please enter a valid address'
                : '',
            city: !validateName(shippingAddress.city) ? 'City is required' : '',
            state: !shippingAddress.state ? 'Province is required' : '',
            zipCode: !validateZipCode(shippingAddress.zipCode)
                ? 'Please enter a valid postal code'
                : '',
        };

        const cardErrors =
            selectedPaymentMethod === 'card'
                ? {
                      cardNumber: !validateCardNumber(cardInfo.cardNumber)
                          ? 'Please enter a valid card number'
                          : '',
                      expiryDate: !validateExpiryDate(cardInfo.expiryDate)
                          ? 'Please enter a valid expiry date'
                          : '',
                      cvv: !validateCVV(cardInfo.cvv)
                          ? 'Please enter a valid CVV'
                          : '',
                      cardholderName: !validateName(cardInfo.cardholderName)
                          ? 'Cardholder name is required'
                          : '',
                  }
                : {};

        setErrors({
            customer: customerErrors,
            shipping: shippingErrors,
            card: cardErrors,
        });

        const hasCustomerErrors = Object.values(customerErrors).some(
            (error) => error !== ''
        );
        const hasShippingErrors = Object.values(shippingErrors).some(
            (error) => error !== ''
        );
        const hasCardErrors =
            selectedPaymentMethod === 'card' &&
            Object.values(cardErrors).some((error) => error !== '');

        return !hasCustomerErrors && !hasShippingErrors && !hasCardErrors;
    };

    // Handle order placement
    const handlePlaceOrder = async () => {
        if (!validateAllForms()) {
            // Scroll to the first error
            const firstErrorElement = document.querySelector('.text-red-500');
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
            return;
        }

        setIsProcessing(true);

        try {
            // Clear any previous errors
            setOrderError('');

            // Get user data from localStorage first
            const token = localStorage.getItem('token');
            const userDataRaw = localStorage.getItem('userData');
            let userData;

            try {
                userData = userDataRaw ? JSON.parse(userDataRaw) : null;
            } catch (e) {
                console.error('Failed to parse user data:', e);
                throw new Error(
                    'Invalid user session. Please try logging in again.'
                );
            }

            if (!token || !userData) {
                throw new Error('Please log in to place an order.');
            }

            if (!userData.userIDNumber && !userData.id) {
                console.error('Missing user ID in userData:', userData);
                throw new Error(
                    'User ID not found. Please try logging in again.'
                );
            }

            // Create order in database first
            const userID = parseInt(userData.userIDNumber || userData.id, 10);
            if (isNaN(userID)) {
                throw new Error(
                    'Invalid user ID. Please try logging in again.'
                );
            }

            const orderData = {
                userIDNumber: userID,
                items: cartItems.map((item) => ({
                    productID: item.id,
                    name: item.name,
                    image: item.image || null,
                    quantity: parseInt(item.quantity, 10),
                    price: parseFloat(item.price),
                    sizes: item.size ? [item.size] : [],
                })),
                status: 'Processing',
            };
            const orderResponse = await createOrder(orderData);

            if (orderResponse.error) {
                throw new Error(
                    'Failed to create order: ' + orderResponse.error
                );
            }

            // If order is created successfully, adjust stock
            for (const item of cartItems) {
                // Skip stock adjustment for subscription items
                if (item.type === 'subscription') {
                    continue;
                }

                const stockAdjustment = -item.quantity;
                const response = await adjustStock(item.id, stockAdjustment);

                if (response.error) {
                    console.error(
                        'Failed to adjust stock for product:',
                        item.id,
                        response.error
                    );
                    // Continue with other items even if one fails
                }
            }

            // Order completed successfully, update UI after a short delay
            setTimeout(() => {
                setIsProcessing(false);
                setOrderComplete(true);
                localStorage.removeItem('cart');
                window.dispatchEvent(new Event('storage'));

                // Scroll to top of page to show the order completion
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }, 1500);
        } catch (error) {
            console.error('Error processing order:', error);
            setIsProcessing(false);
            setOrderError(
                error.message || 'Failed to process order. Please try again.'
            );
        }
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
            <div className='min-h-screen bg-[#19191a] relative overflow-hidden'>
                <Header />

                {/* Confetti Effect */}
                <div className='fixed inset-0 pointer-events-none z-10'>
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className='absolute animate-ping'
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`,
                            }}
                        >
                            <div className='w-2 h-2 bg-[#e79210] rounded-full'></div>
                        </div>
                    ))}
                </div>

                <div className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-20'>
                    <div className='max-w-2xl mx-auto text-center min-h-screen flex flex-col justify-center'>
                        <div className='text-[#e79210] mb-4'>
                            <h1 className='text-6xl font-bold  mb-4'>
                                Congratulations!
                            </h1>
                        </div>

                        <p className='text-2xl mb-8 text-white'>
                            You are the new owner of some awesome stuff!
                        </p>

                        <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8'>
                            <p className='text-lg text-gray-300'>
                                Keep an eye on your email for your tracking
                                number and keep a close eye on your order!
                            </p>
                        </div>

                        <div className='space-y-4'>
                            <Link to='/'>
                                <Button
                                    variant='secondary'
                                    size='lg'
                                    className='transition-all duration-300 text-white mr-4'
                                >
                                    Return to home
                                </Button>
                            </Link>
                            <Link to='/products'>
                                <Button
                                    onClick={() => navigate('/products')}
                                    className='transition-all duration-300'
                                    size='lg'
                                >
                                    Shop some more!
                                </Button>
                            </Link>
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

            {/* Fixed Progress Bar */}
            <div className='fixed top-[72px] left-0 right-0 z-40 bg-[#19191a]/80 backdrop-blur-sm py-2 px-4'>
                <div className='max-w-md mx-auto'>
                    <div className='flex justify-between text-sm text-gray-300 mb-2'>
                        <span>Your Progress</span>
                        <span>{Math.round(progressPercentage)}% Complete</span>
                    </div>
                    <div className='w-full bg-gray-600 rounded-full h-3 overflow-hidden'>
                        <div
                            className='h-full bg-gradient-to-r from-[#e79210] to-[#e75710] rounded-full transition-all duration-1000 ease-out relative'
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className='pt-36 pb-16 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center'>
                        <div className='flex justify-center items-center gap-4 mb-6'>
                            <h1 className='text-4xl md:text-6xl font-bold text-white'>
                                Almost Yours!
                            </h1>
                        </div>
                        <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
                            Just a few more steps and your awesome stuff will be
                            on its way!
                        </p>
                    </div>
                </div>
            </div>

            {/* Checkout Content */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Left Column - Forms */}
                    <div className='lg:col-span-2 space-y-8'>
                        {/* Customer Information */}
                        <div
                            className={`bg-white rounded-lg p-6 shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
                                completedSteps.has(1)
                                    ? 'ring-4 ring-green-400'
                                    : ''
                            }`}
                        >
                            <div className='flex items-center gap-3 mb-6'>
                                {completedSteps.has(1) ? (
                                    <FaCheckCircle className='text-green-500 text-2xl' />
                                ) : (
                                    <div className='w-8 h-8 rounded-full bg-[#e79210] text-black flex items-center justify-center font-bold text-lg'>
                                        1
                                    </div>
                                )}
                                <h2 className='text-2xl font-bold text-gray-900'>
                                    Tell Us About You!
                                </h2>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Email Address *
                                    </label>
                                    <div className='space-y-1'>
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
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#e79210] focus:border-transparent transition-all duration-300 hover:border-[#e79210] hover:shadow-md focus:scale-105 ${
                                                errors.customer.email
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                            }`}
                                            placeholder='your@email.com'
                                            autoComplete='email'
                                            required
                                        />
                                        {errors.customer.email && (
                                            <p className='text-red-500 text-xs'>
                                                {errors.customer.email}
                                            </p>
                                        )}
                                    </div>
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
                                        autoComplete='tel'
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
                                        autoComplete='given-name'
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
                                        autoComplete='family-name'
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div
                            className={`bg-white rounded-lg p-6 shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
                                completedSteps.has(2)
                                    ? 'ring-4 ring-green-400'
                                    : ''
                            }`}
                        >
                            <div className='flex items-center gap-3 mb-6'>
                                {completedSteps.has(2) ? (
                                    <FaCheckCircle className='text-green-500 text-2xl' />
                                ) : (
                                    <div className='w-8 h-8 rounded-full bg-[#e79210] text-black flex items-center justify-center font-bold text-lg'>
                                        2
                                    </div>
                                )}
                                <h2 className='text-2xl font-bold text-gray-900'>
                                    Where Should We Send Your Stuff?
                                </h2>
                            </div>
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
                                        placeholder='123 Your Awesome Street'
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
                                            placeholder='Enter your city'
                                            autoComplete='address-level2'
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
                                            autoComplete='address-level1'
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
                                            placeholder='0000'
                                            autoComplete='postal-code'
                                            maxLength='4'
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div
                            className={`bg-white rounded-lg p-6 shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
                                completedSteps.has(3)
                                    ? 'ring-4 ring-green-400'
                                    : ''
                            }`}
                        >
                            <div className='flex items-center gap-3 mb-6'>
                                {completedSteps.has(3) ? (
                                    <FaCheckCircle className='text-green-500 text-2xl' />
                                ) : (
                                    <div className='w-8 h-8 rounded-full bg-[#e79210] text-black flex items-center justify-center font-bold text-lg'>
                                        3
                                    </div>
                                )}
                                <h2 className='text-2xl font-bold text-gray-900'>
                                    How Would You Like to Pay?
                                </h2>
                            </div>

                            {/* Payment Method Selection */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method.id}
                                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                                            selectedPaymentMethod === method.id
                                                ? 'border-[#e79210] bg-gradient-to-r from-orange-50 to-yellow-50 shadow-lg scale-105'
                                                : 'border-gray-200 hover:border-[#e79210] hover:bg-gray-50'
                                        }`}
                                        onClick={() =>
                                            setSelectedPaymentMethod(method.id)
                                        }
                                    >
                                        <div className='flex items-center space-x-3'>
                                            <method.icon
                                                className={`text-2xl transition-all duration-300 ${
                                                    selectedPaymentMethod ===
                                                    method.id
                                                        ? 'text-[#e79210] animate-pulse'
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
                                            autoComplete='cc-name'
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
                                            autoComplete='cc-number'
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
                                                autoComplete='cc-exp'
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
                                                autoComplete='cc-csc'
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
                        <div className='bg-white rounded-lg p-6 shadow-lg sticky top-8 transform transition-all duration-300 hover:shadow-2xl'>
                            <div className='flex items-center gap-2 mb-6'>
                                <h2 className='text-2xl font-bold text-gray-900'>
                                    Your Haul
                                </h2>
                            </div>

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
                                <div className='border-t pt-2 flex justify-between text-xl font-bold text-gray-900'>
                                    <span>Total</span>
                                    <span>R{total.toFixed(2)}</span>
                                </div>
                                <div className='text-xs text-gray-500 mt-2'>
                                    VAT included in item prices
                                </div>
                            </div>

                            {/* Security Notice */}
                            <div className='mt-6 p-4'>
                                <p className='text-center text-xs text-gray-700'>
                                    Secure & encrypted - your data is safe with
                                    us!
                                </p>
                            </div>

                            {orderError && (
                                <div className='text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg border border-red-200'>
                                    {orderError}
                                </div>
                            )}
                            {/* Place Order Button */}
                            <Button
                                className={`w-full mt-6 transform transition-all duration-300 ${
                                    completedSteps.size === 3 ? '' : ''
                                } ${isProcessing ? '' : ''}`}
                                size='lg'
                                onClick={handlePlaceOrder}
                                disabled={
                                    isProcessing || completedSteps.size < 3
                                }
                            >
                                {isProcessing ? (
                                    <div className='flex items-center space-x-2'>
                                        <div className='w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin'></div>
                                        <span>Processing your order</span>
                                    </div>
                                ) : completedSteps.size === 3 ? (
                                    <span className='flex items-center justify-center space-x-2'>
                                        <span>Process my order!</span>
                                    </span>
                                ) : (
                                    <span>Complete all steps above ↑</span>
                                )}
                            </Button>

                            {/* Back to Cart */}
                            <div className='mt-4 text-center'>
                                <Link
                                    to='/cart'
                                    className='text-[#e79210] hover:underline text-sm'
                                >
                                    Back to Cart
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
