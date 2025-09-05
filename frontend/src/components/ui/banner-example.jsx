import Banner from './banner';

const BannerExample = () => {
    return (
        <div>
            <Banner height='80vh' className='mb-8'>
                <div className='max-w-4xl mx-auto'>
                    <h1 className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent'>
                        Write Your Story
                    </h1>
                    <p className='text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed'>
                        Experience the art of writing with our vintage-inspired
                        tools and cozy atmosphere
                    </p>
                    <button className='bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
                        Start Writing
                    </button>
                </div>
            </Banner>

            {/* Some content below to test the parallax scrolling */}
            <div className='container mx-auto px-4 py-16'>
                <h2 className='text-3xl font-bold mb-8'>
                    Scroll to see the parallax effect!
                </h2>
                <div className='space-y-8'>
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className='bg-gray-100 p-8 rounded-lg'>
                            <h3 className='text-xl font-semibold mb-4'>
                                Content Section {i + 1}
                            </h3>
                            <p className='text-gray-700'>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerExample;
