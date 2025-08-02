import ChevronDown from '../components/chevron-down.jsx';
import PricingBlock from '../components/pricing.jsx';

const PricingCard = ({ zIndex }) => {
    return (
        <div
            className='h-screen w-full relative card-section bg-[#1E1E1E]'
            style={{ zIndex }}
        >
            <div className='p-8 h-full flex flex-col justify-center'>
                <h2 className='text-4xl font-bold text-center mb-12'>
                    Pricing
                </h2>
                <div className='flex gap-8 px-8 justify-center w-full mx-auto items-stretch'>
                    <div className='flex-1'>
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
                    <div className='flex-1'>
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
                    <div className='flex-1'>
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

            {/* Scroll Down Chevron */}
            <ChevronDown />
        </div>
    );
};

export default PricingCard;
