import {useEffect, useState} from 'react';
import {FaMinus, FaPlus, FaTrash} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {
    adjustStock,
    DeleteProduct,
    getAllProducts,
    updateProduct,
} from '../backend/api.js';
import FooterCard from '../cards/footer.jsx';
import Header from '../components/header.jsx';
import SaveChangesPopup from '../components/save-changes-popup.jsx';
import {Button} from '../components/ui/button.jsx';

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
    const [productToDelete, setProductToDelete] = useState(null);

    const hasProductChanges = (product) => {
        const originalProduct = originalProducts.find(
            (p) => p.id === product.id
        );
        if (!originalProduct) return false;

        return (
            originalProduct.stock !== product.stock ||
            originalProduct.name !== product.name ||
            originalProduct.descriptor !== product.descriptor ||
            originalProduct.price !== product.price ||
            JSON.stringify(originalProduct.tags) !==
            JSON.stringify(product.tags)
        );
    };

    useEffect(() => {
        GetAllProducts();
    }, []);

    const showNotification = (type, message, details = '') => {
        setPopupData({type, message, details});
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

                // Check what has changed
                const stockChanged = product.stock !== originalProduct.stock;
                const nameChanged = product.name !== originalProduct.name;
                const descriptorChanged =
                    product.descriptor !== originalProduct.descriptor;
                const priceChanged = product.price !== originalProduct.price;
                const tagsChanged =
                    JSON.stringify(product.tags) !==
                    JSON.stringify(originalProduct.tags);

                const hasChanges =
                    stockChanged ||
                    nameChanged ||
                    descriptorChanged ||
                    priceChanged ||
                    tagsChanged;

                if (hasChanges) {
                    let updateSuccessful = true;

                    // Handle stock changes through adjustStock API
                    if (stockChanged) {
                        const stockAdjustment =
                            product.stock - originalProduct.stock;
                        const stockResult = await adjustStock(
                            product.id,
                            stockAdjustment
                        );
                        if (stockResult.error) {
                            console.error(
                                `Failed to update stock for product ${product.id}:`,
                                stockResult.error
                            );
                            updateSuccessful = false;
                        }
                    }

                    // Handle other changes through updateProduct API
                    if (
                        nameChanged ||
                        descriptorChanged ||
                        priceChanged ||
                        tagsChanged
                    ) {
                        const updateData = {
                            name: product.name,
                            descriptor: product.descriptor,
                            price: product.price,
                            tags: product.tags,
                        };
                        const updateResult = await updateProduct(
                            product.id,
                            updateData
                        );
                        if (updateResult.error) {
                            console.error(
                                `Failed to update details for product ${product.id}:`,
                                updateResult.error
                            );
                            updateSuccessful = false;
                        }
                    }

                    if (updateSuccessful) {
                        successCount++;
                        updatedProducts.push(product.name);
                    } else {
                        errorCount++;
                    }
                }
            }

            if (successCount > 0) {
                showNotification(
                    'success',
                    'Changes Saved Successfully!',
                    `Updated ${successCount} product${successCount !== 1 ? 's' : ''
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
                    `Failed to update ${errorCount} product${errorCount !== 1 ? 's' : ''
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
            prevProducts.map((product) => {
                if (product.id === productId) {
                    const updatedProduct = {
                        ...product,
                        stock: product.stock + 1,
                    };
                    console.log(
                        `Stock increased for ${product.name}: ${product.stock} -> ${updatedProduct.stock}`
                    );
                    return updatedProduct;
                }
                return product;
            })
        );
        setHasChanges(true);
    };

    const handleStockDecrease = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => {
                if (product.id === productId && product.stock > 0) {
                    const updatedProduct = {
                        ...product,
                        stock: product.stock - 1,
                    };
                    console.log(
                        `Stock decreased for ${product.name}: ${product.stock} -> ${updatedProduct.stock}`
                    );
                    return updatedProduct;
                }
                return product;
            })
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
                                            src='/images/merch/placeholder.png'
                                            alt={product.name}
                                            ref={(img) => {
                                                if (img && product.image) {
                                                    const testImg = new Image();
                                                    testImg.onload = () => {
                                                        img.src = product.image;
                                                    };
                                                    testImg.src = product.image;
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className='lg:w-3/4 p-6 flex flex-col justify-between'>
                                        <div>
                                            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4'>
                                                <div className='flex-1'>
                                                    <input
                                                        type='text'
                                                        className='text-2xl font-bold text-gray-900 mb-2 w-full border-b border-transparent hover:border-gray-300 focus:border-[#e79210] focus:outline-none px-2 py-1 rounded'
                                                        value={product.name}
                                                        onChange={(e) => {
                                                            setProducts(
                                                                (
                                                                    prevProducts
                                                                ) =>
                                                                    prevProducts.map(
                                                                        (p) =>
                                                                            p.id ===
                                                                                product.id
                                                                                ? {
                                                                                    ...p,
                                                                                    name: e
                                                                                        .target
                                                                                        .value,
                                                                                }
                                                                                : p
                                                                    )
                                                            );
                                                            setHasChanges(true);
                                                        }}
                                                    />
                                                    <textarea
                                                        className='text-gray-600 mb-3 leading-relaxed w-full border-b border-transparent hover:border-gray-300 focus:border-[#e79210] focus:outline-none px-2 py-1 rounded resize-none'
                                                        defaultValue={
                                                            product.descriptor ||
                                                            product.description ||
                                                            ''
                                                        }
                                                        rows='2'
                                                        onInput={(e) => {
                                                            setProducts(
                                                                (
                                                                    prevProducts
                                                                ) =>
                                                                    prevProducts.map(
                                                                        (p) =>
                                                                            p.id ===
                                                                                product.id
                                                                                ? {
                                                                                    ...p,
                                                                                    descriptor:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                }
                                                                                : p
                                                                    )
                                                            );
                                                            setHasChanges(true);
                                                        }}
                                                    />
                                                    <div className='flex flex-wrap gap-3 mb-3'>
                                                        <span className='inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full'>
                                                            ID: {product.id}
                                                        </span>
                                                        <input
                                                            type='text'
                                                            className='px-3 py-1 text-sm font-medium bg-gray-200 text-gray-800 rounded-full border-transparent hover:border-gray-300 focus:border-[#e79210] focus:outline-none'
                                                            value={
                                                                product
                                                                    .tags?.[0] ||
                                                                'Uncategorized'
                                                            }
                                                            onChange={(e) => {
                                                                setProducts(
                                                                    (
                                                                        prevProducts
                                                                    ) =>
                                                                        prevProducts.map(
                                                                            (
                                                                                p
                                                                            ) =>
                                                                                p.id ===
                                                                                    product.id
                                                                                    ? {
                                                                                        ...p,
                                                                                        tags: [
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                            ...(p.tags?.slice(
                                                                                                1
                                                                                            ) ||
                                                                                                []),
                                                                                        ],
                                                                                    }
                                                                                    : p
                                                                        )
                                                                );
                                                                setHasChanges(
                                                                    true
                                                                );
                                                            }}
                                                        />
                                                        <span
                                                            className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${product.stock ===
                                                                0
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-green-100 text-green-800'
                                                                }`}
                                                        >
                                                            {(() => {
                                                                console.log(
                                                                    `Rendering stock status for ${product.name}: stock=${product.stock}, availability=${product.availability}`
                                                                );
                                                                return product.stock ===
                                                                    0
                                                                    ? 'Out of Stock'
                                                                    : 'In Stock';
                                                            })()}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className='text-right sm:ml-6'>
                                                    <p className='text-sm text-gray-500 mb-1'>
                                                        Price
                                                    </p>
                                                    <div className='flex items-center'>
                                                        <span className='text-3xl font-bold text-gray-900 mr-1'>
                                                            R
                                                        </span>
                                                        <input
                                                            type='number'
                                                            className='text-3xl font-bold text-gray-900 w-32 border-b border-transparent hover:border-gray-300 focus:border-[#e79210] focus:outline-none px-2 py-1 rounded'
                                                            value={
                                                                product.price
                                                            }
                                                            min='0'
                                                            step='0.01'
                                                            onChange={(e) => {
                                                                const value =
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                if (
                                                                    !isNaN(
                                                                        value
                                                                    ) &&
                                                                    value >= 0
                                                                ) {
                                                                    setProducts(
                                                                        (
                                                                            prevProducts
                                                                        ) =>
                                                                            prevProducts.map(
                                                                                (
                                                                                    p
                                                                                ) =>
                                                                                    p.id ===
                                                                                        product.id
                                                                                        ? {
                                                                                            ...p,
                                                                                            price: value,
                                                                                        }
                                                                                        : p
                                                                            )
                                                                    );
                                                                    setHasChanges(
                                                                        true
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    </div>
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
                                                        className={`p-2 border border-gray-300 rounded-lg flex items-center justify-center h-10 w-10 text-base font-bold transition-colors ${product.stock <= 0
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
                                                {hasProductChanges(product) && (
                                                    <Button
                                                        variant='secondary'
                                                        onClick={async () => {
                                                            setSavingChanges(
                                                                true
                                                            );
                                                            try {
                                                                const originalProduct =
                                                                    originalProducts.find(
                                                                        (p) =>
                                                                            p.id ===
                                                                            product.id
                                                                    );

                                                                // Handle stock changes
                                                                if (
                                                                    product.stock !==
                                                                    originalProduct.stock
                                                                ) {
                                                                    const stockAdjustment =
                                                                        product.stock -
                                                                        originalProduct.stock;
                                                                    await adjustStock(
                                                                        product.id,
                                                                        stockAdjustment
                                                                    );
                                                                }

                                                                // Handle other changes
                                                                const updateData =
                                                                {
                                                                    name: product.name,
                                                                    descriptor:
                                                                        product.descriptor,
                                                                    price: product.price,
                                                                    tags: product.tags,
                                                                };

                                                                await updateProduct(
                                                                    product.id,
                                                                    updateData
                                                                );
                                                                showNotification(
                                                                    'success',
                                                                    'Changes Saved',
                                                                    `Successfully updated ${product.name}`
                                                                );
                                                                await GetAllProducts();
                                                                setHasChanges(
                                                                    false
                                                                );
                                                            } catch (err) {
                                                                showNotification(
                                                                    'error',
                                                                    err,
                                                                    'An unexpected error occurred'
                                                                );
                                                            } finally {
                                                                setSavingChanges(
                                                                    false
                                                                );
                                                            }
                                                        }}
                                                        disabled={savingChanges}
                                                    >
                                                        {savingChanges
                                                            ? 'Saving...'
                                                            : 'Save Changes'}
                                                    </Button>
                                                )}
                                                <Button>
                                                    <Link
                                                        to={`/product/${product.id}`}
                                                    >
                                                        View Details
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant='destructive'
                                                    onClick={() =>
                                                        setProductToDelete(
                                                            product
                                                        )
                                                    }
                                                    className='bg-red-600 hover:bg-red-700 text-white'
                                                >
                                                    <FaTrash className='mr-2' />
                                                    Delete
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

            {/* Delete Confirmation Dialog */}
            {productToDelete && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4'>
                        <h3 className='text-xl font-bold text-gray-900 mb-4'>
                            Confirm Delete
                        </h3>
                        <p className='text-gray-600 mb-6'>
                            Are you sure you want to delete "
                            {productToDelete.name}"? This action cannot be
                            undone.
                        </p>
                        <div className='flex justify-end gap-4'>
                            <Button
                                variant='secondary'
                                onClick={() => setProductToDelete(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant='destructive'
                                className='bg-red-600 hover:bg-red-700 text-white'
                                onClick={async () => {
                                    try {
                                        console.log(
                                            'Attempting to delete product:',
                                            {
                                                id: productToDelete.id,
                                                name: productToDelete.name,
                                            }
                                        );
                                        const result = await DeleteProduct(
                                            productToDelete.id
                                        );
                                        if (result.error) {
                                            console.error(
                                                'Delete failed:',
                                                result.error
                                            );
                                            showNotification(
                                                'error',
                                                'Delete Failed',
                                                result.error
                                            );
                                        } else {
                                            showNotification(
                                                'success',
                                                'Product Deleted',
                                                `Successfully deleted ${productToDelete.name}`
                                            );
                                            await GetAllProducts();
                                        }
                                    } catch (err) {
                                        console.error('Delete failed:', err);
                                        showNotification(
                                            'error',
                                            'Delete Failed',
                                            'An unexpected error occurred'
                                        );
                                    }
                                    setProductToDelete(null);
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}

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
