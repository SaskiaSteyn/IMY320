const USD_TO_ZAR = 18.5;

import React, { useRef, useState } from 'react';
import {
    FaChevronDown,
    FaChevronUp,
    FaMinus,
    FaPlus,
    FaShoppingCart,
} from 'react-icons/fa';
import AddedToCartPopup from './added-to-cart-popup';

const getTagColor = (tag) => {
    switch (tag) {
        case 'mugs':
            return 'var(--candle-light)';
        case 'hoodies':
            return 'var(--olive)';
        case 'totes':
            return 'var(--forest)';
        case 'stickers':
            return '#bfae8a';
        default:
            return 'var(--cafe)';
    }
};

const ProductDetails = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(
        product?.sizes && product.sizes.length > 0
            ? product.sizes[0]
            : 'One size'
    );
    const [showPopup, setShowPopup] = useState(false);
    const sizeDropdownRef = useRef(null);

    // Close dropdown on outside click
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (
                sizeDropdownRef.current &&
                !sizeDropdownRef.current.contains(event.target)
            ) {
                setSizeDropdownOpen(false);
            }
        }
        if (sizeDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sizeDropdownOpen]);

    if (!product) return null;
    const handleAddToCart = () => {
        // Here you would add to cart logic
        setShowPopup(true);
    };
    return (
        <>
            <AddedToCartPopup
                show={showPopup}
                onClose={() => setShowPopup(false)}
                productName={product.name}
                quantity={quantity}
                size={selectedSize}
            />
            <div className='flex flex-col md:flex-row items-start gap-4 text-[var(--background)]'>
                {/* Left: Main image and thumbnails */}
                <div className='flex flex-col items-center gap-4 md:w-1/2 w-full'>
                    <img
                        src={product.image}
                        alt={product.name}
                        className='w-full max-w-md aspect-square object-contain rounded-lg border'
                    />
                    {/* Thumbnails placeholder */}
                </div>
                {/* Right: Details */}
                <div className='flex-1 flex flex-col items-start w-full'>
                    <h2 className='text-3xl font-bold mb-2 tracking-wide'>
                        {product.name}
                    </h2>
                    <p className='text-2xl font-bold mb-2'>
                        R{(product.price * USD_TO_ZAR).toFixed(2)}
                    </p>
                    <p className='mb-4'>{product.description}</p>
                    {/* Tags */}
                    <div className='flex gap-2 mb-4 flex-wrap'>
                        {product.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className='px-2 py-1 text-xs font-medium'
                                style={{
                                    backgroundColor: getTagColor(tag),
                                    borderRadius: '5px',
                                    color: '#fff',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    {/* Size selector - custom dropdown */}
                    <div className='mb-4 w-full'>
                        <label
                            htmlFor='size'
                            className='block mb-1 font-medium'
                        >
                            Size
                        </label>
                        <div
                            className='relative min-w-[140px]'
                            ref={sizeDropdownRef}
                        >
                            <button
                                type='button'
                                className='w-full px-4 py-2 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm text-[var(--background)] font-medium flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-150 justify-between'
                                style={{ minWidth: '140px' }}
                                onClick={() =>
                                    setSizeDropdownOpen((open) => !open)
                                }
                                aria-haspopup='listbox'
                                aria-expanded={sizeDropdownOpen}
                            >
                                {selectedSize}
                                {sizeDropdownOpen ? (
                                    <FaChevronUp />
                                ) : (
                                    <FaChevronDown />
                                )}
                            </button>
                            {sizeDropdownOpen && (
                                <ul
                                    className='absolute left-0 mt-2 w-full rounded-lg shadow-lg bg-white/90 backdrop-blur-sm border border-white/30 z-10'
                                    style={{ minWidth: '140px' }}
                                    role='listbox'
                                >
                                    {(product.sizes && product.sizes.length > 0
                                        ? product.sizes
                                        : ['One size']
                                    ).map((size) => (
                                        <li
                                            key={size}
                                            className={`px-4 py-2 cursor-pointer font-medium transition-all duration-150 border-b border-white/30 last:border-b-0 ${
                                                selectedSize === size
                                                    ? 'bg-white/60 text-[var(--background)]'
                                                    : 'bg-white/20 text-[var(--background)] hover:underline'
                                            }`}
                                            style={
                                                selectedSize === size
                                                    ? { fontWeight: 'bold' }
                                                    : {}
                                            }
                                            onClick={() => {
                                                setSelectedSize(size);
                                                setSizeDropdownOpen(false);
                                            }}
                                            role='option'
                                            aria-selected={
                                                selectedSize === size
                                            }
                                        >
                                            {size}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    {/* Quantity */}
                    <div className='mb-4 w-full'>
                        <label
                            htmlFor='quantity'
                            className='block mb-1 font-medium'
                        >
                            Quantity
                        </label>
                        <div className='flex items-center gap-2'>
                            <button
                                type='button'
                                aria-label='Decrease quantity'
                                className='p-2 border rounded flex items-center justify-center h-8 w-8 text-base font-bold'
                                onClick={() =>
                                    setQuantity((q) => Math.max(1, q - 1))
                                }
                            >
                                <FaMinus style={{ fontSize: '1em' }} />
                            </button>
                            <div
                                className='w-15 h-8 flex items-center justify-center border rounded text-center text-lg font-medium select-none'
                                style={{ minWidth: 48 }}
                            >
                                {quantity}
                            </div>
                            <button
                                type='button'
                                aria-label='Increase quantity'
                                className='p-2 border rounded flex items-center justify-center h-8 w-8 text-base font-bold'
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                <FaPlus style={{ fontSize: '1em' }} />
                            </button>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className='flex flex-col gap-3 w-full mt-2 justify-center'>
                        <button
                            className='w-full px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2 justify-center'
                            style={{ backgroundColor: 'var(--cafe)' }}
                            onClick={handleAddToCart}
                        >
                            <FaShoppingCart className='text-sm' />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
