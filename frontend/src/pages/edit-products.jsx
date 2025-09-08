import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { adjustStock, getAllProducts } from '../backend/api.js';
import FooterCard from '../cards/footer.jsx';
import Header from '../components/header.jsx';
import SaveChangesPopup from '../components/save-changes-popup.jsx';
import { Button } from '../components/ui/button.jsx';

const EditProducts = () => {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]); // Store original state from database
    const [loading, setLoading] = useState(true);
    const [savingChanges, setSavingChanges] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState({
        type: 'success',
        message: '',
        details: '',
    });

    useEffect(() => {
        GetAllProducts();
    }, []);

    const showNotification = (type, message, details = '') => {
        setPopupData({ type, message, details });
        setShowPopup(true);
    };

    async function GetAllProducts() {
        try {
            const allProducts = await getAllProducts();
            if (allProducts.error) {
                console.error('API Error:', allProducts.error);
                setProducts([]);
                setOriginalProducts([]);
            } else {
                setProducts(allProducts);
                setOriginalProducts([...allProducts]); // Deep copy for comparison
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
            setOriginalProducts([]);
            setLoading(false);
        }
    }

    const handleSaveAllChanges = async () => {
        setSavingChanges(true);
        try {
            let successCount = 0;
            let errorCount = 0;
            let updatedProducts = [];

            for (const product of products) {
                // Find the original product to compare changes
                const originalProduct = originalProducts.find(
                    (p) => p.id === product.id
                );
                if (!originalProduct) continue;

                // Check if stock has changed
                const stockChanged = product.stock !== originalProduct.stock;

                if (stockChanged) {
                    // Calculate the stock adjustment needed
                    const stockAdjustment =
                        product.stock - originalProduct.stock;

                    const result = await adjustStock(
                        product.id,
                        stockAdjustment
                    );
                    if (result.error) {
                        console.error(
                            `Failed to update stock for product ${product.id}:`,
                            result.error
                        );
                        errorCount++;
                    } else {
                        successCount++;
                        updatedProducts.push(product.name);
                    }
                }
            }

            if (successCount > 0) {
                showNotification(
                    'success',
                    'Changes Saved Successfully!',
                    `Updated ${successCount} product${
                        successCount !== 1 ? 's' : ''
                    }: ${updatedProducts.join(', ')}`
                );
                // Refresh the products list to get updated data from database
                await GetAllProducts();
                setHasChanges(false);
            }

            if (errorCount > 0) {
                showNotification(
                    'error',
                    'Some Updates Failed',
                    `Failed to update ${errorCount} product${
                        errorCount !== 1 ? 's' : ''
                    }. Please try again.`
                );
            }

            if (successCount === 0 && errorCount === 0) {
                showNotification(
                    'warning',
                    'No Changes Detected',
                    'No stock changes were made since the last save.'
                );
            }
        } catch (error) {
            console.error('Error saving changes:', error);
            showNotification(
                'error',
                'Save Failed',
                'An unexpected error occurred. Please try again.'
            );
        } finally {
            setSavingChanges(false);
        }
    };

    const handleStockIncrease = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId
                    ? { ...product, stock: product.stock + 1 }
                    : product
            )
        );
        setHasChanges(true);
    };

    const handleStockDecrease = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId && product.stock > 0
                    ? { ...product, stock: product.stock - 1 }
                    : product
            )
        );
        setHasChanges(true);
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
                    <div className='text-center'>
                        <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
                            Product Management
                        </h1>
                        <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
                            Manage inventory and monitor stock levels for all
                            Cove merchandise. Make changes and save them all at
                            once.
                        </p>
                        <div className='w-24 h-1 bg-[#e79210] mx-auto'></div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8'>
                <div className='flex flex-wrap justify-center gap-4'>
                    <Button
                        variant='secondary'
                        onClick={handleSaveAllChanges}
                        disabled={savingChanges || !hasChanges}
                        className='px-6 py-3 text-white'
                    >
                        {savingChanges
                            ? 'Saving Changes...'
                            : 'Save All Changes'}
                    </Button>
                    <Link to='/create-product'>
                        <Button className='bg-[#e79210] text-black px-6 py-3'>
                            Create New Product
                        </Button>
                    </Link>
                </div>
                <div className='text-center mt-4'>
                    <span className='text-gray-400'>
                        Total Products: {products.length}
                        {hasChanges && (
                            <span className='text-yellow-400 ml-2'>
                                • Unsaved Changes
                            </span>
                        )}
                    </span>
                    <div className='text-sm text-gray-500 mt-1'>
                        Stock changes will be saved when you click "Save All
                        Changes"
                    </div>
                </div>
            </div>

            {/* Products Management */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
                {products.length === 0 ? (
                    <div className='text-center py-16'>
                        <div className='text-gray-400 text-xl mb-4'>
                            No products found.
                        </div>
                        <Link to='/create-product'>
                            <Button className='bg-[#e79210] hover:bg-[#d68a0f] text-black font-semibold'>
                                Create First Product
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className='space-y-6'>
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className='bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]'
                            >
                                <div className='flex flex-col lg:flex-row'>
                                    {/* Product Image */}
                                    <div className='lg:w-1/4 h-48 lg:h-auto overflow-hidden'>
                                        <img
                                            className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
                                            src={product.image}
                                            alt={product.name}
                                            onError={(e) => {
                                                e.target.src =
                                                    '/images/placeholder.png';
                                            }}
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className='lg:w-3/4 p-6 flex flex-col justify-between'>
                                        <div>
                                            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4'>
                                                <div className='flex-1'>
                                                    <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                                                        {product.name}
                                                    </h3>
                                                    <p className='text-gray-600 mb-3 leading-relaxed'>
                                                        {product.descriptor ||
                                                            product.description}
                                                    </p>
                                                    <div className='flex flex-wrap gap-3 mb-3'>
                                                        <span className='inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full'>
                                                            ID: {product.id}
                                                        </span>
                                                        <span className='inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-200 text-gray-800 rounded-full'>
                                                            {product
                                                                .tags?.[0] ||
                                                                'Uncategorized'}
                                                        </span>
                                                        <span
                                                            className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                                                                (product.stock ===
                                                                0
                                                                    ? 'Out of Stock'
                                                                    : product.availability) ===
                                                                'In Stock'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : (product.stock ===
                                                                      0
                                                                          ? 'Out of Stock'
                                                                          : product.availability) ===
                                                                      'Pre-order'
                                                                    ? 'bg-yellow-100 text-yellow-800'
                                                                    : 'bg-red-100 text-red-800'
                                                            }`}
                                                        >
                                                            {product.stock === 0
                                                                ? 'Out of Stock'
                                                                : product.availability ||
                                                                  'Unknown'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className='text-right sm:ml-6'>
                                                    <p className='text-sm text-gray-500 mb-1'>
                                                        Price
                                                    </p>
                                                    <p className='text-3xl font-bold text-gray-900'>
                                                        R{product.price}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stock Management and Actions */}
                                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200'>
                                            {/* Stock Management */}
                                            <div className='flex items-center gap-4'>
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-sm font-medium text-gray-700 mr-3'>
                                                        Stock:
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            handleStockDecrease(
                                                                product.id
                                                            )
                                                        }
                                                        disabled={
                                                            product.stock <= 0
                                                        }
                                                        className={`p-2 border border-gray-300 rounded-lg flex items-center justify-center h-10 w-10 text-base font-bold transition-colors ${
                                                            product.stock <= 0
                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                : 'hover:bg-gray-50 cursor-pointer'
                                                        }`}
                                                        title={
                                                            product.stock <= 0
                                                                ? 'Stock cannot go below 0'
                                                                : 'Decrease Stock'
                                                        }
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                    <div className='w-16 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-center text-lg font-medium bg-gray-50'>
                                                        {product.stock}
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleStockIncrease(
                                                                product.id
                                                            )
                                                        }
                                                        className='p-2 border border-gray-300 rounded-lg flex items-center justify-center h-10 w-10 text-base font-bold transition-colors hover:bg-gray-50 cursor-pointer'
                                                        title='Increase Stock'
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className='flex gap-3'>
                                                <Button asChild>
                                                    <Link
                                                        to={`/product/${product.id}`}
                                                    >
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <FooterCard />

            {/* Save Changes Popup */}
            <SaveChangesPopup
                show={showPopup}
                onClose={() => setShowPopup(false)}
                type={popupData.type}
                message={popupData.message}
                details={popupData.details}
            />
        </div>
    );
};

export default EditProducts;
