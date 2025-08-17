import ChevronDown from '../components/chevron-down.jsx';
import StaticBlock from '../components/static-block.jsx';

const WriteInPeaceCard = ({ zIndex }) => {
    return (
        <div
            className='h-screen w-full relative card-section bg-[var(--text)]'
            style={{ zIndex }}
        >
            <div className='p-8 h-full flex items-center justify-center'>
                {/* Bento Flexbox Layout */}
                <div className='flex flex-col h-4/5 gap-4 w-full'>
                    {/* Top Row */}
                    <div className='flex flex-row gap-4 flex-1'>
                        <StaticBlock
                            size={2}
                            image='/images/Write-in-peace-product-photo.png'
                            frontHeader=''
                        />
                        <div className='flex flex-col gap-4 flex-1'>
                            <StaticBlock
                                size={1}
                                frontHeader='2. Block Distractions'
                                content='Silence all the noise with one tap. Block notifications and create a distraction-free environment where your ideas can bloom without interruption.'
                                color='var(--cafe)'
                                textColor='white'
                            />
                            <StaticBlock
                                size={1}
                                frontHeader='3. Smart Sessions'
                                content='Set custom session timers that adapt to your writing rhythm. Perfect for short bursts or long creative sprints, keeping you in complete control.'
                                color='var(--cafe)'
                                textColor='var(--text)'
                            />
                        </div>
                        <StaticBlock
                            size={1}
                            frontHeader='5. Track Progress'
                            content='Track your daily streaks and get insights into your productivity over time. Monitor your writing habits and celebrate your achievements as you build consistent writing routines.'
                            color='var(--background)'
                            textColor='white'
                        />
                    </div>

                    {/* Bottom Row */}
                    <div
                        className='flex flex-row gap-4'
                        style={{ height: '33%' }}
                    >
                        <StaticBlock
                            size={2}
                            frontHeader='1. Calm Environment'
                            content="Create the calmest, coziest space for your crafting needs. Beautiful themes, ambient sounds, and smart scheduling help you find the perfect writing atmosphere whether you're drafting novels, blogging, or tackling essays."
                            color='#222600'
                            textColor='white'
                        />
                        <StaticBlock
                            size={1}
                            frontHeader='4. Set Goals'
                            content="Set flexible writing goals and word count targets that adapt to your routine and preferences. Write in Peace removes friction so all that's left is you and your words."
                            color='var(--cafe)'
                            textColor='white'
                        />
                        <StaticBlock
                            size={1}
                            image='/images/cozy.jpeg'
                            frontHeader=''
                        />
                    </div>
                </div>
            </div>

            {/* Scroll Down Chevron */}
            <ChevronDown backgroundColor='var(--background)' />
        </div>
    );
};

export default WriteInPeaceCard;
