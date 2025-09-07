import { useState } from 'react';
import AddedToCartPopup from '../components/added-to-cart-popup.jsx';
import PricingBlock from '../components/pricing.jsx';

const PricingCard = ({ zIndex }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState({
        productName: '',
        quantity: 1,
    });

    const handleAddToCart = (tierName) => {
        // Get the specific image for each tier
        const getImagePath = (tier) => {
            switch (tier) {
                case 'Free':
                    return '/images/merch/Free.png';
                case 'Standard':
                    return '/images/merch/Standard.png';
                case 'Plus':
                    return '/images/merch/Plus.png';
                default:
                    return '/images/Write-in-peace-product-photo.png';
            }
        };

        // Create a cart item for the pricing tier
        const cartItem = {
            id: `pricing-${tierName.toLowerCase()}`,
            name: `${tierName} Plan`,
            price: tierName === 'Free' ? 0 : tierName === 'Standard' ? 35 : 55,
            quantity: 1,
            image: getImagePath(tierName),
            type: 'subscription',
        };

        // Get existing cart from localStorage
        try {
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if item already exists in cart
            const existingItemIndex = existingCart.findIndex(
                (item) => item.id === cartItem.id
            );

            if (existingItemIndex > -1) {
                // Update quantity if item exists
                existingCart[existingItemIndex].quantity += 1;
            } else {
                // Add new item to cart
                existingCart.push(cartItem);
            }

            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(existingCart));

            // Trigger storage event to update cart count in header
            window.dispatchEvent(new Event('storage'));
        } catch (error) {
            console.error('Error updating cart:', error);
        }

        // Show popup
        setPopupData({ productName: tierName, quantity: 1 });
        setShowPopup(true);
    };

    return (
        <div
            id='pricing'
            className='h-screen relative bg-[#19191a]'
            style={{ zIndex }}
        >
            <div className='p-8 px-21 h-full flex flex-col justify-center'>
                <h2 className='text-4xl font-bold text-center mb-12 text-white'>
                    Choose the option that fits your writing journey
                </h2>
                <div className='flex gap-8 px-8 justify-center w-full mx-auto items-stretch'>
                    <div className='flex-1'>
                        <PricingBlock
                            tierName='Free'
                            price='0'
                            headerColor='#d2d1d6'
                            textColor='#000000'
                            features={[
                                'Distraction blocker',
                                'Pomodoro session timer',
                                'Light theme',
                                'Daily writing streak tracker',
                                '1-2 writing sessions per day',
                            ]}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                    <div className='flex-1'>
                        <PricingBlock
                            tierName='Standard'
                            price='35'
                            headerColor='#e79210'
                            textColor='#000000'
                            features={[
                                'Distraction blocker',
                                'Custom session timer',
                                'Light theme and Dark theme',
                                'Daily writing streak tracker',
                                '3–5 writing sessions per day',
                                'Cloud sync across devices',
                                'Basic writing stats',
                            ]}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                    <div className='flex-1'>
                        <PricingBlock
                            tierName='Plus'
                            price='55'
                            headerColor='#d2d1d6'
                            textColor='#000000'
                            features={[
                                'Distraction blocker',
                                'Custom session timer',
                                'Dark theme and other themes',
                                'Daily writing streak tracker',
                                'Unlimited writing sessions',
                                'Cloud sync across devices',
                                'Advanced analytics & insights',
                                'Access to beta features',
                            ]}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                </div>
            </div>

            {/* Popup positioned at the top level, outside of any transforms */}
            <AddedToCartPopup
                show={showPopup}
                onClose={() => setShowPopup(false)}
                productName={popupData.productName}
                quantity={popupData.quantity}
            />
        </div>
    );
};

export default PricingCard;
