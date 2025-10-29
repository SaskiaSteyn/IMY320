import {useEffect, useState} from 'react';
import {FaClipboardList} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {Button} from './ui/button-header';

const OrderHistoryButton = ({variant = 'outline', className = ''}) => {
    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        const updateOrderCount = () => {
            try {
                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                setOrderCount(Array.isArray(orders) ? orders.length : 0);
            } catch {
                setOrderCount(0);
            }
        };

        updateOrderCount();
        window.addEventListener('storage', updateOrderCount);
        return () => window.removeEventListener('storage', updateOrderCount);
    }, []);

    return (
        <Button variant={variant} asChild className={className}>
            <Link to='/order-history' className='flex items-center gap-2'>
                <FaClipboardList className='w-4 h-4' />
                Orders {orderCount > 0 && `(${orderCount})`}
            </Link>
        </Button>
    );
};

export default OrderHistoryButton;
