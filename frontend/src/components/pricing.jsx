import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import AddedToCartPopup from './added-to-cart-popup';

const PricingBlock = ({
    tierName,
    price,
    features,
    headerColor = '#9ca3af', // Default gray color
    textColor = '#000000', // Default text color
    className = '',
}) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleAddToCart = () => {
        // You can implement actual cart logic here
        setShowPopup(true);
    };

    return (
        <div
            className={`rounded-lg overflow-hidden shadow-lg w-full h-full flex flex-col ${className}`}
        >
            {/* Header section with tier name and price */}
            <div
                className='text-center py-6 px-8'
                style={{ backgroundColor: headerColor, color: textColor }}
            >
                <h3
                    className='text-2xl font-bold mb-3'
                    style={{ color: textColor }}
                >
                    {tierName}
                </h3>
                <div
                    className='text-5xl font-bold mb-1'
                    style={{ color: textColor }}
                >
                    R{price}
                </div>
                <p className='text-lg' style={{ color: textColor }}>
                    per month
                </p>
            </div>

            {/* Features section */}
            <div className='bg-gray-200 px-8 py-6 flex-1 flex flex-col'>
                <ul className='space-y-3 flex-1'>
                    {features.map((feature, index) => (
                        <li key={index} className='flex items-start'>
                            <svg
                                className='w-5 h-5 text-[#7D7F49] mr-3 mt-0.5 flex-shrink-0'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                    clipRule='evenodd'
                                />
                            </svg>
                            <span className='text-gray-800 font-medium'>
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className='mt-6 px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2 self-center'
                    style={{ backgroundColor: 'var(--cafe)' }}
                >
                    <FaShoppingCart className='text-sm' />
                    Add to Cart
                </button>
                <AddedToCartPopup
                    show={showPopup}
                    onClose={() => setShowPopup(false)}
                    productName={tierName}
                    quantity={1}
                />
            </div>
        </div>
    );
};

export default PricingBlock;
