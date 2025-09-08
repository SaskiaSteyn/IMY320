import React, { useEffect, useRef, useState } from 'react';
import {
    FaChevronDown,
    FaChevronUp,
    FaShoppingCart,
    FaTimes,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../backend/api.js';
import AddedToCartPopup from './added-to-cart-popup';

const Catalogue = ({ CallScroll }) => {
    const [selectedTag, setSelectedTag] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [catalogueItems, setCatalogueItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);

    const [showPopup, setShowPopup] = useState(false);
    const [popupItem, setPopupItem] = useState(null);

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await getAllProducts();
                if (response.error) {
                    console.error('Error fetching products:', response.error);
                    setCatalogueItems([]);
                } else {
                    // Products from API should already have the correct price in ZAR
                    setCatalogueItems(response);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setCatalogueItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (item) => {
        // Check if product is out of stock
        if (item.stock === 0) {
            console.log('Cannot add out of stock product to cart');
            return;
        }

        // Get default size for the product
        const defaultSize =
            item.sizes && item.sizes.length > 0 ? item.sizes[0] : 'One size';

        // Create cart item
        const cartItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
            size: defaultSize,
            type: 'merchandise',
        };

        // Get existing cart from localStorage
        try {
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if item with same id and size already exists in cart
            const existingItemIndex = existingCart.findIndex(
                (cartItem) =>
                    cartItem.id === item.id && cartItem.size === defaultSize
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
        setPopupItem(item);
        setShowPopup(true);
    };

    // Filter items based on selected tag
    const filteredItems =
        selectedTag === 'all'
            ? catalogueItems
            : catalogueItems.filter((item) => item.tags.includes(selectedTag));

    const availableTags = ['all', 'mugs', 'hoodies', 'totes', 'stickers'];

    const getTagColor = (tag) => {
        switch (tag) {
            case 'mugs':
                return '#FFF8DC';
            case 'hoodies':
                return '#808000';
            case 'totes':
                return '#228B22';
            case 'stickers':
                return '#bfae8a'; // Slightly darker than hazelwood
            default:
                return '#8B4513';
        }
    };

    const handleItemClicked = (item) => {
        // Handle item click logic here
        localStorage.setItem('lastViewedItemId', item.id);
        CallScroll();
    };

    // Custom dropdown close on outside click
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        }
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    // Load at right position

    return (
        <div className='w-full relative bg-[#d1d6d7]'>
            {loading ? (
                <div className='p-8 text-center'>
                    <h2
                        className='text-4xl font-bold text-center mb-12'
                        style={{ color: 'white' }}
                    >
                        Cove Merch
                    </h2>
                    <div className='text-xl' style={{ color: 'white' }}>
                        Loading products...
                    </div>
                </div>
            ) : (
                <>
                    <AddedToCartPopup
                        show={showPopup}
                        onClose={() => setShowPopup(false)}
                        productName={popupItem ? popupItem.name : ''}
                        quantity={1}
                        size={
                            popupItem && popupItem.size
                                ? popupItem.size
                                : undefined
                        }
                    />
                    <div className='p-8'>
                        <h2
                            className='text-4xl font-bold text-center mb-12'
                            style={{ color: 'white' }}
                        >
                            Cove Merch
                        </h2>

                        {/* Custom Filter Dropdown */}
                        <div className='max-w-6xl mx-auto mb-6'>
                            <div className='flex items-center gap-4 justify-center'>
                                <span
                                    className='text-lg font-medium'
                                    style={{ color: 'white' }}
                                >
                                    Filter by category:
                                </span>
                                <div className='relative' ref={dropdownRef}>
                                    <button
                                        className='px-4 py-2 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm text-white font-medium flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[140px]'
                                        style={{ color: 'white' }}
                                        onClick={() =>
                                            setDropdownOpen((open) => !open)
                                        }
                                        aria-haspopup='listbox'
                                        aria-expanded={dropdownOpen}
                                    >
                                        {selectedTag === 'all'
                                            ? 'All Items'
                                            : selectedTag
                                                  .charAt(0)
                                                  .toUpperCase() +
                                              selectedTag.slice(1)}
                                        {dropdownOpen ? (
                                            <FaChevronUp />
                                        ) : (
                                            <FaChevronDown />
                                        )}
                                    </button>
                                    {dropdownOpen && (
                                        <ul
                                            className='absolute left-0 mt-2 w-full rounded-lg shadow-lg bg-white/20 backdrop-blur-sm border border-white/30 z-10'
                                            style={{ minWidth: '140px' }}
                                            role='listbox'
                                        >
                                            {availableTags.map((tag) => (
                                                <li
                                                    key={tag}
                                                    className={`px-4 py-2 cursor-pointer font-medium transition-all duration-150 border-b border-white/30 ${
                                                        selectedTag === tag
                                                            ? 'bg-white/20 text-[white]'
                                                            : 'bg-white/20 text-[white] hover:underline'
                                                    }`}
                                                    style={
                                                        selectedTag === tag
                                                            ? {
                                                                  fontWeight:
                                                                      'bold',
                                                              }
                                                            : {}
                                                    }
                                                    onClick={() => {
                                                        setSelectedTag(tag);
                                                        setDropdownOpen(false);
                                                    }}
                                                    role='option'
                                                    aria-selected={
                                                        selectedTag === tag
                                                    }
                                                >
                                                    {tag === 'all'
                                                        ? 'All Items'
                                                        : tag
                                                              .charAt(0)
                                                              .toUpperCase() +
                                                          tag.slice(1)}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                {selectedTag !== 'all' && (
                                    <button
                                        onClick={() => setSelectedTag('all')}
                                        className='px-3 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white font-medium transition-all duration-200 flex items-center gap-2'
                                    >
                                        <FaTimes className='text-sm' />
                                        Clear Filter
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className='max-w-6xl mx-auto space-y-4'>
                            {filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    className='bg-white/20 backdrop-blur-sm rounded-lg shadow-lg border border-white/30'
                                >
                                    <div className='flex items-center justify-between p-4'>
                                        <Link
                                            to={`/product/${item.id}`}
                                            className='flex-1 flex items-center gap-4 text-left hover:bg-white/10 transition-all duration-200 rounded-lg p-2 no-underline'
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                            }}
                                            onClick={() =>
                                                handleItemClicked(item)
                                            }
                                            id={`catalog-item-${item.id}`}
                                        >
                                            {/* Item Image */}
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className='w-20 h-20 object-contain rounded-lg mr-4 border border-white/30 bg-white/60'
                                            />
                                            <div className='flex-1'>
                                                <div className='flex items-center gap-3 mb-1'>
                                                    <h3
                                                        className='text-lg font-semibold'
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                    >
                                                        {item.name}
                                                    </h3>
                                                    <div className='flex gap-1'>
                                                        {item.tags.map(
                                                            (tag, tagIndex) => (
                                                                <span
                                                                    key={
                                                                        tagIndex
                                                                    }
                                                                    className='px-2 py-1 text-xs font-medium'
                                                                    style={{
                                                                        backgroundColor:
                                                                            getTagColor(
                                                                                tag
                                                                            ),
                                                                        borderRadius:
                                                                            '5px',
                                                                    }}
                                                                >
                                                                    {tag}
                                                                </span>
                                                            )
                                                        )}
                                                        {/* Stock Status */}
                                                        <span
                                                            className={`px-2 py-1 text-xs font-medium rounded ${
                                                                item.stock === 0
                                                                    ? 'bg-red-500 text-white'
                                                                    : item.stock <=
                                                                      5
                                                                    ? 'bg-yellow-500 text-black'
                                                                    : 'bg-green-500 text-white'
                                                            }`}
                                                        >
                                                            {item.stock === 0
                                                                ? 'Out of Stock'
                                                                : item.stock <=
                                                                  5
                                                                ? `Only ${item.stock} left`
                                                                : 'In Stock'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p
                                                    className='text-xl font-bold'
                                                    style={{
                                                        color: 'white',
                                                    }}
                                                >
                                                    R{item.price.toFixed(2)}
                                                </p>
                                            </div>
                                        </Link>
                                        <div className='flex items-center gap-3'>
                                            <button
                                                onClick={() =>
                                                    handleAddToCart(item)
                                                }
                                                disabled={item.stock === 0}
                                                className={`px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2 ${
                                                    item.stock === 0
                                                        ? 'opacity-50 cursor-not-allowed'
                                                        : ''
                                                }`}
                                                style={{
                                                    backgroundColor: '#8B4513',
                                                }}
                                            >
                                                <FaShoppingCart className='text-sm' />
                                                {item.stock === 0
                                                    ? 'Out of Stock'
                                                    : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Catalogue;
