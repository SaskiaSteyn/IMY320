import { useEffect } from 'react';
import { FaCheck, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const SaveChangesPopup = ({ show, onClose, type, message, details }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000); // Auto-close after 4 seconds (longer than cart popup for reading)
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <FaCheck className='text-green-400' />;
            case 'error':
                return <FaTimes className='text-red-400' />;
            case 'warning':
                return <FaExclamationTriangle className='text-yellow-400' />;
            default:
                return <FaCheck className='text-green-400' />;
        }
    };

    const getBorderColor = () => {
        switch (type) {
            case 'success':
                return 'border-green-600';
            case 'error':
                return 'border-red-600';
            case 'warning':
                return 'border-yellow-600';
            default:
                return 'border-green-600';
        }
    };

    return (
        <div
            className='fixed top-6 z-[9999] popup-container'
            style={{
                left: '50%',
                transform: 'translateX(-50%)',
            }}
        >
            <div
                className={`bg-black text-white px-6 py-4 rounded-lg shadow-xl border ${getBorderColor()} flex items-start gap-3 animate-fade-in max-w-md`}
            >
                <div className='flex-shrink-0 mt-0.5'>{getIcon()}</div>
                <div className='flex-1'>
                    <div className='font-semibold text-sm'>{message}</div>
                    {details && (
                        <div className='text-xs text-gray-300 mt-1'>
                            {details}
                        </div>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className='flex-shrink-0 text-gray-400 hover:text-white transition-colors'
                >
                    <FaTimes className='text-xs' />
                </button>
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

export default SaveChangesPopup;
