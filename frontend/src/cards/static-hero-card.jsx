import { Link } from 'react-router-dom';
import ChevronDown from '../components/chevron-down.jsx';
import { Button } from '../components/ui/button.jsx';
import { Card } from '../components/ui/card.jsx';

const StaticHeroCard = ({ showChevron, zIndex }) => {
    return (
        <div
            className='min-h-screen w-full relative bg-gradient-to-br from-blue-50 to-white'
            style={{ zIndex }}
        >
            <div className='container mx-auto px-8 py-16 h-full'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 h-full min-h-[80vh]'>
                    {/* Left Column - Large Hero Block */}
                    <div className='lg:col-span-1'>
                        <Card
                            className='h-full'
                            backgroundImage='/images/AdobeStock_1575577074.jpeg'
                            title='Cove.'
                        />
                    </div>

                    {/* Right Column */}
                    <div className='lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8'>
                        {/* Top Row - Two blocks */}
                        <Card
                            title='Write in Peace'
                            text='An App for Writers, by Writers'
                        />

                        <Card
                            title='Write in Peace'
                            text='Write in Peace is a focused writing app designed to silence all the noise and help you get into flow. With one tap you can block notifications, set structured writing sessions, and create a calm environment where your ideas can bloom.'
                        />

                        {/* Bottom Row */}
                        <Card backgroundImage='/images/Cove-logo-landing.png' />

                        <div className='space-y-4'>
                            <Card
                                className='flex-1'
                                backgroundImage='/images/Write-in-peace-product-photo.png'
                            />

                            <Card
                                className='flex-1'
                                title='Calm your mind, write without interruption.'
                                text='Create the calmest, coziest space for your crafting needs. Beautiful themes, ambient sounds, and smart scheduling help you find the perfect writing atmosphere.'
                            >
                                <div className='relative z-10 p-6 pt-0'>
                                    <Button asChild>
                                        <Link to='/write-in-peace'>
                                            Get started
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Scroll Down Chevron */}
                {showChevron && <ChevronDown backgroundColor='white' />}
            </div>
        </div>
    );
};

export default StaticHeroCard;
