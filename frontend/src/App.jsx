import { useEffect, useState } from 'react';
import {
    CallToActionCard,
    HeroCard,
    PricingCard,
    TestimonialsCard,
    WriteInPeaceCard,
} from './cards';
import Header from './components/header.jsx';
import { testimonials } from './data/testimonials.js';
import './global.css';

function App() {
    const [showChevron, setShowChevron] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChevron(true);
        }, 5000); // Show after 10 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='relative'>
            <Header />
            <HeroCard showChevron={showChevron} zIndex={1} />
            <WriteInPeaceCard zIndex={2} />
            <PricingCard zIndex={3} />
            <TestimonialsCard
                currentTestimonial={currentTestimonial}
                testimonials={testimonials}
                nextTestimonial={nextTestimonial}
                prevTestimonial={prevTestimonial}
                setCurrentTestimonial={setCurrentTestimonial}
                zIndex={4}
            />
            <CallToActionCard zIndex={5} />
        </div>
    );
}

export default App;
