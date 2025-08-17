import React, { useRef, useState } from 'react';
import {
    FaChevronDown,
    FaChevronUp,
    FaShoppingCart,
    FaTimes,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import catalogueData from '../data/catalogue.json';
import AddedToCartPopup from './added-to-cart-popup';

const Catalogue = () => {
    const [selectedTag, setSelectedTag] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [showPopup, setShowPopup] = useState(false);
    const [popupItem, setPopupItem] = useState(null);

    const handleAddToCart = (item) => {
        // Add your cart logic here
        setPopupItem(item);
        setShowPopup(true);
    };

    // USD to ZAR conversion (as of Aug 2025, approx 1 USD = 18.5 ZAR)
    const USD_TO_ZAR = 18.5;
    // Import catalogue items from JSON and convert price
    const catalogueItems = catalogueData.map((item) => ({
        ...item,
        price: item.price * USD_TO_ZAR,
    }));

    // Filter items based on selected tag
    const filteredItems =
        selectedTag === 'all'
            ? catalogueItems
            : catalogueItems.filter((item) => item.tags.includes(selectedTag));

    const availableTags = ['all', 'mugs', 'hoodies', 'totes', 'stickers'];

    const getTagColor = (tag) => {
        switch (tag) {
            case 'mugs':
                return 'var(--candle-light)';
            case 'hoodies':
                return 'var(--olive)';
            case 'totes':
                return 'var(--forest)';
            case 'stickers':
                return '#bfae8a'; // Slightly darker than var(--hazelwood)
            default:
                return 'var(--cafe)';
        }
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

    return (
        <div className='w-full relative bg-[#d1d6d7]'>
            <AddedToCartPopup
                show={showPopup}
                onClose={() => setShowPopup(false)}
                productName={popupItem ? popupItem.name : ''}
                quantity={1}
                size={popupItem && popupItem.size ? popupItem.size : undefined}
            />
            <div className='p-8'>
                <h2
                    className='text-4xl font-bold text-center mb-12'
                    style={{ color: 'var(--background)' }}
                >
                    Cove Merch
                </h2>

                {/* Custom Filter Dropdown */}
                <div className='max-w-6xl mx-auto mb-6'>
                    <div className='flex items-center gap-4 justify-center'>
                        <span
                            className='text-lg font-medium'
                            style={{ color: 'var(--background)' }}
                        >
                            Filter by category:
                        </span>
                        <div className='relative' ref={dropdownRef}>
                            <button
                                className='px-4 py-2 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm text-white font-medium flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[140px]'
                                style={{ color: 'var(--background)' }}
                                onClick={() => setDropdownOpen((open) => !open)}
                                aria-haspopup='listbox'
                                aria-expanded={dropdownOpen}
                            >
                                {selectedTag === 'all'
                                    ? 'All Items'
                                    : selectedTag.charAt(0).toUpperCase() +
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
                                                    ? 'bg-white/20 text-[var(--background)]'
                                                    : 'bg-white/20 text-[var(--background)] hover:underline'
                                            }`}
                                            style={
                                                selectedTag === tag
                                                    ? { fontWeight: 'bold' }
                                                    : {}
                                            }
                                            onClick={() => {
                                                setSelectedTag(tag);
                                                setDropdownOpen(false);
                                            }}
                                            role='option'
                                            aria-selected={selectedTag === tag}
                                        >
                                            {tag === 'all'
                                                ? 'All Items'
                                                : tag.charAt(0).toUpperCase() +
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
                                                    color: 'var(--background)',
                                                }}
                                            >
                                                {item.name}
                                            </h3>
                                            <div className='flex gap-1'>
                                                {item.tags.map(
                                                    (tag, tagIndex) => (
                                                        <span
                                                            key={tagIndex}
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
                                            </div>
                                        </div>
                                        <p
                                            className='text-xl font-bold'
                                            style={{
                                                color: 'var(--background)',
                                            }}
                                        >
                                            R{item.price.toFixed(2)}
                                        </p>
                                    </div>
                                </Link>
                                <div className='flex items-center gap-3'>
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className='px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2'
                                        style={{
                                            backgroundColor: 'var(--cafe)',
                                        }}
                                    >
                                        <FaShoppingCart className='text-sm' />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Catalogue;
