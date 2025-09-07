import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FooterCard from '../cards/footer.jsx';
import Breadcrumbs from '../components/breadcrumbs.jsx';
import Header from '../components/header.jsx';
import { Button } from '../components/ui/button.jsx';
import catalogue from '../data/catalogue.json';

const Category = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Filter products by category
        const filteredProducts = catalogue.filter((product) =>
            product.tags.includes(categoryName)
        );
        setProducts(filteredProducts);
        setLoading(false);
    }, [categoryName]);

    const getCategoryTitle = (category) => {
        const categoryMap = {
            mugs: 'Mugs',
            hoodies: 'Hoodies',
            totes: 'Tote Bags',
            stickers: 'Stickers',
        };
        return categoryMap[category] || category;
    };

    const getCategoryDescription = (category) => {
        const descriptions = {
            mugs: 'Fuel your creativity with our collection of premium ceramic mugs, perfect for those long writing sessions.',
            hoodies:
                'Stay cozy and comfortable while you write with our premium cotton-blend hoodies.',
            totes: 'Carry your writing essentials in style with our durable and spacious tote bags.',
            stickers:
                'Show your writing community pride with our premium vinyl stickers.',
        };
        return (
            descriptions[category] ||
            'Discover our collection of writing-inspired merchandise.'
        );
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
                    <Breadcrumbs category={categoryName} />
                    <div className='text-center'>
                        <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
                            {getCategoryTitle(categoryName)}
                        </h1>
                        <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
                            {getCategoryDescription(categoryName)}
                        </p>
                        <div className='w-24 h-1 bg-yellow-500 mx-auto'></div>
                    </div>
                </div>
            </div>

            {/* Products List */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
                {products.length === 0 ? (
                    <div className='text-center py-16'>
                        <div className='text-gray-400 text-xl mb-4'>
                            No products found in this category.
                        </div>
                        <Link to='/'>
                            <Button>Back to Home</Button>
                        </Link>
                    </div>
                ) : (
                    <div className='space-y-6'>
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className='bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group'
                            >
                                <div className='flex flex-col md:flex-row'>
                                    {/* Product Image */}
                                    <div className='md:w-1/3 lg:w-1/4 h-64 md:h-auto overflow-hidden'>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                                            onError={(e) => {
                                                e.target.src = `/images/new/merch/cove-${categoryName.slice(
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
                                                        <span
                                                            key={index}
                                                            className='px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full'
                                                        >
                                                            {tag}
                                                        </span>
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
                                                <Link
                                                    to={`/product/${product.id}`}
                                                >
                                                    <Button className='transform transition-all duration-300 hover:scale-110'>
                                                        View Details
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant='outline'
                                                    className='transform transition-all duration-300 hover:scale-110 hover:bg-yellow-500 hover:text-white hover:border-yellow-500'
                                                >
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Back to All Products */}
                <div className='text-center mt-16'>
                    <Link to='/'>
                        <Button variant='outline' className='mr-4'>
                            Back to Home
                        </Button>
                    </Link>
                    <Link to='/products'>
                        <Button>View All Products</Button>
                    </Link>
                </div>
            </div>

            <FooterCard />
        </div>
    );
};

export default Category;
