import ChevronDown from '../components/chevron-down.jsx';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../components/ui/card.jsx';

const WriteInPeaceCard = ({ zIndex }) => {
    return (
        <div
            className='min-h-screen w-full relative bg-gradient-to-br from-slate-50 to-gray-100'
            style={{ zIndex }}
        >
            <div className='container mx-auto px-8 py-16 h-full'>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 h-full min-h-[80vh]'>
                    {/* Top Row */}
                    <div className='lg:col-span-2'>
                        <Card className='h-full overflow-hidden'>
                            <div className='relative h-full'>
                                <img
                                    src='/images/Write-in-peace-product-photo.png'
                                    alt='Write in Peace App'
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        </Card>
                    </div>

                    <Card className='bg-amber-900 text-white'>
                        <CardHeader>
                            <CardTitle>2. Block Distractions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-amber-100'>
                                Silence all the noise with one tap. Block
                                notifications and create a distraction-free
                                environment where your ideas can bloom without
                                interruption.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className='bg-amber-800 text-white'>
                        <CardHeader>
                            <CardTitle>3. Smart Sessions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-amber-100'>
                                Set custom session timers that adapt to your
                                writing rhythm. Perfect for short bursts or long
                                creative sprints.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Bottom Row */}
                    <div className='lg:col-span-2'>
                        <Card className='h-full bg-green-900 text-white'>
                            <CardHeader>
                                <CardTitle>1. Calm Environment</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className='text-green-100'>
                                    Create the calmest, coziest space for your
                                    crafting needs. Beautiful themes, ambient
                                    sounds, and smart scheduling help you find
                                    the perfect writing atmosphere whether
                                    you're drafting novels, blogging, or
                                    tackling essays.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className='bg-amber-900 text-white'>
                        <CardHeader>
                            <CardTitle>4. Set Goals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-amber-100'>
                                Set flexible writing goals and word count
                                targets that adapt to your routine and
                                preferences. Write in Peace removes friction so
                                all that's left is you and your words.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className='overflow-hidden'>
                        <div className='h-full'>
                            <img
                                src='/images/cozy.jpeg'
                                alt='Cozy Writing Space'
                                className='w-full h-full object-cover'
                            />
                        </div>
                    </Card>
                </div>
            </div>
            <ChevronDown backgroundColor='white' />
        </div>
    );
};

export default WriteInPeaceCard;
