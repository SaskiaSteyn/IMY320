import React, { useRef, useState } from 'react';
import { PricingCard } from '../cards';
import FooterCard from '../cards/footer.jsx';
import Products from '../components/bentos/products.jsx';
import SoftwareBento from '../components/bentos/software-bento.jsx';
import Header from '../components/header.jsx';
import TestimonialBlock from '../components/testimonial-block.jsx';
import HeroImagePP from '../components/ui/hero-image-product-page.jsx';
import { testimonials } from '../data/testimonials.js';

function WriteInPeace() {
    const loaded = useRef(false);
    const [calledOnce, setCalledOnce] = useState(false);

    const CallScroll = () => {
        if (!loaded.current && !calledOnce) {
            loaded.current = true;
            setCalledOnce(true);
        }
    };

    React.useEffect(() => {
        if (!loaded.current && !calledOnce) {
            loaded.current = true;
            setCalledOnce(true);
            const lastId = localStorage.getItem('lastViewedItemId');
            if (lastId) {
                const el = document.getElementById(`catalog-item-${lastId}`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                localStorage.removeItem('lastViewedItemId');
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                console.log('Weeee');
            }
        }
    }, [calledOnce]);

    // Handle URL hash for direct linking to pricing section
    React.useEffect(() => {
        if (window.location.hash === '#pricing') {
            setTimeout(() => {
                const pricingElement = document.getElementById('pricing');
                if (pricingElement) {
                    pricingElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // Small delay to ensure page is loaded
        }
    }, []);
    return (
        <div className='relative bg-[#19191a]'>
            <Header />
            <HeroImagePP />
            <SoftwareBento />
            {/* Testimonials Section - Normal Component */}
            <div className='py-16 bg-[#19191a]'>
                <div className='text-center mb-12'>
                    <h2
                        className='text-4xl font-bold mb-4'
                        style={{ color: 'white' }}
                    >
                        What Writers Say
                    </h2>
                    <p className='text-lg' style={{ color: 'white' }}>
                        Real experiences from our writing community
                    </p>
                </div>

                {/* Testimonials Grid Layout */}
                <div className='flex flex-col gap-16 mx-auto max-w-7xl px-8'>
                    {/* Top row */}
                    <div className='flex gap-6 flex-1'>
                        <TestimonialBlock testimonial={testimonials[0]} />
                        <TestimonialBlock testimonial={testimonials[1]} />
                        <TestimonialBlock testimonial={testimonials[2]} />
                    </div>

                    {/* Bottom row */}
                    <div className='flex gap-6 flex-1'>
                        <TestimonialBlock testimonial={testimonials[3]} />
                        <TestimonialBlock testimonial={testimonials[4]} />
                        <TestimonialBlock testimonial={testimonials[5]} />
                    </div>
                </div>
            </div>

            <PricingCard />
            <Products />
            <FooterCard />
        </div>
    );
}

export default WriteInPeace;
