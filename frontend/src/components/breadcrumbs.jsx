import { Link } from 'react-router-dom';

const Breadcrumbs = ({ product }) => {
    return (
        <nav className='mb-6' aria-label='Breadcrumb'>
            <ol className='flex items-center space-x-2 text-sm text-[var(--background)]'>
                <li>
                    <Link to='/' className='hover:underline font-medium'>
                        Home
                    </Link>
                </li>
                <li>/</li>
                <li>
                    <Link
                        to='/write-in-peace#shop'
                        className='hover:underline font-medium'
                    >
                        Shop
                    </Link>
                </li>
                {product && (
                    <>
                        <li>/</li>
                        <li className='font-bold' aria-current='page'>
                            {product.name}
                        </li>
                    </>
                )}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
