import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Block from './components/block.jsx';
import PricingBlock from './components/pricing.jsx';
import './global.css';

function App() {
    const [showChevron, setShowChevron] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChevron(true);
        }, 5000); // Show after 10 seconds

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className='min-h-screen relative'>
            {/* Main Bento Grid Layout */}
            <div className='flex gap-4 p-8 h-screen relative'>
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
                            href: '/write-in-peace',
                        }}
                        image='/images/AdobeStock_1575577074.jpeg'
                        textColor='black'
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
                                frontHeader='Prompts.'
                                backHeader='Prompt Generator'
                                content="Helps you choose random writing prompts to help you get started. Whether you're journaling, practicing creative writing, or just want a fun idea to explore, click the button and start writing. No pressure—just inspiration."
                                button={{
                                    text: 'Start Generating',
                                    href: '/generate',
                                }}
                                image='/images/chill-reading.jpeg'
                                textColor='white'
                                color='var(--forest)'
                            />
                        </div>
                        <div className='flex-1'>
                            <Block
                                size='large'
                                frontHeader='Challenges.'
                                backHeader='Weekly Challenges '
                                content='Check out this week’s writing challenge to help you stay creative and consistent. Each challenge offers a simple prompt, theme, or twist to get you writing and keep your ideas flowing. Come back every week for something new.'
                                button={{
                                    text: 'Start the Weekly Challenge',
                                    href: '/weekly-challenge',
                                }}
                                image='/images/AdobeStock_1452587198.jpeg'
                                textColor='var(--forest)'
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
                                frontHeader='Guide.'
                                backHeader='Guiding your story'
                                content='Our writing guides are here to help you grow your skills without the pressure. Whether you’re just getting started or looking to try something new, these guides cover the basics in a simple, approachable way. No jargon, no gatekeeping - just helpful tips from fellow writers who love the craft. Take what you need, skip what you don’t, and write at your own pace.'
                                button={{
                                    text: 'Get the Guide!',
                                    href: '/guides',
                                }}
                                image='/images/bookstack.jpeg'
                                color='var(--cafe)'
                            />
                        </div>

                        {/* Right Column - Two stacked blocks */}
                        <div className='flex-1 flex flex-col gap-4'>
                            <div className='flex-1'>
                                <Block
                                    size='medium'
                                    frontHeader='Community.'
                                    backHeader='Share & Discover'
                                    content='Read stories, thoughts, and experiences shared by writers in our community. Everyone writes for different reasons—this is where we celebrate them all.'
                                    button={{
                                        text: 'Join Community',
                                        href: '/community',
                                    }}
                                    image='/images/typewriter.jpeg'
                                    textColor='black'
                                    color='var(--hazelwood)'
                                />
                            </div>
                            <div className='flex-1'>
                                <Block
                                    size='small'
                                    frontHeader='About.'
                                    backHeader='Get to know us'
                                    content='Learn about who we are and what this space is all about. Why it was created, what it’s for, and the values behind it.'
                                    button={{
                                        text: 'Read more about us!',
                                        href: '/about',
                                    }}
                                    image='/images/AdobeStock_445827520.jpeg'
                                    textColor='var(--forest)'
                                    color='var(--candle-light)'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Down Chevron */}
                {showChevron && (
                    <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
                        <svg
                            className='w-8 h-8 text-white opacity-70 hover:opacity-100 transition-opacity cursor-pointer'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            onClick={() =>
                                window.scrollBy({
                                    top: window.innerHeight,
                                    behavior: 'smooth',
                                })
                            }
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M19 14l-7 7m0 0l-7-7m7 7V3'
                            />
                        </svg>
                    </div>
                )}
            </div>
            <div className='p-8 flex flex-row items-center justify-center'>
                <div className='flex-[4] pr-8'>
                    <h2 className='text-3xl font-bold mb-6'>
                        Try it now: Write in Peace
                    </h2>
                    <p className=' mb-6 leading-relaxed'>
                        Write in Peace is a focused writing app designed to
                        silence all the noise and help you get into flow. With
                        one tap you can block notifications, set structured
                        writing sessions, and create a calm environment where
                        your ideas can bloom. Whether you're drafting a novel,
                        blogging, or tackling essays, this app helps you create
                        the calmest, cozy space for your crafting needs.
                    </p>
                    <p className='mb-8 leading-relaxed'>
                        Set custom session timers, track your daily streaks, and
                        get insights into your productivity over time. With
                        flexible features like theme switching, writing goals,
                        and smart scheduling, Write in Peace adapts to your
                        routine and preferences. Whether you write in short
                        bursts or long creative sprints, Write in Peace keeps
                        you in control. It’s a simple, elegant space designed to
                        remove friction—so all that’s left is you and your
                        words.
                    </p>
                    <Link
                        to='/write-in-peace'
                        className='cta-button inline-block px-8 py-3 rounded-lgtransition-colors font-semibold'
                    >
                        Try Write in Peace
                    </Link>
                </div>
                <div className='flex-[3]'>
                    <img
                        src='/images/AdobeStock_1452587198.jpeg'
                        alt='Description'
                        className='w-full h-auto rounded-lg shadow-md'
                    />
                </div>
            </div>
            <div className='p-8'>
                <h2 className='text-4xl font-bold text-center mb-12'>
                    Pricing
                </h2>
                <div className='flex gap-8 justify-center max-w-6xl mx-auto items-stretch'>
                    <div className='flex-1 max-w-sm'>
                        <PricingBlock
                            tierName='Free'
                            price='0'
                            headerColor='var(--fog)'
                            features={[
                                'Distraction blocker',
                                'Pomodoro session timer',
                                'Light theme',
                                'Daily writing streak tracker',
                                '1-2 writing sessions per day',
                            ]}
                        />
                    </div>
                    <div className='flex-1 max-w-sm'>
                        <PricingBlock
                            tierName='Standard'
                            price='35'
                            headerColor='var(--hazelwood)'
                            features={[
                                'Distraction blocker',
                                'Custom session timer',
                                'Light theme and Dark theme',
                                'Daily writing streak tracker',
                                '3–5 writing sessions per day',
                                'Cloud sync across devices',
                                'Basic writing stats',
                            ]}
                        />
                    </div>
                    <div className='flex-1 max-w-sm'>
                        <PricingBlock
                            tierName='Plus'
                            price='55'
                            headerColor='var(--candle-light)'
                            features={[
                                'Distraction blocker',
                                'Custom session timer',
                                'Dark theme and other themes',
                                'Daily writing streak tracker',
                                'Unlimited writing sessions',
                                'Cloud sync across devices',
                                'Advanced analytics & insights',
                                'Access to beta features',
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
