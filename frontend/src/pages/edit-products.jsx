import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import FooterCard from '../cards/footer.jsx';
import Breadcrumbs from '../components/breadcrumbs.jsx';
import Header from '../components/header.jsx';
import {Button} from '../components/ui/button.jsx';
import {getAllProducts, adjustStock} from '../backend/api.js';

const EditProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adjustingStock, setAdjustingStock] = useState(null); // Track which product's stock is being adjusted

    useEffect(() => {
        GetAllProducts();
    }, []);

    async function GetAllProducts() {
        try {
            const allProducts = await getAllProducts();
            if (allProducts.error) {
                console.error('API Error:', allProducts.error);
                setProducts([]);
            } else {
                setProducts(allProducts);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
            setLoading(false);
        }
    }

    const handleStockIncrease = async (productId) => {
        setAdjustingStock(`${productId}-increase`);
        try {
            const result = await adjustStock(productId, 1);
            if (result.error) {
                alert(`Error increasing stock: ${result.error}`);
            } else {
                console.log(`Stock increased for ${productId}: ${result.previousStock} → ${result.newStock}`);
                // Refresh the products list to show updated stock
                GetAllProducts();
            }
        } catch (error) {
            console.error('Error increasing stock:', error);
            alert('Failed to increase stock. Please try again.');
        } finally {
            setAdjustingStock(null);
        }
    };

    const handleStockDecrease = async (productId) => {
        setAdjustingStock(`${productId}-decrease`);
        try {
            const result = await adjustStock(productId, -1);
            if (result.error) {
                alert(`Error decreasing stock: ${result.error}`);
            } else {
                console.log(`Stock decreased for ${productId}: ${result.previousStock} → ${result.newStock}`);
                // Refresh the products list to show updated stock
                GetAllProducts();
            }
        } catch (error) {
            console.error('Error decreasing stock:', error);
            alert('Failed to decrease stock. Please try again.');
        } finally {
            setAdjustingStock(null);
        }
    };

    if (loading) {
        return (
            <div className='min-h-screen bg-[#19191a] flex items-center justify-center'>
                <div className='text-white text-xl'>Loading...</div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-[#19191a]'>
            <Header />

            {/* Hero Section */}
            <div className='pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-7xl mx-auto'>
                    <Breadcrumbs />
                    <div className='text-center'>
                        <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
                            Product Management
                        </h1>
                        <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
                            Manage inventory and monitor stock levels for all Cove merchandise.
                        </p>
                        <div className='w-24 h-1 bg-yellow-500 mx-auto'></div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8'>
                <div className='flex flex-wrap justify-center gap-4'>
                    <Link to='/create-product'>
                        <Button className='bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3'>
                            Create New Product
                        </Button>
                    </Link>
                    <Button
                        variant='outline'
                        className='border-gray-600 text-white hover:bg-gray-800'
                        onClick={GetAllProducts}
                    >
                        Refresh Products
                    </Button>
                </div>
                <div className='text-center mt-4'>
                    <span className='text-gray-400'>
                        Total Products: {products.length}
                    </span>
                </div>
            </div>

            {/* Products Table */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
                {products.length === 0 ? (
                    <div className='text-center py-16'>
                        <div className='text-gray-400 text-xl mb-4'>
                            No products found.
                        </div>
                        <Link to='/create-product'>
                            <Button>Create First Product</Button>
                        </Link>
                    </div>
                ) : (
                    <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50 border-b border-gray-200'>
                                    <tr>
                                        <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Product
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            ID
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Category
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Price
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Stock
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Availability
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {products.map((product) => (
                                        <tr key={product.id} className='hover:bg-gray-50 transition-colors duration-200'>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div className='flex items-center'>
                                                    <div className='h-12 w-12 flex-shrink-0'>
                                                        <img
                                                            className='h-12 w-12 rounded-lg object-cover'
                                                            src={product.image}
                                                            alt={product.name}
                                                            onError={(e) => {
                                                                e.target.src = '/images/placeholder.png';
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='ml-4'>
                                                        <div className='text-sm font-medium text-gray-900'>
                                                            {product.name}
                                                        </div>
                                                        <div className='text-sm text-gray-500 truncate max-w-xs'>
                                                            {product.descriptor || product.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900'>
                                                {product.id}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                                                    {product.tags?.[0] || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                R{product.price}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div className='flex items-center space-x-2'>
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.stock > 20
                                                        ? 'bg-green-100 text-green-800'
                                                        : product.stock > 5
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        <button
                                                            onClick={() => handleStockDecrease(product.id)}
                                                            disabled={adjustingStock === `${product.id}-decrease` || product.stock <= 0}
                                                            className={`px-2 py-1 rounded transition-colors duration-200 ${adjustingStock === `${product.id}-decrease`
                                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                                : product.stock <= 0
                                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                    : 'text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100'
                                                                }`}
                                                            title={product.stock <= 0 ? 'Stock cannot go below 0' : 'Decrease Stock'}
                                                        >
                                                            {adjustingStock === `${product.id}-decrease` ? '...' : '-'}
                                                        </button>
                                                        {product.stock}
                                                        <button
                                                            onClick={() => handleStockIncrease(product.id)}
                                                            disabled={adjustingStock === `${product.id}-increase`}
                                                            className={`px-2 py-1 rounded transition-colors duration-200 ${adjustingStock === `${product.id}-increase`
                                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                                : 'text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100'
                                                                }`}
                                                            title='Increase Stock'
                                                        >
                                                            {adjustingStock === `${product.id}-increase` ? '...' : '+'}
                                                        </button>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.availability === 'In Stock'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.availability || 'Unknown'}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                                <div className='flex space-x-2'>
                                                    <Link
                                                        to={`/product/${product.id}`}
                                                        className='text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors duration-200'
                                                        title='View Details'
                                                    >
                                                        View
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className='text-center mt-16'>
                    <Link to='/'>
                        <Button variant='outline' className='mr-4 border-gray-600 text-white hover:bg-gray-800'>
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>

            <FooterCard />
        </div>
    );
};

export default EditProducts;
