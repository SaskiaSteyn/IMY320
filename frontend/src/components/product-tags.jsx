const ProductTags = ({ tags, stock, activeTag }) => {
    return (
        <div className='flex flex-wrap gap-2 mb-4'>
            {/* Product category tags */}
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                        tag === activeTag
                            ? 'bg-[#e79210] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {tag}
                </span>
            ))}

            {/* Stock status tag */}
            <span
                className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                    stock === 0
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                }`}
            >
                {stock === 0 ? 'Out of Stock' : 'In Stock'}
            </span>
        </div>
    );
};

export default ProductTags;
