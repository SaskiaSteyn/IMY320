import Testimonial from '../components/testimonial';

const TestimonialExample = () => {
    // Example testimonial data
    const testimonialData = {
        picture: '/images/testimonal-stock.jpeg', // Using the image from your public folder
        text: 'Write in Peace has completely changed how I work. I used to get derailed by every notification and pop-up, but now I can sit down and actually finish what I start.',
        username: 'Jordan M., Freelance Writer',
    };

    return (
        <div className='min-h-screen bg-gray-900 flex items-center justify-center p-8'>
            <Testimonial
                picture={testimonialData.picture}
                text={testimonialData.text}
                username={testimonialData.username}
                className='max-w-5xl'
            />
        </div>
    );
};

export default TestimonialExample;
