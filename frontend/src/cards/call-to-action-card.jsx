import StaticBlock from '../components/static-block.jsx';

const CallToActionCard = ({ zIndex }) => {
    return (
        <div
            className='h-screen w-full relative card-section bg-[var(--text)] p-8'
            style={{ zIndex }}
        >
            <div className=' flex flex-col justify-center h-full text-white'>
                {/* Features Bento Grid */}
                <div className='grid grid-cols-4 grid-rows-2 gap-4 mb-6 w-full mx-auto h-[29rem]'>
                    {/* Large Community block, spans 2x2 */}
                    <div className='col-span-2 row-span-2'>
                        <StaticBlock
                            size={2}
                            frontHeader='1. Community'
                            content='Connect with fellow writers from around the world. Share your progress, get feedback, and participate in writing discussions. Find writing partners, join critique groups, and celebrate milestones together.'
                            color='var(--background)'
                            textColor='var(--text)'
                            button={{
                                text: 'Join Community',
                                href: '/community',
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
                            frontHeader='5. Weekly Challenges'
                            content='Push your creativity with weekly writing challenges and prompts.'
                            color='var(--candle-light)'
                            textColor='black'
                            button={{
                                text: 'Start Challenge',
                                href: '/weekly-challenge',
                            }}
                        />
                    </div>
                    {/* Writing Guides, bottom row, rightmost */}
                    <div className='col-span-1 row-span-1'>
                        <StaticBlock
                            size={1}
                            frontHeader='4. Writing Guides'
                            content='Access comprehensive guides and techniques to improve your craft.'
                            color='var(--candle-light)'
                            textColor='black'
                            button={{ text: 'Read Guides', href: '/guides' }}
                        />
                    </div>
                </div>

                {/* Bottom Section - Prompts and CTA */}
                <div className='grid grid-cols-2 gap-4 mx-auto h-50 w-full'>
                    <StaticBlock
                        size={1}
                        frontHeader='2. AI Writing Prompts'
                        content='Generate unlimited writing prompts tailored to your interests. Never run out of ideas for your next story.'
                        color='var(--background)'
                        textColor='var(--text)'
                        button={{ text: 'Generate Prompts', href: '/generate' }}
                    />
                    <StaticBlock
                        size={1}
                        frontHeader='3. Start Writing Today'
                        content='Join Cove and experience distraction-free writing with session timers, streak tracking, and more.'
                        color='#4E1F08'
                        textColor='white'
                        button={{
                            text: 'Create Free Account',
                            href: '/login',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CallToActionCard;
