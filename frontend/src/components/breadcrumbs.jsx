import { Link } from 'react-router-dom';

const Breadcrumbs = ({ product, category, showShop = true }) => {
    const getCategoryTitle = (categoryName) => {
        const categoryMap = {
            mugs: 'Mugs',
            hoodies: 'Hoodies',
            totes: 'Tote Bags',
            stickers: 'Stickers',
        };
        return categoryMap[categoryName] || categoryName;
    };

    return (
        <nav className='mb-6' aria-label='Breadcrumb'>
            <ol className='flex items-center space-x-2 text-sm text-gray-300'>
                <li>
                    <Link
                        to='/'
                        className='hover:underline hover:text-[#E79210] hover:font-bold font-medium transition-colors'
                    >
                        Home
                    </Link>
                </li>
                {showShop && (
                    <>
                        <li className='text-gray-500'>/</li>
                        <li>
                            <Link
                                to='/products'
                                className='hover:underline hover:text-[#E79210] hover:font-bold font-medium transition-colors'
                            >
                                Shop
                            </Link>
                        </li>
                    </>
                )}
                {category && (
                    <>
                        <li className='text-gray-500'>/</li>
                        <li
                            className='font-bold text-white'
                            aria-current='page'
                        >
                            {getCategoryTitle(category)}
                        </li>
                    </>
                )}
                {product && (
                    <>
                        <li className='text-gray-500'>/</li>
                        <li
                            className='font-bold text-white'
                            aria-current='page'
                        >
                            {product.name}
                        </li>
                    </>
                )}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
