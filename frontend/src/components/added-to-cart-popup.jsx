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
        <div className='fixed top-6 left-1/2 transform -translate-x-1/2 z-50'>
            <div className='bg-[var(--cafe)] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in'>
                <div>
                    <div className='font-semibold'>Added to cart!</div>
                    <div className='text-sm'>
                        {quantity} x {productName} {size ? `(${size})` : ''}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease;
                }
            `}</style>
        </div>
    );
};

export default AddedToCartPopup;
