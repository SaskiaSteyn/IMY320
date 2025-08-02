import Button from '../components/button.jsx';
import ChevronDown from '../components/chevron-down.jsx';

const WriteInPeaceCard = ({ zIndex }) => {
    return (
        <div
            className='h-screen w-full relative card-section bg-[#D2C198]'
            style={{ zIndex }}
        >
            <div className='p-8 flex flex-row items-center justify-center h-full'>
                <div className='flex-1 pr-8 text-black'>
                    <h2 className='text-3xl font-bold mb-6'>
                        Try it now: Write in Peace
                    </h2>
                    <p className='mb-6 leading-relaxed'>
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
                        you in control. It's a simple, elegant space designed to
                        remove friction—so all that's left is you and your
                        words.
                    </p>
                    <Button
                        text='Try Write in Peace'
                        href='/write-in-peace'
                        textColor='black'
                    />
                </div>
                <div className='flex-1 h-full px-10 py-15'>
                    {/* Bento Layout for Images */}
                    <div className='grid grid-cols-2 grid-rows-2 gap-4 h-full'>
                        {/* Top image - spans full width */}
                        <div className='col-span-2 row-span-1'>
                            <img
                                src='/images/Write-in-peace-product-photo.png'
                                alt='Write in Peace App'
                                className='w-full h-full object-cover object-top rounded-lg shadow-md'
                            />
                        </div>

                        {/* Bottom left image */}
                        <div className='col-span-1 row-span-1'>
                            <img
                                src='/images/cozy.jpeg'
                                alt='Cozy writing space'
                                className='w-full h-full object-cover object-top rounded-lg shadow-md'
                            />
                        </div>

                        {/* Bottom right image */}
                        <div className='col-span-1 row-span-1'>
                            <img
                                src='/images/relaxed.jpeg'
                                alt='Relaxed writing environment'
                                className='w-full h-full object-cover object-top rounded-lg shadow-md'
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
