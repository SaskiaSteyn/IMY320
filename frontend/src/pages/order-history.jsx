import { useEffect, useState } from 'react';
import { getUserOrders } from '../backend/api';
import FooterCard from '../cards/footer.jsx';
import Header from '../components/header.jsx';
import { Button } from '../components/ui/button.jsx';

function getStartOfPeriod(period) {
    const now = new Date();
    if (period === 'week') {
        // Start of this week (Sunday)
        const day = now.getDay();
        const diff = now.getDate() - day;
        return new Date(now.getFullYear(), now.getMonth(), diff, 0, 0, 0, 0);
    } else if (period === 'month') {
        // Start of this month
        return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    } else if (period === 'year') {
        // Start of this year
        return new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    }
    return null;
}

const FILTERS = [
    { key: 'all', label: 'All Orders' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'year', label: 'This Year' },
];

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError('');
            try {
                // Get token and parse it
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Please log in to view your orders.');
                    setLoading(false);
                    return;
                }

                // Get user data
                const userDataRaw = localStorage.getItem('userData');
                console.log('Raw user data from localStorage:', userDataRaw);

                let userData;
                try {
                    userData = JSON.parse(userDataRaw);
                    console.log('Parsed user data:', userData);
                } catch (e) {
                    console.error('Failed to parse userData:', e);
                    console.error(
                        'Raw userData that failed to parse:',
                        userDataRaw
                    );
                    setError('Invalid user data. Please try logging in again.');
                    setLoading(false);
                    return;
                }

                if (!userData) {
                    console.error(
                        'userData is null or undefined after parsing'
                    );
                    setError('User data not found. Please log in again.');
                    setLoading(false);
                    return;
                }

                // Try all possible ID fields
                const userIDNumber =
                    userData.userIDNumber ||
                    userData.id ||
                    (userData._id ? parseInt(userData._id, 10) : null);
                console.log(
                    'User data fields available:',
                    Object.keys(userData)
                );
                console.log('Attempted to get userIDNumber:', userIDNumber);
                console.log('userIDNumber field:', userData.userIDNumber);
                console.log('id field:', userData.id);
                console.log('_id field:', userData._id);

                if (!userIDNumber) {
                    console.error('User data missing ID fields:', userData);
                    setError('User ID not found. Please try logging in again.');
                    setLoading(false);
                    return;
                }

                console.log('Fetching orders for userIDNumber:', userIDNumber);
                const result = await getUserOrders(userIDNumber);

                if (result.error) {
                    setError(result.error);
                } else {
                    console.log('Orders received:', result);
                    setOrders(result);
                }
            } catch (e) {
                console.error('Error fetching orders:', e);
                setError('Failed to load orders. Please try logging in again.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        if (selectedFilter === 'all') {
            setFilteredOrders(orders);
        } else {
            const start = getStartOfPeriod(selectedFilter);
            if (!start) {
                setFilteredOrders(orders);
                return;
            }

            setFilteredOrders(
                orders.filter((order) => {
                    const orderDate = new Date(order.orderDate);
                    if (isNaN(orderDate.getTime())) {
                        console.error('Invalid date for order:', order);
                        return false;
                    }
                    return orderDate >= start;
                })
            );
        }
    }, [selectedFilter, orders]);

    return (
        <div className='min-h-screen bg-[#19191a]'>
            <Header />
            <div className='pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-7xl mx-auto text-center'>
                    <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
                        Order History
                    </h1>
                    <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
                        View your past orders and track your writing-inspired
                        merch purchases.
                    </p>
                    <div className='w-24 h-1 bg-[#e79210] mx-auto'></div>
                </div>
            </div>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8'>
                <div className='flex flex-wrap justify-center gap-4'>
                    {FILTERS.map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => setSelectedFilter(filter.key)}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                selectedFilter === filter.key
                                    ? 'bg-[#e79210] text-black shadow-lg'
                                    : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
                <div className='text-center mt-4'>
                    <span className='text-gray-400'>
                        Showing {filteredOrders.length} order
                        {filteredOrders.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
                {loading ? (
                    <div className='text-center py-16 text-white text-xl'>
                        Loading orders...
                    </div>
                ) : error ? (
                    <div className='text-center py-16 text-red-400 text-xl'>
                        {error}
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className='text-center py-16 text-gray-400 text-xl'>
                        No orders found for this period.
                        <div className='mt-4'>
                            <Button
                                variant='outline'
                                onClick={() => setSelectedFilter('all')}
                                className='mr-4'
                            >
                                Show All Orders
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className='space-y-8'>
                        {filteredOrders.map((order) => (
                            <div
                                key={order.orderID}
                                className='bg-white rounded-lg shadow-lg p-6'
                            >
                                <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4'>
                                    <div className='flex flex-col md:flex-row md:items-center gap-2'>
                                        <span className='inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full mr-2'>
                                            Order ID: {order.orderID}
                                        </span>
                                        <span className='inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-200 text-gray-800 rounded-full mr-2'>
                                            {new Date(
                                                order.orderDate
                                            ).toLocaleDateString()}
                                        </span>
                                        <span
                                            className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                                                order.status === 'Processing'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : order.status ===
                                                      'Completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className='text-lg font-bold text-gray-900 mt-2 md:mt-0'>
                                        Total: R{order.totalPrice}
                                    </div>
                                </div>
                                <div className='overflow-x-auto'>
                                    <table className='min-w-full divide-y divide-gray-200'>
                                        <thead>
                                            <tr>
                                                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                                                    Product
                                                </th>
                                                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                                                    Quantity
                                                </th>
                                                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                                                    Price
                                                </th>
                                                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                                                    Size(s)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-white divide-y divide-gray-200'>
                                            {order.items.map((item, idx) => (
                                                <tr key={item.productID + idx}>
                                                    <td className='px-4 py-2 flex items-center gap-3'>
                                                        {item.image && (
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className='w-12 h-12 object-cover rounded'
                                                            />
                                                        )}
                                                        <span className='font-medium text-gray-900'>
                                                            {item.name}
                                                        </span>
                                                    </td>
                                                    <td className='px-4 py-2'>
                                                        {item.quantity}
                                                    </td>
                                                    <td className='px-4 py-2'>
                                                        R{item.price}
                                                    </td>
                                                    <td className='px-4 py-2'>
                                                        {item.sizes &&
                                                        item.sizes.length > 0
                                                            ? item.sizes.join(
                                                                  ', '
                                                              )
                                                            : 'N/A'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <FooterCard />
        </div>
    );
};

export default OrderHistory;
