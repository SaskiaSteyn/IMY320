import Block from '../components/block.jsx';
import ChevronDown from '../components/chevron-down.jsx';

const HeroCard = ({ showChevron, zIndex }) => {
    return (
        <div
            className='h-screen w-full relative card-section'
            style={{ zIndex }}
        >
            <div className='flex gap-4 p-8 h-full relative'>
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
                        buttons={[
                            {
                                text: 'Start Writing in Peace',
                                href: '/write-in-peace',
                            },
                        ]}
                        image='/images/AdobeStock_1575577074.jpeg'
                        textColor='black'
                        color='#808000'
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
                                content='Helps you choose random writing prompts to help you get started.'
                                button={{
                                    text: 'Start Generating',
                                    href: '/generate',
                                }}
                                image='/images/chill-reading.jpeg'
                                textColor='white'
                                color='#228B22'
                            />
                        </div>
                        <div className='flex-1'>
                            <Block
                                size='large'
                                frontHeader='Challenges.'
                                backHeader='Weekly Challenges '
                                content="Check out this week's writing challenge to help you stay creative and consistent."
                                button={{
                                    text: 'Start the Weekly Challenge',
                                    href: '/weekly-challenge',
                                }}
                                image='/images/AdobeStock_1452587198.jpeg'
                                textColor='#228B22'
                                color='#F5F5F5'
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
                                content="Our writing guides are here to help you grow your skills without the pressure. Whether you're just getting started or looking to try something new, these guides cover the basics in a simple, approachable way. No jargon, no gatekeeping - just helpful tips from fellow writers who love the craft. Take what you need, skip what you don't, and write at your own pace."
                                button={{
                                    text: 'Get the Guide!',
                                    href: '/guides',
                                }}
                                image='/images/bookstack.jpeg'
                                color='#8B4513'
                            />
                        </div>

                        {/* Right Column - Two stacked blocks */}
                        <div className='flex-1 flex flex-col gap-4'>
                            <div className='flex-1'>
                                <Block
                                    size='medium'
                                    frontHeader='Community.'
                                    backHeader='Share & Discover'
                                    content='Read stories, thoughts, and experiences shared by writers in our community.'
                                    button={{
                                        text: 'Join Community',
                                        href: '/community',
                                    }}
                                    image='/images/typewriter.jpeg'
                                    textColor='black'
                                    color='#D2B48C'
                                />
                            </div>
                            <div className='flex-1'>
                                <Block
                                    size='small'
                                    frontHeader='About.'
                                    backHeader='Get to know us'
                                    content="Learn about who we are and what this space is all about. Why it was created, what it's for."
                                    button={{
                                        text: 'Read more about us!',
                                        href: '/about',
                                    }}
                                    image='/images/Cove-logo-landing.png'
                                    textColor='#228B22'
                                    color='#FFF8DC'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Down Chevron */}
                {showChevron && <ChevronDown />}
            </div>
        </div>
    );
};

export default HeroCard;
