import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FooterCard from '../cards/footer.jsx';
import AddedToCartPopup from '../components/added-to-cart-popup.jsx';
import Breadcrumbs from '../components/breadcrumbs.jsx';
import Header from '../components/header.jsx';
import { Button } from '../components/ui/button.jsx';
import catalogue from '../data/catalogue.json';

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
        { key: 'all', label: 'All Products' },
        { key: 'mugs', label: 'Mugs' },
        { key: 'hoodies', label: 'Hoodies' },
        { key: 'totes', label: 'Tote Bags' },
        { key: 'stickers', label: 'Stickers' },
    ];

    useEffect(() => {
        setProducts(catalogue);
        setFilteredProducts(catalogue);
        setLoading(false);
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
        // Create cart item
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            type: 'merchandise',
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
        setPopupData({ productName: product.name, quantity: 1 });
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
                    <Breadcrumbs showShop={false} />
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
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                selectedCategory === category.key
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
                                to={`/product/${product.id}`}
                                className='block'
                            >
                                <div className='bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group'>
                                    <div className='flex flex-col md:flex-row'>
                                        {/* Product Image */}
                                        <div className='md:w-1/3 lg:w-1/4 h-64 md:h-auto overflow-hidden'>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                                                onError={(e) => {
                                                    // Fallback to category banner image
                                                    const category =
                                                        product.tags[0];
                                                    e.target.src = `/images/new/merch/cove-${category.slice(
                                                        0,
                                                        -1
                                                    )}.png`;
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
                                                    {product.description}
                                                </p>

                                                {/* Product Tags */}
                                                <div className='flex flex-wrap gap-2 mb-4'>
                                                    {product.tags.map(
                                                        (tag, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    handleCategoryFilter(
                                                                        tag
                                                                    );
                                                                }}
                                                                className='px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full cursor-pointer'
                                                            >
                                                                {tag}
                                                            </button>
                                                        )
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
                                                        className='mt-6 self-center'
                                                    >
                                                        Add to Cart
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
