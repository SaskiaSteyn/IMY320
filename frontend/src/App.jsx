import { useEffect, useState } from 'react';
import { CallToActionCard, StaticHeroCard, WriteInPeaceCard } from './cards';
import FooterCard from './cards/footer.jsx';
import Header from './components/header.jsx';
import './global.css';

function App() {
    const [showChevron, setShowChevron] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChevron(true);
        }, 0); // Show after 10 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='relative'>
            <Header />
            <StaticHeroCard showChevron={showChevron} zIndex={1} />
            <WriteInPeaceCard zIndex={2} />

            {/* <TestimonialsCard
                currentTestimonial={currentTestimonial}
                testimonials={testimonials}
                nextTestimonial={nextTestimonial}
                prevTestimonial={prevTestimonial}
                setCurrentTestimonial={setCurrentTestimonial}
                zIndex={4}
            /> */}
            <CallToActionCard zIndex={5} />
            <FooterCard zIndex={6} />
        </div>
    );
}

export default App;
