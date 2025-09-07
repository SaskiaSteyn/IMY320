import { Link } from 'react-router-dom';

const Breadcrumbs = ({ product, category }) => {
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
                        className='hover:underline font-medium hover:text-white transition-colors'
                    >
                        Home
                    </Link>
                </li>
                <li className='text-gray-500'>/</li>
                <li>
                    <Link
                        to='/#products'
                        className='hover:underline font-medium hover:text-white transition-colors'
                    >
                        Shop
                    </Link>
                </li>
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
                {product && category && (
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
                {product && !category && (
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
