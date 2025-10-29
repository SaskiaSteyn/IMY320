import { Link } from 'react-router-dom';
import ChevronDown from '../components/chevron-down.jsx';
import { Button } from '../components/ui/button.jsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../components/ui/card.jsx';

const CallToActionCard = ({ zIndex }) => {
    return (
        <div
            className='min-h-screen w-full relative bg-gradient-to-br from-slate-900 to-gray-800 text-white'
            style={{ zIndex }}
        >
            <div className='container mx-auto px-8 py-16 h-full'>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8'>
                    {/* Main CTA - spans 2 columns */}
                    <div className='lg:col-span-2'>
                        <Card className='h-full bg-white text-black'>
                            <CardHeader>
                                <CardTitle className='text-2xl'>
                                    Download Write in Peace
                                </CardTitle>
                                <CardDescription>
                                    Start writing distraction-free today
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <p>
                                    Download the Write in Peace app to start
                                    writing distraction-free. Available on all
                                    major platforms.
                                </p>
                                <p className='text-sm text-gray-600'>
                                    Create the calmest, coziest space for your
                                    crafting needs. Beautiful themes, ambient
                                    sounds, and smart scheduling help you find
                                    the perfect writing atmosphere.
                                </p>
                                <Button size='lg' className='w-full' asChild>
                                    <Link to='/login'>Start for free!</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Image card */}
                    <Card className='overflow-hidden'>
                        <img
                            src='/images/relaxed.jpeg'
                            alt='Relaxed writing environment'
                            className='w-full h-full object-cover'
                        />
                    </Card>

                    {/* Feature cards */}
                    <div className='space-y-4'>
                        <Card className='bg-amber-500 text-black'>
                            <CardHeader>
                                <CardTitle className='text-lg'>
                                    Weekly Challenges
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className='text-sm'>
                                    Push your creativity with weekly writing
                                    challenges and prompts.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className='bg-amber-500 text-black'>
                            <CardHeader>
                                <CardTitle className='text-lg'>
                                    Writing Guides
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className='text-sm'>
                                    Access comprehensive guides and techniques
                                    to improve your craft.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
                    <div className='lg:col-span-2'>
                        <Card className='h-full bg-white text-black'>
                            <CardHeader>
                                <CardTitle>AI Writing Prompts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Generate unlimited writing prompts tailored
                                    to your interests. Never run out of ideas
                                    for your next story.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className='bg-gray-700 text-white'>
                        <CardHeader>
                            <CardTitle>Community</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm'>
                                Connect with fellow writers from around the
                                world. Share your progress, get feedback, and
                                participate in writing discussions.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className='overflow-hidden'>
                        <img
                            src='/images/chill-reading.jpeg'
                            alt='Peaceful reading'
                            className='w-full h-full object-cover'
                        />
                    </Card>
                </div>
            </div>
            <ChevronDown backgroundColor='white' />
        </div>
    );
};

export default CallToActionCard;
