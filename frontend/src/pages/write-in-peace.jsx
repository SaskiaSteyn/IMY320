import { PricingCard, StaticWriteInPeaceCard } from '../cards';
import FooterCard from '../cards/footer.jsx';
import Catalogue from '../components/catalogue.jsx';
import Header from '../components/header.jsx';
import TestimonialBlock from '../components/testimonial-block.jsx';
import { testimonials } from '../data/testimonials.js';

function WriteInPeace() {
    return (
        <div className='relative bg-[var(--text)]'>
            <Header />
            <StaticWriteInPeaceCard />

            {/* Testimonials Section - Normal Component */}
            <div className='py-16 bg-[var(--text)]'>
                <div className='text-center mb-12'>
                    <h2
                        className='text-4xl font-bold mb-4'
                        style={{ color: 'var(--background)' }}
                    >
                        What Writers Say
                    </h2>
                    <p
                        className='text-lg'
                        style={{ color: 'var(--background)' }}
                    >
                        Real experiences from our writing community
                    </p>
                </div>

                {/* Testimonials Grid Layout */}
                <div className='flex flex-col gap-8 mx-auto max-w-7xl px-8'>
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

            <Catalogue />
            <FooterCard />
        </div>
    );
}

export default WriteInPeace;
