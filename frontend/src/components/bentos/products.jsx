//a component that uses a grid to layout the cards in a 1-2-1 layout with images and text
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const Products = () => {
    return (
        <div
            className='relative w-full'
            style={{
                backgroundColor: '#19191a',
            }}
        >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-8 h-full min-h-[80vh]'>
                    {/* First Column - Spans 2 rows */}
                    <Card
                        className='lg:row-span-2'
                        backgroundImage='/images/new/merch/cove-mug-banner.png'
                        title='Shop mugs'
                    />

                    {/* Second Column - Row 1 */}
                    <Card
                        backgroundImage='/images/new/merch/cove-hoodie-banner.png'
                        title='Shop hoodies'
                    />

                    {/* Third Column - Spans 2 rows */}
                    <Card
                        className='lg:row-span-2'
                        backgroundImage='/images/new/merch/cove-tote-banner.png'
                        title='Shop totes'
                    />

                    {/* Second Column - Row 2 */}
                    <Card
                        backgroundImage='/images/new/merch/cove-sticker-banner.png'
                        title='Shop stickers'
                        textColor='text-black'
                    />
                </div>
            </div>
            <div className='flex justify-center pb-12'>
                <Button>Shop merch</Button>
            </div>
        </div>
    );
};

export default Products;
