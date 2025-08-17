import React, {useState} from 'react';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';

const WipDetails = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleItem = (index) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    const features = [
        {
            title: 'Calm Environment',
            description: 'Create the calmest, coziest space for your crafting needs. Beautiful themes, ambient sounds, and smart scheduling help you find the perfect writing atmosphere whether you\'re drafting novels, blogging, or tackling essays.'
        },
        {
            title: 'Block Distractions',
            description: 'Silence all the noise with one tap. Block notifications and create a distraction-free environment where your ideas can bloom without interruption.'
        },
        {
            title: 'Smart Sessions',
            description: 'Set custom session timers that adapt to your writing rhythm. Perfect for short bursts or long creative sprints, keeping you in complete control.'
        },
        {
            title: 'Set Goals',
            description: 'Set flexible writing goals and word count targets that adapt to your routine and preferences. Write in Peace removes friction so all that\'s left is you and your words.'
        },
        {
            title: 'Track Progress',
            description: 'Track your daily streaks and get insights into your productivity over time. Monitor your writing habits and celebrate your achievements as you build consistent writing routines.'
        }
    ];

    return (
        <div className='w-full relative bg-[#d1d6d7]'>
            <div className='p-8 flex flex-col justify-center'>
                {/* Product Image and App Heading Section */}
                <div className='flex items-center justify-between mb-16 max-w-6xl mx-auto w-full'>
                    <div className='flex-1 pr-8'>
                        <h1 className='text-5xl font-bold mb-6' style={{color: 'var(--background)'}}>
                            Write in Peace App
                        </h1>
                        <p className='text-xl leading-relaxed' style={{color: 'var(--background)'}}>
                            Transform your writing experience with our distraction-free environment designed specifically for writers, bloggers, and content creators.
                        </p>
                    </div>
                    <div className='flex-1 flex justify-center'>
                        <img
                            src='/images/Write-in-peace-product-photo.png'
                            alt='Write in Peace App Screenshot'
                            className='max-w-md w-full h-auto rounded-lg shadow-2xl'
                        />
                    </div>
                </div>

                {/* Features Section */}
                <div className='max-w-4xl mx-auto w-full'>
                    <h2 className='text-3xl font-bold text-center mb-8' style={{color: 'var(--background)'}}>
                        Key Features
                    </h2>

                    <div className='flex flex-col gap-4'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className='bg-white/20 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl border border-white/30'
                            >
                                <button
                                    onClick={() => toggleItem(index)}
                                    className='w-full p-4 text-left flex items-center justify-between hover:bg-white/10 transition-all duration-200 rounded-lg'
                                >
                                    <h3 className='text-lg font-semibold' style={{color: 'var(--background)'}}>
                                        {index + 1}. {feature.title}
                                    </h3>
                                    <div style={{color: 'var(--background)'}}>
                                        {expandedIndex === index ? (
                                            <FaChevronUp className='text-sm' />
                                        ) : (
                                            <FaChevronDown className='text-sm' />
                                        )}
                                    </div>
                                </button>

                                {expandedIndex === index && (
                                    <div className='px-4 pb-4 border-t border-white/20'>
                                        <p
                                            className='text-sm leading-relaxed pt-3'
                                            style={{color: 'var(--background)'}}>
                                            {feature.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WipDetails;
