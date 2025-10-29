import { useEffect } from 'react';

const AddedToCartPopup = ({ show, onClose, productName, quantity, size }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000); // Auto-close after 2 seconds
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div
            className='fixed top-6 z-[9999] popup-container'
            style={{
                left: '50%',
                transform: 'translateX(-50%)',
            }}
        >
            <div className='bg-black text-white px-6 py-3 rounded-lg shadow-xl border border-gray-600 flex items-center gap-3 animate-fade-in'>
                <div>
                    <div className='font-semibold'>Added to cart!</div>
                    <div className='text-sm text-gray-300'>
                        {quantity} x {productName} {size ? `(${size})` : ''}
                    </div>
                </div>
            </div>
            <style>{`
                .popup-container {
                    pointer-events: none;
                }
                .popup-container > div {
                    pointer-events: auto;
                }
                @keyframes fade-in {
                    from { 
                        opacity: 0; 
                        transform: translateY(-20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out;
                }
            `}</style>
        </div>
    );
};

export default AddedToCartPopup;
