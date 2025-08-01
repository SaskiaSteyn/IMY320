const PricingBlock = ({
    tierName,
    price,
    features,
    headerColor = '#9ca3af', // Default gray color
    className = '',
}) => {
    return (
        <div
            className={`rounded-lg overflow-hidden shadow-lg w-full h-full flex flex-col ${className}`}
        >
            {/* Header section with tier name and price */}
            <div
                className='text-center py-6 px-8'
                style={{ backgroundColor: headerColor }}
            >
                <h3 className='text-2xl font-bold text-black mb-3'>
                    {tierName}
                </h3>
                <div className='text-5xl font-bold text-black mb-1'>
                    R{price}
                </div>
                <p className='text-lg text-black'>per month</p>
            </div>

            {/* Features section */}
            <div className='bg-gray-200 px-8 py-6 flex-1 flex flex-col'>
                <ul className='space-y-3 flex-1'>
                    {features.map((feature, index) => (
                        <li key={index} className='flex items-start'>
                            <svg
                                className='w-5 h-5 text-[#7D7F49] mr-3 mt-0.5 flex-shrink-0'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                    clipRule='evenodd'
                                />
                            </svg>
                            <span className='text-gray-800 font-medium'>
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PricingBlock;
