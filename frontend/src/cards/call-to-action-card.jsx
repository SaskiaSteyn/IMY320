import Button from '../components/button.jsx';

const CallToActionCard = ({ zIndex }) => {
    return (
        <div
            className='h-screen w-full relative card-section bg-[#d1d6d7]'
            style={{ zIndex }}
        >
            <div className=' flex flex-col justify-center h-full text-white'>
                {/* Features Bento Grid */}
                <div className='grid grid-cols-3 grid-rows-2 gap-6 mb-6 max-w-7xl mx-auto h-[24rem] w-full'>
                    {/* Community - Large block (2x2) */}
                    <div className='col-span-2 row-span-2 bg-[#BAC7CB] rounded-lg p-6 hover:bg-[#BAC7CB]/90 transition-colors flex flex-col justify-center'>
                        <h3 className='text-2xl font-bold mb-3 text-black'>
                            Community
                        </h3>
                        <p className='text-base leading-relaxed text-black/80 mb-4'>
                            Connect with fellow writers from around the world.
                            Share your progress, get feedback, and participate
                            in writing discussions. Find writing partners, join
                            critique groups, and celebrate milestones together.
                        </p>
                        <div className='mt-auto'>
                            <Button
                                text='Join Community'
                                href='/community'
                                textColor='black'
                                className='bg-white/20 hover:bg-white/30'
                            />
                        </div>
                    </div>

                    {/* Weekly Challenges - Top right */}
                    <div className='col-span-1 row-span-1 bg-[#E79210] rounded-lg p-4 hover:bg-[#E79210]/90 transition-colors flex flex-col justify-between'>
                        <div>
                            <h3 className='text-lg font-bold mb-2 text-black'>
                                Weekly Challenges
                            </h3>
                            <p className='text-sm leading-relaxed text-black/80'>
                                Push your creativity with weekly writing
                                challenges and prompts.
                            </p>
                        </div>
                        <div className='mt-3'>
                            <Button
                                text='Start Challenge'
                                href='/weekly-challenge'
                                textColor='black'
                                className='bg-white/20 hover:bg-white/30 px-3 py-1.5 text-sm'
                            />
                        </div>
                    </div>

                    {/* Writing Guides - Bottom right */}
                    <div className='col-span-1 row-span-1 bg-[#7D7F49] rounded-lg p-4 hover:bg-[#7D7F49]/90 transition-colors flex flex-col justify-between text-black'>
                        <div>
                            <h3 className='text-lg font-bold mb-2 '>
                                Writing Guides
                            </h3>
                            <p className='text-sm leading-relaxed'>
                                Access comprehensive guides and techniques to
                                improve your craft.
                            </p>
                        </div>
                        <div className='mt-3'>
                            <Button
                                text='Read Guides'
                                href='/guides'
                                textColor='black'
                                className='bg-white/20 hover:bg-white/30 px-3 py-1.5 text-sm'
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Prompts and CTA */}
                <div className='grid grid-cols-2 gap-6 max-w-7xl mx-auto h-40 w-full'>
                    {/* AI Writing Prompts */}
                    <div className='bg-[#D2C198] rounded-lg p-5 hover:bg-[#D2C198]/90 transition-colors flex flex-col justify-between'>
                        <div>
                            <h3 className='text-xl font-bold mb-2 text-black'>
                                AI Writing Prompts
                            </h3>
                            <p className='text-sm leading-relaxed text-black/80'>
                                Generate unlimited writing prompts tailored to
                                your interests. Never run out of ideas for your
                                next story.
                            </p>
                        </div>
                        <div className='mt-3'>
                            <Button
                                text='Generate Prompts'
                                href='/generate'
                                textColor='black'
                                className='bg-white/20 hover:bg-white/30'
                            />
                        </div>
                    </div>

                    {/* Create Free Account - CTA */}
                    <div className='bg-[#4E1F08] rounded-lg p-6 hover:bg-[#4E1F08]/90 transition-all duration-300 flex flex-col justify-center border border-white/10'>
                        <div>
                            <h3 className='text-xl font-bold mb-2 text-white'>
                                Start Writing Today
                            </h3>
                            <p className='text-sm leading-relaxed text-white/80 mb-4'>
                                Join Cove and experience distraction-free
                                writing with session timers, streak tracking,
                                and more.
                            </p>
                        </div>
                        <div className='mt-3'>
                            <Button
                                text='Create Free Account'
                                href='/write-in-peace'
                                textColor='white'
                                className='bg-white/20 hover:bg-white/30'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallToActionCard;
