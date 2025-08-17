import React, {useState} from 'react';
import {testimonials} from '../data/testimonials.js';
import {PricingCard, TestimonialsCard} from '../cards';
import Header from '../components/header.jsx';

function WriteInPeace() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    };

    return (
        <div className='relative'>
            <Header />
            <TestimonialsCard
                currentTestimonial={currentTestimonial}
                testimonials={testimonials}
                nextTestimonial={nextTestimonial}
                prevTestimonial={prevTestimonial}
                setCurrentTestimonial={setCurrentTestimonial}
                zIndex={1}
            />
            <PricingCard zIndex={2} />
        </div>
    );
}

export default WriteInPeace;
