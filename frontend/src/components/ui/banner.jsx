import {useCallback, useEffect, useRef, useState} from 'react';
import LaptopSpin from './laptop-spin';
import './banner.css';

const Banner = ({
    height = '60vh',
    className = '',
    children,
    backgroundImage = '/images/new/Background.png',
}) => {
    const [scrollY, setScrollY] = useState(0);
    const bannerRef = useRef(null);
    const [bannerTop, setBannerTop] = useState(0);
    const rafRef = useRef();

    useEffect(() => {
        // Get banner position once on mount and resize
        const updateBannerPosition = () => {
            if (bannerRef.current) {
                const rect = bannerRef.current.getBoundingClientRect();
                setBannerTop(rect.top + window.scrollY);
            }
        };

        updateBannerPosition();
        window.addEventListener('resize', updateBannerPosition);

        return () => {
            window.removeEventListener('resize', updateBannerPosition);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    const handleScroll = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
            setScrollY(window.scrollY);
        });
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [handleScroll]);

    // Calculate relative scroll position to the banner
    const relativeScroll = scrollY - bannerTop;
    const isInView =
        bannerRef.current &&
        scrollY + window.innerHeight > bannerTop &&
        scrollY < bannerTop + bannerRef.current.offsetHeight;

    // Calculate parallax offsets - background stays static, only lines and foreground move
    const foregroundOffset = isInView ? relativeScroll * 0.02 : 0;

    // Array of line data - each line will move at different parallax speeds
    const typingLines = [
        {
            src: '/images/new/lines/typing-1.svg',
            speed: 0.08, // Much more noticeable speeds
            zIndex: 21,
        },
        {
            src: '/images/new/lines/typing-2.svg',
            speed: 0.12,
            zIndex: 22,
        },
        {
            src: '/images/new/lines/typing-3.svg',
            speed: 0.16,
            zIndex: 23,
        },
        {
            src: '/images/new/lines/typing-4.svg',
            speed: 0.2,
            zIndex: 24,
        },
        {
            src: '/images/new/lines/typing-5.svg',
            speed: 0.24,
            zIndex: 25,
        },
        {
            src: '/images/new/lines/typing-6.svg',
            speed: 0.28,
            zIndex: 26,
        },
        {
            src: '/images/new/lines/typing-7.svg',
            speed: 0.32,
            zIndex: 27,
        },
        {
            src: '/images/new/lines/typing-8.svg',
            speed: 0.36, // Fastest
            zIndex: 28,
        },
    ];

    // Debug mode - set to true to see what's happening
    const debug = false;

    return (
        <div
            ref={bannerRef}
            className={`banner-container ${className}`}
            style={{height}}
        >
            {/* Debug info */}
            {debug && (
                <div
                    style={{
                        position: 'fixed',
                        top: '10px',
                        left: '10px',
                        background: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        padding: '10px',
                        zIndex: 1000,
                        fontSize: '12px',
                    }}
                >
                    <div>ScrollY: {scrollY}</div>
                    <div>BannerTop: {bannerTop}</div>
                    <div>RelativeScroll: {relativeScroll}</div>
                    <div>IsInView: {isInView ? 'Yes' : 'No'}</div>
                    <div>Background: Static (no movement)</div>
                    <div>
                        Line 1 Offset:{' '}
                        {isInView ? (relativeScroll * 0.08).toFixed(2) : 0}
                    </div>
                    <div>
                        Line 8 Offset:{' '}
                        {isInView ? (relativeScroll * 0.36).toFixed(2) : 0}
                    </div>
                </div>
            )}
            {/* Background layer - static, no parallax movement */}
            <div
                className='banner-layer banner-layer-background'
                style={{
                    transform: 'translate3d(0, 0, 0)',
                }}
            >
                <img
                    src={backgroundImage}
                    alt='Background scene'
                    className='w-full h-full object-cover'
                />
            </div>

            {/* Individual typing line layers - each with different parallax speed */}
            {typingLines.map((line, index) => {
                const lineOffset = isInView ? relativeScroll * line.speed : 0;
                return (
                    <div
                        key={index}
                        className={`banner-layer banner-layer-typing-line typing-line-${index + 1
                            }`}
                        style={{
                            transform: `translate3d(0, ${lineOffset}px, 0)`,
                            zIndex: line.zIndex,
                        }}
                    >
                        <img
                            src={line.src}
                            alt={`Typing line ${index + 1}`}
                            className='w-full h-full object-contain typing-line-svg'
                            onLoad={() =>
                                console.log(
                                    `Typing line ${index + 1} loaded: ${line.src
                                    }`
                                )
                            }
                            onError={(e) =>
                                console.error(
                                    `Failed to load typing line ${index + 1}: ${line.src
                                    }`,
                                    e
                                )
                            }
                        />
                    </div>
                );
            })}

            {/* Foreground layer - interactive spinning laptop */}
            <div
                className='banner-layer banner-layer-foreground'
                style={{
                    transform: `translate3d(0, ${foregroundOffset}px, 0)`,
                    backgroundColor: 'transparent', // Ensure transparent background
                }}
            >
                <div className='absolute inset-0' style={{backgroundColor: 'transparent'}}>
                    <LaptopSpin className="w-full h-full" />
                </div>
            </div>

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
