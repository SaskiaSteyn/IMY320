import PricingBlock from '../components/pricing.jsx';

const PricingCard = ({ zIndex }) => {
    return (
        <div
            className='h-screen w-full relative bg-[#d1d6d7]'
            style={{ zIndex }}
        >
            <div className='p-8 h-full flex flex-col justify-center'>
                <h2 className='text-4xl font-bold text-center mb-12 text-[var(--background)]'>
                    Pricing
                </h2>
                <div className='flex gap-8 px-8 justify-center w-full mx-auto items-stretch'>
                    <div className='flex-1'>
                        <PricingBlock
                            tierName='Free'
                            price='0'
                            headerColor='var(--hazelwood)'
                            textColor='var(--text-hazelwood, #000000)'
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
                            headerColor='var(--forest)'
                            textColor='var(--text-forest, #ffffff)'
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
                            textColor='var(--text-candle-light, #000000)'
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
        </div>
    );
};

export default PricingCard;
