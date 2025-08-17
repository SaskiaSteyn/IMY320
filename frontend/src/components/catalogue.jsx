import React, {useState} from 'react';
import {FaChevronDown, FaChevronUp, FaShoppingCart, FaTimes} from 'react-icons/fa';

const Catalogue = () => {
    const [selectedTag, setSelectedTag] = useState('all');

    const handleAddToCart = (item) => {
        console.log('Added to cart:', item);
        // Add your cart logic here
    };

    const catalogueItems = [
        {
            name: 'Classic White Mug',
            tags: ['mugs'],
            price: 14.99,
            image: '/images/merch/White mug.png',
            description: 'Clean, minimalist white ceramic mug perfect for your daily writing ritual. Features the subtle Cove logo and holds 11oz of your favorite beverage to fuel your creativity.'
        },
        {
            name: 'Earthy Brown Mug',
            tags: ['mugs'],
            price: 16.99,
            image: '/images/merch/Brown mug.png',
            description: 'Warm brown ceramic mug that embodies the cozy writing atmosphere. Handcrafted finish with comfortable grip, perfect for those long writing sessions by the fireplace.'
        },
        {
            name: 'Forest Green Mug',
            tags: ['mugs'],
            price: 15.99,
            image: '/images/merch/Green mug.png',
            description: 'Nature-inspired green mug that brings tranquil forest vibes to your writing space. Dishwasher safe with a smooth matte finish and generous 12oz capacity.'
        },
        {
            name: 'Classic White Hoodie - Men\'s',
            tags: ['hoodies'],
            price: 52.99,
            image: '/images/merch/White Hoodie mens.png',
            description: 'Premium cotton-blend hoodie in clean white. Features the Cove logo with minimalist design. Perfect for writers who prefer understated style and maximum comfort.'
        },
        {
            name: 'Women\'s White Hoodie',
            tags: ['hoodies'],
            price: 49.99,
            image: '/images/merch/Hoodie White Womens.png',
            description: 'Soft, fitted hoodie designed specifically for women writers. Flattering cut with cozy fleece lining and thoughtful details like thumb holes for extra warmth.'
        },
        {
            name: 'Classic Tote Bag',
            tags: ['totes'],
            price: 18.99,
            image: '/images/merch/Tote.png',
            description: 'Versatile canvas tote bag perfect for carrying your writing essentials. Spacious main compartment, sturdy handles, and subtle Cove branding. Ideal for library trips and coffee shop sessions.'
        },
        {
            name: 'Brown Canvas Tote',
            tags: ['totes'],
            price: 22.99,
            image: '/images/merch/Tote Brown.png',
            description: 'Rich brown canvas tote with vintage appeal. Heavy-duty construction with reinforced stitching. Perfect for the writer who appreciates classic, timeless style.'
        },
        {
            name: 'Forest Green Tote',
            tags: ['totes'],
            price: 20.99,
            image: '/images/merch/Tote Green.png',
            description: 'Eco-friendly green tote made from sustainable materials. Large enough for laptops, notebooks, and all your writing gear. Features comfortable shoulder straps and interior pocket.'
        },
        {
            name: 'Classic Round Sticker - White',
            tags: ['stickers'],
            price: 3.99,
            image: '/images/merch/Round sticker white.png',
            description: 'Clean white circular sticker with the iconic Cove logo. Premium vinyl construction that\'s waterproof and fade-resistant. Perfect for laptops, water bottles, or notebooks.'
        },
        {
            name: 'Earthy Brown Sticker',
            tags: ['stickers'],
            price: 3.99,
            image: '/images/merch/Round sticker brown.png',
            description: 'Warm brown circular sticker that matches our earthy aesthetic. High-quality vinyl with strong adhesive. Adds a touch of natural warmth to any surface.'
        },
        {
            name: 'Forest Green Sticker',
            tags: ['stickers'],
            price: 3.99,
            image: '/images/merch/Round sticker green.png',
            description: 'Nature-inspired green sticker featuring the Cove logo. Durable outdoor vinyl that withstands weather and washing. Perfect for showing your writing community pride.'
        }
    ];

    // Filter items based on selected tag
    const filteredItems = selectedTag === 'all'
        ? catalogueItems
        : catalogueItems.filter(item => item.tags.includes(selectedTag));

    const availableTags = ['all', 'mugs', 'hoodies', 'totes', 'stickers'];

    const getTagColor = (tag) => {
        switch (tag) {
            case 'mugs':
                return 'var(--candle-light)';
            case 'hoodies':
                return 'var(--olive)';
            case 'totes':
                return 'var(--fog)';
            case 'stickers':
                return 'var(--hazelwood)';
            default:
                return 'var(--cafe)';
        }
    };

    return (
        <div className='w-full relative card-section bg-[#d1d6d7]'>
            <div className='p-8'>
                <h2 className='text-4xl font-bold text-center mb-12' style={{color: 'var(--background)'}}>
                    Cove Store
                </h2>

                {/* Filter Dropdown */}
                <div className='max-w-6xl mx-auto mb-6'>
                    <div className='flex items-center gap-4 justify-center'>
                        <label htmlFor="tag-filter" className='text-lg font-medium' style={{color: 'var(--background)'}}>
                            Filter by category:
                        </label>
                        <select
                            id="tag-filter"
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                            className='px-4 py-2 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/50'
                            style={{color: 'var(--background)'}}
                        >
                            {availableTags.map(tag => (
                                <option key={tag} value={tag} className='bg-white text-black'>
                                    {tag === 'all' ? 'All Items' : tag.charAt(0).toUpperCase() + tag.slice(1)}
                                </option>
                            ))}
                        </select>
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
                    {filteredItems.map((item, index) => (
                        <div key={index} className='bg-white/20 backdrop-blur-sm rounded-lg shadow-lg border border-white/30'>
                            <div className='flex items-center justify-between p-4'>
                                <div

                                    className='flex-1 flex items-center gap-4 text-left hover:bg-white/10 transition-all duration-200 rounded-lg p-2'
                                >
                                    {/* Item Image */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className='w-20 h-20 object-contain rounded-lg mr-4 border border-white/30 bg-white/60'
                                    />
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-3 mb-1'>
                                            <h3 className='text-lg font-semibold' style={{color: 'var(--background)'}}>
                                                {item.name}
                                            </h3>
                                            <div className='flex gap-1'>
                                                {item.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className='px-2 py-1 text-xs rounded-full text-white font-medium'
                                                        style={{backgroundColor: getTagColor(tag)}}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className='text-xl font-bold' style={{color: 'var(--background)'}}>
                                            ${item.price}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-3'>
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className='px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2'
                                        style={{backgroundColor: 'var(--cafe)'}}
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
