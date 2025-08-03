import ChevronDown from '../components/chevron-down.jsx';

const WriteInPeaceCard = ({ zIndex }) => {
    return (
        <div
            className='h-screen w-full relative card-section bg-[#D2C198]'
            style={{ zIndex }}
        >
            <div className='p-8 h-full flex items-center justify-center'>
                {/* Bento Flexbox Layout */}
                <div className='flex flex-col h-4/5 gap-4 w-full'>
                    {/* Top Row */}
                    <div className='flex flex-row gap-4 flex-1'>
                        {/* Product Image - Large focal point */}
                        <div
                            className='rounded-xl shadow-lg overflow-hidden'
                            style={{ flex: '2' }}
                        >
                            <img
                                src='/images/Write-in-peace-product-photo.png'
                                alt='Write in Peace App'
                                className='w-full h-full object-cover'
                            />
                        </div>

                        {/* Right column with two feature blocks */}
                        <div
                            className='flex flex-col gap-4'
                            style={{ flex: '1' }}
                        >
                            {/* Distraction-Free Focus */}
                            <div className='flex-1 bg-[#E79210] rounded-xl p-6 shadow-lg flex flex-col justify-center text-black'>
                                <h3 className='font-bold text-lg mb-2'>
                                    Block Distractions
                                </h3>
                                <p className='text-sm opacity-90'>
                                    Silence all the noise with one tap. Block
                                    notifications and create a distraction-free
                                    environment where your ideas can bloom
                                    without interruption.
                                </p>
                            </div>

                            {/* Session Timer */}
                            <div className='flex-1 bg-[#7D7F49] rounded-xl p-6 shadow-lg flex flex-col justify-center text-black'>
                                <h3 className='font-bold text-lg mb-2'>
                                    Smart Sessions
                                </h3>
                                <p className='text-sm opacity-90'>
                                    Set custom session timers that adapt to your
                                    writing rhythm. Perfect for short bursts or
                                    long creative sprints, keeping you in
                                    complete control.
                                </p>
                            </div>
                        </div>

                        {/* Progress Tracking - Tall block */}
                        <div
                            className='bg-[#222600] rounded-xl p-6 shadow-lg flex flex-col justify-center text-white'
                            style={{ flex: '1' }}
                        >
                            <h3 className='font-bold text-xl mb-3'>
                                Track Progress
                            </h3>
                            <p className='text-sm opacity-90'>
                                Track your daily streaks and get insights into
                                your productivity over time. Monitor your
                                writing habits and celebrate your achievements
                                as you build consistent writing routines.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div
                        className='flex flex-row gap-4'
                        style={{ height: '33%' }}
                    >
                        {/* Calm Environment - aligns with product image */}
                        <div
                            className='bg-[#222600] rounded-xl p-6 shadow-lg flex items-center text-white'
                            style={{ flex: '2' }}
                        >
                            <div>
                                <h3 className='font-bold text-xl mb-2'>
                                    Calm Environment
                                </h3>
                                <p className='text-sm opacity-90'>
                                    Create the calmest, coziest space for your
                                    crafting needs. Beautiful themes, ambient
                                    sounds, and smart scheduling help you find
                                    the perfect writing atmosphere whether
                                    you're drafting novels, blogging, or
                                    tackling essays.
                                </p>
                            </div>
                        </div>

                        {/* Writing Goals - aligns with middle column */}
                        <div
                            className='bg-[#4E1F08] rounded-xl p-6 shadow-lg flex flex-col justify-center text-white'
                            style={{ flex: '1' }}
                        >
                            <h3 className='font-bold text-lg mb-2'>
                                Set Goals
                            </h3>
                            <p className='text-sm opacity-90'>
                                Set flexible writing goals and word count
                                targets that adapt to your routine and
                                preferences. Write in Peace removes friction so
                                all that's left is you and your words.
                            </p>
                        </div>

                        {/* Additional Image Block - aligns with progress tracking */}
                        <div
                            className='rounded-xl shadow-lg overflow-hidden'
                            style={{ flex: '1' }}
                        >
                            <img
                                src='/images/cozy.jpeg'
                                alt='Cozy writing space'
                                className='w-full h-full object-cover'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Down Chevron */}
            <ChevronDown />
        </div>
    );
};

export default WriteInPeaceCard;
