//create a static hero image component with hover effect
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {cn} from '../../lib/utils';
import {Button} from './button';

const HeroImage = ({className}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn(
                'relative w-full h-64 md:h-150 flex items-center justify-center text-white overflow-hidden',
                className
            )}
            style={{
                background: 'linear-gradient(135deg, #19191a, #373737)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={
                    isHovered
                        ? '/images/LaptopStaticTiltedRender.png'
                        : '/images/LaptopStaticRender.png'
                }
                alt='Write in Peace laptop'
                className='absolute inset-0 h-full object-cover transition-opacity duration-300'
                onError={(e) => {
                    console.error('Failed to load image:', e.target.src);
                    e.target.style.display = 'none';
                }}
            />
            {/* Spacer to push text to the right */}
            <div className='w-1/2'></div>
            <div className='relative text-center z-10 rounded-md p-20 w-1/2'>
                <h1 className='text-3xl md:text-8xl font-bold'>Cove.</h1>
                <p className='mt-2 text-lg md:text-2xl'>
                    Write in Peace: An app for writers, by writers
                </p>
                <div className='flex justify-center p-12'>
                    <Link to='/write-in-peace'>
                        <Button variant='secondary' className='mr-4'>
                            Read more
                        </Button>
                    </Link>
                    <Link to='/write-in-peace#pricing'>
                        <Button>Download the app</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default HeroImage;
