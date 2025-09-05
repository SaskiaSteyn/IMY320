//a component that uses a grid to layout the cards in a 1-2-1 layout with images and text
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const AboutCove = () => {
    return (
        <div
            className='relative w-full'
            style={{
                backgroundColor: '#19191a',
            }}
        >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-8 h-full min-h-[80vh]'>
                    {/* First Column - Spans 2 rows */}
                    <Card
                        className='lg:row-span-2'
                        backgroundImage='/images/new/Image-1.png'
                        title='What is Cove?'
                        text='Cove is a platform for Writers, by Writers. Our application Write in Peace is created to help you write with zero distractions! We also offer a community where you can chat to other writers, get daily prompts, weekly challenges, and writing guides.'
                    />

                    {/* Second Column - Row 1 */}
                    <Card
                        title='Write in Peace'
                        backgroundImage='/images/new/writing.png'
                        text='Write in Peace is a focused writing app designed to silence all the noise and help you get into flow. With one tap you can block notifications, set structured writing sessions, and create a calm environment where your ideas can bloom.'
                    />

                    {/* Third Column - Spans 2 rows */}
                    <Card
                        className='lg:row-span-2'
                        backgroundImage='/images/new/image-2.png'
                        title='Get it today!'
                        text='Download the app and start writing with no distrations!'
                    />

                    {/* Second Column - Row 2 */}
                    <Card
                        title='Calm your mind, write without interruption.'
                        backgroundImage='/images/new/soundwaves.png'
                        text='Create the calmest, coziest space for your crafting needs. Beautiful themes, ambient sounds, and smart scheduling help you find the perfect writing atmosphere.'
                    />
                </div>
            </div>
            <div className='flex justify-center pb-12'>
                <Button>Download the app</Button>
            </div>
        </div>
    );
};

export default AboutCove;
