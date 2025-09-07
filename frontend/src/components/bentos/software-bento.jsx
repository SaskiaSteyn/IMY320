//a component that uses a grid to layout the cards in a 1-2-1 layout with images and text
import { Card } from '../ui/card';

const SoftwareBento = () => {
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
                        backgroundImage='/images/new/image-2.png'
                        title='1. Calm Environment'
                        text="Create the calmest, coziest space for your crafting needs. Beautiful themes, ambient sounds, and smart scheduling help you find the perfect writing atmosphere whether you're drafting novels, blogging, or tackling essays."
                    />

                    {/* Second Column - Row 1 */}
                    <Card
                        title='2. Block Distractions'
                        backgroundImage='/images/new/writing.png'
                        text='Silence all the noise with one tap. Block notifications and create a distraction-free environment where your ideas can bloom without interruption.'
                    />

                    {/* Third Column - Spans 2 rows */}
                    <Card
                        backgroundImage='/images/new/timers.png'
                        title='3. Smart Sessions'
                        text='Set custom session timers that adapt to your writing rhythm. Perfect for short bursts or long creative sprints, keeping you in complete control.'
                    />

                    {/* Second Column - Row 2 */}
                    <Card
                        title='4. Set Goal.'
                        backgroundImage='/images/new/goals.png'
                        text="Set flexible writing goals and word count targets that adapt to your routine and preferences. Write in Peace removes friction so all that's left is you and your words."
                    />
                    <Card
                        title='5. Track Progress'
                        backgroundImage='/images/new/streaks.png'
                        text='Track your daily streaks and get insights into your productivity over time. Monitor your writing habits and celebrate your achievements as you build consistent writing routines.'
                    />
                </div>
            </div>
        </div>
    );
};

export default SoftwareBento;
