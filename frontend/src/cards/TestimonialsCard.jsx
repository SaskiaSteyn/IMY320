import ChevronDown from '../components/chevron-down.jsx';
import Testimonial from '../components/testimonial.jsx';

const TestimonialsCard = ({
    currentTestimonial,
    testimonials,
    nextTestimonial,
    prevTestimonial,
    setCurrentTestimonial,
    zIndex,
}) => {
    return (
        <div
            className='h-screen w-full relative card-section bg-[#19191a]'
            style={{ zIndex }}
        >
            <div className='p-8 h-full flex items-center justify-center relative'>
                {/* Left Chevron */}
                <button
                    onClick={prevTestimonial}
                    className='absolute left-8 z-10 text-white hover:text-[var(--candle-light)] transition-colors duration-200 hover:scale-110 transform'
                >
                    <svg
                        width='48'
                        height='48'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <polyline points='15,18 9,12 15,6'></polyline>
                    </svg>
                </button>

                {/* Testimonial Content */}
                <div className='max-w-5xl mx-auto'>
                    <h2 className='text-4xl font-bold text-center mb-12 text-white'>
                        What Writers Say
                    </h2>

                    <Testimonial
                        picture={testimonials[currentTestimonial].picture}
                        text={testimonials[currentTestimonial].text}
                        username={testimonials[currentTestimonial].username}
                    />

                    {/* Testimonial indicators */}
                    <div className='flex justify-center mt-8 gap-2'>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTestimonial(index)}
                                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                    index === currentTestimonial
                                        ? 'bg-[var(--candle-light)]'
                                        : 'bg-gray-600 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Chevron */}
                <button
                    onClick={nextTestimonial}
                    className='absolute right-8 z-10 text-white hover:text-[var(--candle-light)] transition-colors duration-200 hover:scale-110 transform'
                >
                    <svg
                        width='48'
                        height='48'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <polyline points='9,18 15,12 9,6'></polyline>
                    </svg>
                </button>
            </div>

            {/* Scroll Down Chevron */}
            <ChevronDown />
        </div>
    );
};

export default TestimonialsCard;
