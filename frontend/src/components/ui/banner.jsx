import { useEffect, useRef, useState } from 'react';
import './banner.css';

const Banner = ({
    height = '70vh',
    className = '',
    children,
    backgroundImage = '/images/Background-Cozy1.jpeg',
    middleImage = '/images/typewriter.jpeg',
    foregroundImage = null,
}) => {
    const [scrollY, setScrollY] = useState(0);
    const bannerRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);

            // Check if banner is in viewport for performance
            if (bannerRef.current) {
                const rect = bannerRef.current.getBoundingClientRect();
                setIsInView(rect.bottom > 0 && rect.top < window.innerHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate parallax offsets with very subtle speeds for 3D effect
    const middleOffset = isInView ? scrollY * 0.01 : 0;
    const foregroundOffset = isInView ? scrollY * 0.02 : 0;

    return (
        <div
            ref={bannerRef}
            className={`banner-container ${className}`}
            style={{ height }}
        >
            {/* Background layer - static (no parallax movement) */}
            <div className='banner-layer banner-layer-background'>
                <img
                    src={backgroundImage}
                    alt='Background scene'
                    className='w-full h-full object-cover'
                    onLoad={() =>
                        console.log('Background image loaded:', backgroundImage)
                    }
                    onError={(e) =>
                        console.error(
                            'Background image failed to load:',
                            backgroundImage,
                            e
                        )
                    }
                />
            </div>

            {/* Middle layer - medium parallax (main subject) */}
            <div
                className='banner-layer banner-layer-middle'
                style={{
                    transform: `translate3d(0, ${middleOffset}px, 0)`,
                }}
            >
                <div className='absolute inset-0'>
                    <img
                        src={middleImage}
                        alt='Featured typing device'
                        className='w-full h-full object-cover drop-shadow-2xl'
                        onLoad={() =>
                            console.log('Middle image loaded:', middleImage)
                        }
                        onError={(e) =>
                            console.error(
                                'Middle image failed to load:',
                                middleImage,
                                e
                            )
                        }
                    />
                </div>
            </div>

            {/* Foreground layer - fastest parallax (text overlay) */}
            {foregroundImage && (
                <div
                    className='banner-layer banner-layer-foreground'
                    style={{
                        transform: `translate3d(0, ${foregroundOffset}px, 0)`,
                    }}
                >
                    <div className='absolute inset-0'>
                        <img
                            src={foregroundImage}
                            alt='Computer overlay'
                            className='w-full h-full object-cover'
                            onLoad={() =>
                                console.log(
                                    'Foreground image loaded:',
                                    foregroundImage
                                )
                            }
                            onError={(e) =>
                                console.error(
                                    'Foreground image failed to load:',
                                    foregroundImage,
                                    e
                                )
                            }
                        />
                    </div>
                </div>
            )}

            {/* Content overlay - static, no parallax movement */}
            <div className='banner-content'>
                <div className='text-center text-white px-6 z-10 relative'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Banner;
