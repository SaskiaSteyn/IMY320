import ChevronDown from '../components/chevron-down.jsx';
import StaticBlock from '../components/static-block.jsx';

const StaticHeroCard = ({ showChevron, zIndex }) => {
    return (
        <div
            className='h-screen w-full relative card-section bg-[#d1d6d7]'
            style={{ zIndex }}
        >
            <div className='flex gap-4 p-8 h-full relative'>
                {/* Left Column - Large Hero Block */}
                <div className='flex-[1]'>
                    <StaticBlock
                        size='xlarge'
                        frontHeader='Cove.'
                        image='/images/AdobeStock_1575577074.jpeg'
                    />
                </div>

                {/* Right Column */}
                <div className='flex-[2] flex flex-col gap-4 h-full'>
                    {/* Top Row - Two blocks side by side */}
                    <div className='flex gap-4 flex-[1]'>
                        <div className='flex-1'>
                            <StaticBlock
                                size='medium'
                                backHeader='Write in Peace. An App for Writers, by Writers'
                                content=''
                                textColor='white'
                                color='var(--cafe)'
                            />
                        </div>
                        <div className='flex-1'>
                            <StaticBlock
                                size='large'
                                backHeader='Write in Peace'
                                content='Write in Peace is a focused writing app designed to silence all the noise and help you get into flow. With one tap you can block notifications, set structured writing sessions, and create a calm environment where your ideas can bloom.'
                                textColor='white'
                                color='var(--background)'
                            />
                        </div>
                    </div>
                    {/* Bottom Row - One left, two stacked right */}
                    <div className='flex gap-4 flex-[2] h-full'>
                        {/* Left Block */}
                        <div className='flex-1 flex flex-col gap-4'>
                            <div className='flex-1'>
                                <StaticBlock
                                    size='large'
                                    image='/images/Cove-logo-landing.png'
                                />
                            </div>
                            <div className='flex-1'>
                                <StaticBlock
                                    size='small'
                                    frontHeader=''
                                    image='/images/Write-in-peace-product-photo.png'
                                />
                            </div>
                        </div>

                        {/* Right Column - Two stacked blocks */}
                        <div className='flex-1 flex flex-col gap-4'>
                            <div className='flex-1'>
                                <StaticBlock
                                    size='medium'
                                    backHeader='Calm your mind, write without interruption.'
                                    content="Create the calmest, coziest space for your crafting needs. Beautiful themes, ambient sounds, and smart scheduling help you find the perfect writing atmosphere whether you're drafting novels, blogging, or tackling essays."
                                    button={{
                                        text: 'Get started',
                                        href: '/write-in-peace',
                                    }}
                                    textColor='white'
                                    color='var(--background)'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Down Chevron */}
                {showChevron && (
                    <ChevronDown backgroundColor='var(--background)' />
                )}
            </div>
        </div>
    );
};

export default StaticHeroCard;
