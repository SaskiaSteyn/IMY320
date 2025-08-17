import ChevronDown from '../components/chevron-down.jsx';
import StaticBlock from '../components/static-block.jsx';

const CallToActionCard = ({ zIndex }) => {
    return (
        <div
            className='h-screen w-full relative card-section bg-[var(--text)] p-8'
            style={{ zIndex }}
        >
            <div className='flex flex-col justify-center h-full text-white gap-4'>
                {/* Features Bento Grid */}
                <div className='grid grid-cols-4 grid-rows-2 gap-4 w-full mx-auto h-[22rem]'>
                    {/* Large Community block, spans 2x2 */}
                    <div className='col-span-2 row-span-2'>
                        <StaticBlock
                            size={2}
                            frontHeader='Download Write in Peace'
                            content={[
                                'Download the Write in Peace app to start writing distraction-free. Available on all major platforms.',
                                "Calm Environment: Create the calmest, coziest space for your crafting needs. Beautiful themes, ambient sounds, and smart scheduling help you find the perfect writing atmosphere whether you're drafting novels, blogging, or tackling essays.",
                                'Block Distractions: Use powerful tools to block distracting websites and apps, allowing you to focus on your writing.',
                            ]}
                            color='var(--background)'
                            textColor='var(--text)'
                            button={{
                                text: 'Start for free!',
                                href: '/login',
                            }}
                        />
                    </div>
                    {/* Image block, top right, spans 2 rows */}
                    <div className='col-span-1 row-span-2'>
                        <StaticBlock
                            size={1}
                            image='/images/relaxed.jpeg'
                            frontHeader=''
                        />
                    </div>
                    {/* Weekly Challenges, top row, rightmost */}
                    <div className='col-span-1 row-span-1'>
                        <StaticBlock
                            size={1}
                            frontHeader='Weekly Challenges'
                            content='Push your creativity with weekly writing challenges and prompts.'
                            color='var(--candle-light)'
                            textColor='black'
                        />
                    </div>
                    {/* Writing Guides, bottom row, rightmost */}
                    <div className='col-span-1 row-span-1'>
                        <StaticBlock
                            size={1}
                            frontHeader='Writing Guides'
                            content='Access comprehensive guides and techniques to improve your craft.'
                            color='var(--candle-light)'
                            textColor='black'
                        />
                    </div>
                </div>

                {/* Bottom Section - Prompts and CTA */}
                <div className='grid grid-cols-4 gap-4 mx-auto h-[15rem] w-full'>
                    <StaticBlock
                        size={3}
                        frontHeader='AI Writing Prompts'
                        content='Generate unlimited writing prompts tailored to your interests. Never run out of ideas for your next story.'
                        color='var(--background)'
                        textColor='var(--text)'
                    />
                    <StaticBlock
                        size={1}
                        frontHeader='Community'
                        content='Connect with fellow writers from around the world. Share your progress, get feedback, and participate in writing discussions. Find writing partners, join critique groups, and celebrate milestones together.'
                        color='var(--background)'
                        textColor='white'
                    />
                    <StaticBlock
                        size={1}
                        frontHeader='Start Writing Today'
                        content='Join Cove and experience distraction-free writing with session timers, streak tracking, and more.'
                        color='#4E1F08'
                        textColor='white'
                    />
                    <StaticBlock
                        size={1}
                        image='/images/chill-reading.jpeg'
                        frontHeader=''
                    />
                </div>
            </div>
            <ChevronDown backgroundColor='var(--background)' />
        </div>
    );
};

export default CallToActionCard;
