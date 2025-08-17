import { Link } from 'react-router-dom';

const StaticBlock = ({
    size,
    frontHeader,
    backHeader,
    content,
    button,
    buttons,
    image,
    color,
    textColor = 'white',
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
        <div className={`bento-block ${flexSize} h-full`}>
            {/* If image is provided, render image block with header */}
            {image ? (
                <div className='w-full h-full rounded-lg overflow-hidden relative'>
                    <img
                        src={image}
                        alt={frontHeader}
                        className='w-full h-full object-cover'
                    />
                    {/* Gradient Overlay - Bottom to halfway up */}
                    {/* <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent'></div> */}
                    {/* Header on top of gradient */}
                    <div className='absolute bottom-4 left-4 right-4 z-10'>
                        <h2 className='text-white font-bold text-xl drop-shadow-lg'>
                            {frontHeader}
                        </h2>
                    </div>
                </div>
            ) : (
                // Otherwise, render text block with header and content
                <div
                    className='w-full h-full rounded-lg p-6 flex flex-col justify-center items-center'
                    style={{ backgroundColor: color }}
                >
                    <div>
                        <h3
                            className='font-bold mb-4'
                            style={{ color: textColor }}
                        >
                            {backHeader || frontHeader}
                        </h3>
                        <div className='text-sm leading-relaxed space-y-3'>
                            {Array.isArray(content) ? (
                                content.map((paragraph, index) => (
                                    <p key={index} style={{ color: textColor }}>
                                        {paragraph}
                                    </p>
                                ))
                            ) : (
                                <p style={{ color: textColor }}>{content}</p>
                            )}
                        </div>
                    </div>

                    {(button || buttons) && (
                        <div className='flex gap-3 mt-8 self-start'>
                            {buttons ? (
                                buttons.map((btn, index) => (
                                    <Link
                                        key={index}
                                        to={btn.href || '#'}
                                        className='bento-cta-button inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-semibold text-sm hover:bg-white/30 transition-colors duration-200'
                                        style={{ color: textColor }}
                                    >
                                        {btn.text || 'Learn More'}
                                    </Link>
                                ))
                            ) : (
                                <Link
                                    to={button.href || '#'}
                                    className='bento-cta-button inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-semibold text-sm hover:bg-white/30 transition-colors duration-200'
                                    style={{ color: textColor }}
                                >
                                    {button.text || 'Learn More'}
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default StaticBlock;
