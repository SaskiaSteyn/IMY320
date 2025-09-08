//a component that uses a grid to layout the cards in a 1-2-1 layout with images and text
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const Products = () => {
    return (
        <div
            id='products'
            className='relative w-full'
            style={{
                backgroundColor: '#19191a',
            }}
        >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-8 h-full min-h-[80vh]'>
                    {/* First Column - Spans 2 rows */}
                    <Link to='/category/mugs' className='lg:row-span-2'>
                        <Card
                            className='lg:row-span-2 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer hover:border-yellow-500 h-full'
                            backgroundImage='/images/new/merch/cove-mug-banner.png'
                            title='Shop mugs'
                        />
                    </Link>

                    {/* Second Column - Row 1 */}
                    <Link to='/category/hoodies'>
                        <Card
                            className='transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer hover:border-blue-500 h-full'
                            backgroundImage='/images/new/merch/cove-hoodie-banner.png'
                            title='Shop hoodies'
                        />
                    </Link>

                    {/* Third Column - Spans 2 rows */}
                    <Link to='/category/totes' className='lg:row-span-2'>
                        <Card
                            className='lg:row-span-2 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer hover:border-green-500 h-full'
                            backgroundImage='/images/new/merch/cove-tote-banner.png'
                            title='Shop totes'
                        />
                    </Link>

                    {/* Second Column - Row 2 */}
                    <Link to='/category/stickers'>
                        <Card
                            className='transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer hover:border-purple-500 h-full'
                            backgroundImage='/images/new/merch/cove-sticker-banner.png'
                            title='Shop stickers'
                            textColor='text-black'
                        />
                    </Link>
                </div>
            </div>
            <div className='flex justify-center pb-12'>
                <Link to='/products'>
                    <Button className=''>Shop merch</Button>
                </Link>
            </div>
        </div>
    );
};

export default Products;
