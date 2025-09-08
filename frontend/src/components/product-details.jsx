import React, { useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaMinus, FaPlus } from 'react-icons/fa';
import AddedToCartPopup from './added-to-cart-popup';
import { Button } from './ui/button';

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
        // Check if product is out of stock
        if (product.stock === 0) {
            console.log('Cannot add out of stock product to cart');
            return;
        }

        // Create cart item with all necessary information
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image,
            size: selectedSize,
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
                existingCart[existingItemIndex].quantity += quantity;
            } else {
                // Add new item to cart
                existingCart.push(cartItem);
            }

            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(existingCart));

            // Trigger storage event to update cart count in header
            window.dispatchEvent(new Event('storage'));

            // Show popup
            setShowPopup(true);
        } catch (error) {
            console.error('Error updating cart:', error);
            // Still show popup even if there's an error
            setShowPopup(true);
        }
    };

    const unitPrice = product.price;
    const totalPrice = unitPrice * quantity;
    return (
        <>
            <AddedToCartPopup
                show={showPopup}
                onClose={() => setShowPopup(false)}
                productName={product.name}
                quantity={quantity}
                size={selectedSize}
            />
            <div className='flex flex-col md:flex-row items-start gap-4 text-[white]'>
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
                    <p className='text-lg mb-1'>
                        Unit price: R{unitPrice.toFixed(2)}
                    </p>
                    <p className='text-2xl font-bold mb-2'>
                        Total: R{totalPrice.toFixed(2)}
                    </p>
                    
                    {/* Stock Status */}
                    <div className='mb-2'>
                        <span
                            className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                                product.stock === 0
                                    ? 'bg-red-100 text-red-800'
                                    : product.stock <= 5
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                            }`}
                        >
                            {product.stock === 0 
                                ? 'Out of Stock'
                                : product.stock <= 5
                                ? `Only ${product.stock} left`
                                : 'In Stock'
                            }
                        </span>
                    </div>
                    
                    <p className='mb-4'>{product.description}</p>
                    {/* Tags */}
                    <div className='flex gap-2 mb-4 flex-wrap'>
                        {product.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className='px-2 py-1 text-xs font-medium'
                                style={{
                                    backgroundColor: '#d2d1d6',
                                    borderRadius: '5px',
                                    color: '#000',
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
                                className='w-full px-4 py-2 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm text-[white] font-medium flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-150 justify-between'
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
                                    className='absolute left-0 mt-2 w-full rounded-lg backdrop-blur-sm border border-white/30 z-10'
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
                                                    ? 'bg-white/60 text-[white]'
                                                    : 'bg-white/20 text-[white] hover:underline'
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
                                className={`p-2 border rounded flex items-center justify-center h-8 w-8 text-base font-bold ${
                                    product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={product.stock === 0}
                                onClick={() =>
                                    setQuantity((q) => Math.max(1, q - 1))
                                }
                            >
                                <FaMinus style={{ fontSize: '1em' }} />
                            </button>
                            <div
                                className={`w-15 h-8 flex items-center justify-center border rounded text-center text-lg font-medium select-none ${
                                    product.stock === 0 ? 'opacity-50' : ''
                                }`}
                                style={{ minWidth: 48 }}
                            >
                                {quantity}
                            </div>
                            <button
                                type='button'
                                aria-label='Increase quantity'
                                className={`p-2 border rounded flex items-center justify-center h-8 w-8 text-base font-bold ${
                                    product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={product.stock === 0}
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                <FaPlus style={{ fontSize: '1em' }} />
                            </button>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className='flex flex-col gap-3 w-full mt-2 justify-center'>
                        <Button
                            onClick={handleAddToCart}
                            variant='cart'
                            size='lg'
                            className={`w-full ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
