import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getAllProducts} from '../backend/api.js';
import FooterCard from '../cards/footer.jsx';
import AddedToCartPopup from '../components/added-to-cart-popup.jsx';
import Header from '../components/header.jsx';
import {Button} from '../components/ui/button.jsx';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState({
        productName: '',
        quantity: 1,
    });

    const categories = [
        {key: 'all', label: 'All Products'},
        {key: 'mugs', label: 'Mugs'},
        {key: 'hoodies', label: 'Hoodies'},
        {key: 'totes', label: 'Tote Bags'},
        {key: 'stickers', label: 'Stickers'},
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await getAllProducts();
                if (response.error) {
                    console.error('Error fetching products:', response.error);
                    setProducts([]);
                    setFilteredProducts([]);
                } else {
                    setProducts(response);
                    setFilteredProducts(response);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
                setFilteredProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.tags.includes(selectedCategory)
            );
            setFilteredProducts(filtered);
        }
    }, [selectedCategory, products]);

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
    };

    const handleAddToCart = (product) => {
        // Check if product is out of stock
        if (product.stock === 0) {
            console.log('Cannot add out of stock product to cart');
            return;
        }

        // Get default size for the product
        const defaultSize =
            product.sizes && product.sizes.length > 0
                ? product.sizes[0]
                : 'One size';

        // Create cart item
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            size: defaultSize,
            type: 'merchandise',
        };

        // Get existing cart from localStorage
        try {
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if item with same id and size already exists in cart
            const existingItemIndex = existingCart.findIndex(
                (item) => item.id === cartItem.id && item.size === cartItem.size
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
        setPopupData({productName: product.name, quantity: 1});
        setShowPopup(true);
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
                            Shop Merch
                        </h1>
                        <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
                            Discover our complete collection of writing-inspired
                            merchandise designed to enhance your creative
                            journey.
                        </p>
                        <div className='w-24 h-1 bg-[#e79210] mx-auto'></div>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8'>
                <div className='flex flex-wrap justify-center gap-4'>
                    {categories.map((category) => (
                        <button
                            key={category.key}
                            onClick={() => handleCategoryFilter(category.key)}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.key
                                ? 'bg-[#e79210] text-black shadow-lg'
                                : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
                <div className='text-center mt-4'>
                    <span className='text-gray-400'>
                        Showing {filteredProducts.length} product
                        {filteredProducts.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Products List */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
                {filteredProducts.length === 0 ? (
                    <div className='text-center py-16'>
                        <div className='text-gray-400 text-xl mb-4'>
                            No products found in this category.
                        </div>
                        <Button
                            variant='outline'
                            onClick={() => handleCategoryFilter('all')}
                            className='mr-4'
                        >
                            Show All Products
                        </Button>
                        <Link to='/'>
                            <Button>Back to Home</Button>
                        </Link>
                    </div>
                ) : (
                    <div className='space-y-6'>
                        {filteredProducts.map((product) => (
                            <Link
                                key={product.id}
                                to={product.stock === 0 ? '#' : `/product/${product.id}`}
                                className={`block ${product.stock === 0 ? 'cursor-default' : ''}`}
                                onClick={product.stock === 0 ? (e) => e.preventDefault() : undefined}
                            >
                                <div className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group ${product.stock === 0 ? 'cursor-default' : 'cursor-pointer'
                                    }`}>
                                    <div className='flex flex-col md:flex-row'>
                                        {/* Product Image */}
                                        <div className='md:w-1/3 lg:w-1/4 h-64 md:h-auto overflow-hidden'>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                                                onError={(e) => {
                                                    // Replace image with "No image found" text
                                                    const parent =
                                                        e.target.parentNode;
                                                    parent.innerHTML = `
                                                        <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                                                            <div class="text-center">
                                                                <div class="text-gray-500 text-lg font-medium mb-2">No Image Found</div>
                                                                <div class="text-gray-400 text-sm">${product.name}</div>
                                                            </div>
                                                        </div>
                                                    `;
                                                }}
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className='md:w-2/3 lg:w-3/4 p-6 flex flex-col justify-between'>
                                            <div>
                                                <h3 className='text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300'>
                                                    {product.name}
                                                </h3>
                                                <p className='text-gray-600 text-base mb-4 leading-relaxed'>
                                                    {product.description ||
                                                        product.descriptor}
                                                </p>

                                                {/* Product Info Tags */}
                                                <div className='flex flex-wrap gap-3 mb-4'>
                                                    <span className='inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full'>
                                                        ID: {product.id}
                                                    </span>
                                                    {product.tags &&
                                                        product.tags.length >
                                                        0 && (
                                                            <button
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    handleCategoryFilter(
                                                                        product
                                                                            .tags[0]
                                                                    );
                                                                }}
                                                                className='inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors cursor-pointer'
                                                            >
                                                                {product.tags[0]
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    product.tags[0].slice(
                                                                        1
                                                                    )}
                                                            </button>
                                                        )}
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${product.stock === 0
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-green-100 text-green-800'
                                                            }`}
                                                    >
                                                        {product.stock === 0
                                                            ? 'Out of Stock'
                                                            : 'In Stock'}
                                                    </span>
                                                    {product.availabilityDate &&
                                                        product.availability !==
                                                        'In Stock' && (
                                                            <span className='inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full'>
                                                                Available:{' '}
                                                                {new Date(
                                                                    product.availabilityDate
                                                                ).toLocaleDateString()}
                                                            </span>
                                                        )}
                                                </div>

                                                {/* Available Sizes */}
                                                {product.sizes &&
                                                    product.sizes[0] !==
                                                    'One size' && (
                                                        <div className='mb-4'>
                                                            <span className='text-sm font-medium text-gray-700 mr-2'>
                                                                Available sizes:
                                                            </span>
                                                            <span className='text-sm text-gray-600'>
                                                                {product.sizes.join(
                                                                    ', '
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>

                                            {/* Price and Actions */}
                                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                                                <div className='flex items-baseline gap-2'>
                                                    <span className='text-3xl font-bold text-gray-900'>
                                                        R{product.price}
                                                    </span>
                                                    <span className='text-sm text-gray-500'>
                                                        each
                                                    </span>
                                                </div>
                                                <div className='flex gap-3'>
                                                    <Button
                                                        variant='cart'
                                                        size='lg'
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleAddToCart(
                                                                product
                                                            );
                                                        }}
                                                        disabled={
                                                            product.stock === 0
                                                        }
                                                        className={`mt-6 self-center ${product.stock === 0
                                                            ? 'opacity-50 cursor-not-allowed'
                                                            : ''
                                                            }`}
                                                    >
                                                        {product.stock === 0
                                                            ? 'Out of Stock'
                                                            : 'Add to Cart'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <FooterCard />

            {/* Add to Cart Popup */}
            <AddedToCartPopup
                show={showPopup}
                onClose={() => setShowPopup(false)}
                productName={popupData.productName}
                quantity={popupData.quantity}
            />
        </div>
    );
};

export default AllProducts;
