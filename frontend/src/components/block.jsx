const Block = ({
    size,
    frontHeader,
    backHeader,
    content,
    button,
    image,
    color,
}) => {
    // Tailwind size classes mapping
    const sizeClasses = {
        1: 'flex-1',
        2: 'flex-[2]',
        3: 'flex-[3]',
        4: 'flex-[4]',
        small: 'flex-1',
        medium: 'flex-[2]',
        large: 'flex-[3]',
        xlarge: 'flex-[4]',
    };

    const flexSize = sizeClasses[size] || 'flex-1';

    return (
        <div className={`bento-block ${flexSize} h-full perspective-1000`}>
            <div className='bento-flip-card w-full h-full relative'>
                {/* Front Face - Image with Header */}
                <div className='bento-front absolute w-full h-full rounded-lg overflow-hidden'>
                    <img
                        src={image}
                        alt={frontHeader}
                        className='w-full h-full object-cover'
                    />
                    {/* Gradient Overlay - Bottom to halfway up */}
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent'></div>
                    {/* Header on top of gradient */}
                    <div className='absolute bottom-4 left-4 right-4 z-10'>
                        <h3 className='text-white font-bold text-xl drop-shadow-lg'>
                            {frontHeader}
                        </h3>
                    </div>
                </div>

                {/* Back Face - Content */}
                <div
                    className='bento-back absolute w-full h-full rounded-lg p-6 flex flex-col justify-between'
                    style={{ backgroundColor: color }}
                >
                    <div>
                        <h3 className='text-white font-bold text-xl mb-4'>
                            {backHeader}
                        </h3>
                        <div className='text-white/90 text-sm leading-relaxed space-y-3'>
                            {Array.isArray(content) ? (
                                content.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))
                            ) : (
                                <p>{content}</p>
                            )}
                        </div>
                    </div>

                    {button && (
                        <a
                            href={button.href || '#'}
                            className='bento-cta-button inline-block mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white font-semibold text-sm hover:bg-white/30 transition-colors duration-200 self-start'
                        >
                            {button.text || 'Learn More'}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Block;
