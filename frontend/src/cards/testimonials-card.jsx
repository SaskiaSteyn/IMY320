import ChevronDown from '../components/chevron-down.jsx';
import TestimonialBlock from '../components/testimonial-block.jsx';

const TestimonialsCard = ({ testimonials, zIndex }) => {
    return (
        <div
            className='h-screen w-full relative card-section bg-[#19191a]'
            style={{ zIndex }}
        >
            <div className='h-full flex flex-col justify-center mb-12'>
                {/* Header */}
                {/* <div className='text-center'>
                    <h2 className='text-3xl font-bold text-white'>
                        What Writers Say
                    </h2>
                </div> */}

                {/* Testimonials Flexbox Layout */}
                <div className='flex flex-col gap-8 mx-auto max-w-7xl h-3.5/5'>
                    {/* Top row */}
                    <div className='flex gap-6 flex-1 mt-8'>
                        <TestimonialBlock testimonial={testimonials[0]} />
                        <TestimonialBlock testimonial={testimonials[1]} />
                        <TestimonialBlock testimonial={testimonials[2]} />
                    </div>
                    <div className='h-1'></div>

                    {/* Bottom row */}
                    <div className='flex gap-6 flex-1'>
                        <TestimonialBlock testimonial={testimonials[3]} />
                        <TestimonialBlock testimonial={testimonials[4]} />
                        <TestimonialBlock testimonial={testimonials[5]} />
                    </div>
                </div>
            </div>

            {/* Scroll Down Chevron */}
            <ChevronDown
                backgroundColor='var(--background)'
                textColor='var(--text)'
            />
        </div>
    );
};

export default TestimonialsCard;
