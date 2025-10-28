import { Link } from 'react-router-dom';

const RelevantProducts = ({ currentProduct, allProducts }) => {
    if (!currentProduct || !allProducts) return null;
    // Find products with at least one matching tag, but not the current product
    const relevant = allProducts
        .filter(
            (item) =>
                item.id !== currentProduct.id &&
                item.tags.some((tag) => currentProduct.tags.includes(tag))
        )
        .slice(0, 3);

    if (relevant.length === 0) return null;

    return (
        <div className='mt-16'>
            <h3 className='text-2xl font-bold mb-6 '>You may also like</h3>
            <div className='flex flex-wrap gap-6'>
                {relevant.map((item) => (
                    <Link
                        to={`/product/${item.id}`}
                        key={item.id}
                        className='flex flex-col items-center bg-white rounded-lg shadow-lg border border-white/30 p-4 w-64 hover:scale-105 transition-transform duration-200'
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className='w-32 h-32 object-contain rounded mb-3 border bg-black'
                        />
                        <div className='text-lg font-semibold mb-1 text-center text-black'>
                            {item.name}
                        </div>
                        <div className='text-md font-bold mb-2 text-center text-black'>
                            R{item.price ? item.price.toFixed(2) : ''}
                        </div>
                        <div className='flex gap-1 flex-wrap justify-center'>
                            {item.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className='px-2 py-1 text-xs font-medium rounded bg-gray-100 text-black'
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelevantProducts;
