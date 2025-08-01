import Block from './components/block.jsx';
import './global.css';

function App() {
    return (
        <div className='min-h-screen h-screen overflow-hidden'>
            {/* Main Bento Grid Layout */}
            <div className='flex gap-4 p-8 h-full'>
                {/* Left Column - Large Hero Block */}
                <div className='flex-[1]'>
                    <Block
                        size='xlarge'
                        frontHeader='Cove.'
                        backHeader='Your writing sanctuary.'
                        content={[
                            "Write in Peace is a focused writing app designed to silence all the noise and help you get into flow. With one tap you can block notifications, set structured writing sessions, and create a calm environment where your ideas can bloom. Whether you're drafting a novel, blogging, or tackling essays, this app helps you create the calmest, cozy space for your crafting needs.",
                            "Set custom session timers, track your daily streaks, and get insights into your productivity over time. With flexible features like theme switching, writing goals, and smart scheduling, Write in Peace adapts to your routine and preferences. Whether you write in short bursts or long creative sprints, Write in Peace keeps you in control. The app gives you the mental space, and practical support, that you need to write without interruption. It's a simple, elegant space designed to remove friction—so all that's left is you and your words.",
                        ]}
                        button={{
                            text: 'Start Writing in Peace',
                            href: '/start',
                        }}
                        image='https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop'
                        color='var(--olive)'
                    />
                </div>

                {/* Right Column */}
                <div className='flex-[2] flex flex-col gap-4 h-full'>
                    {/* Top Row - Two blocks side by side */}
                    <div className='flex gap-4 flex-[1]'>
                        <div className='flex-1'>
                            <Block
                                size='large'
                                frontHeader='About Us'
                                backHeader='Our Mission'
                                content='We believe every writer deserves a peaceful space to create. Our team is dedicated to building tools that help you focus on what matters most - your words and ideas.'
                                button={{
                                    text: 'Learn Our Story',
                                    href: '/about',
                                }}
                                image='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop'
                                color='var(--candle-light)'
                            />
                        </div>
                        <div className='flex-1'>
                            <Block
                                size='large'
                                frontHeader='Features'
                                backHeader='Built for Writers'
                                content='Discover powerful features designed to enhance your writing experience. From distraction-free modes to progress tracking, every tool is crafted with writers in mind.'
                                button={{
                                    text: 'Explore Features',
                                    href: '/features',
                                }}
                                image='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=400&fit=crop'
                                color='var(--fog)'
                            />
                        </div>
                    </div>
                    {/* Bottom Row - One left, two stacked right */}
                    <div className='flex gap-4 flex-[2]'>
                        {/* Left Block */}
                        <div className='flex-1'>
                            <Block
                                size='medium'
                                frontHeader='Writing Guides'
                                backHeader='Master Your Craft'
                                content='Comprehensive guides to help you improve your writing skills. From character development to plot structure, discover techniques used by professional writers.'
                                button={{ text: 'Learn More', href: '/guides' }}
                                image='https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=400&fit=crop'
                                color='var(--cafe)'
                            />
                        </div>

                        {/* Right Column - Two stacked blocks */}
                        <div className='flex-1 flex flex-col gap-4'>
                            <div className='flex-1'>
                                <Block
                                    size='medium'
                                    frontHeader='Community Stories'
                                    backHeader='Share & Discover'
                                    content='Connect with fellow writers and share your stories. Get feedback, find inspiration, and be part of a supportive writing community.'
                                    button={{
                                        text: 'Join Community',
                                        href: '/community',
                                    }}
                                    image='https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=400&fit=crop'
                                    color='var(--hazelwood)'
                                />
                            </div>
                            <div className='flex-1'>
                                <Block
                                    size='small'
                                    frontHeader='Daily Prompts'
                                    backHeader='Spark Your Creativity'
                                    content='Get fresh writing prompts delivered daily to inspire your next story, poem, or creative piece.'
                                    button={{
                                        text: 'Get Prompts',
                                        href: '/prompts',
                                    }}
                                    image='https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=400&fit=crop'
                                    color='var(--forest)'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
