import Button from '../components/button.jsx';

const CallToActionCard = ({ zIndex }) => {
    return (
        <div
            className='h-screen w-full relative card-section bg-[#D2C198]'
            style={{ zIndex }}
        >
            <div className='p-8 flex flex-row items-center justify-center h-full'>
                <div className='flex-[4] pr-8 text-black'>
                    <h2 className='text-3xl font-bold mb-6'>
                        Ready to start your journey?
                    </h2>
                    <p className='mb-6 leading-relaxed'>
                        Join thousands of writers who have already discovered
                        the power of distraction-free writing. Whether you're a
                        novelist working on your next masterpiece, a blogger
                        crafting compelling content, or a student tackling
                        assignments, Cove provides the peaceful environment you
                        need to bring your ideas to life.
                    </p>
                    <p className='mb-8 leading-relaxed'>
                        Create your free account today and experience what it's
                        like to write without interruption. Start with our free
                        plan and discover features like distraction blocking,
                        session timers, and streak tracking. When you're ready
                        to take your writing to the next level, upgrade to
                        unlock unlimited sessions, advanced analytics, and
                        premium themes.
                    </p>
                    <Button
                        text='Create Free Account'
                        href='/write-in-peace'
                        textColor='black'
                    />
                </div>
                <div className='flex-[3]'>
                    <img
                        src='/images/cozy.jpeg'
                        alt='Cozy writing space'
                        className='w-full h-auto rounded-lg shadow-md'
                    />
                </div>
            </div>
        </div>
    );
};

export default CallToActionCard;
