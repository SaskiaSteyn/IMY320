//create a static hero image component
import { cn } from '../../lib/utils';

const HeroImagePP = ({ className }) => {
    return (
        <div
            className={cn(
                'relative w-full h-64 md:h-150 flex items-center justify-center text-black overflow-hidden',
                className
            )}
            style={{
                background: 'linear-gradient(135deg, #19191a, #373737)',
            }}
        >
            <img
                src='/images/new/Product-page-banner.png'
                alt='Write in Peace laptop'
                className='absolute inset-0 w-full h-full object-cover'
                onError={(e) => {
                    console.error('Failed to load image:', e.target.src);
                    e.target.style.display = 'none';
                }}
            />
            {/* Spacer to push text to the right */}
            <div className='w-1/2'></div>
            <div className='relative text-center z-10 rounded-md p-20 w-1/2'>
                <h1 className='text-3xl md:text-8xl font-bold'>Start here</h1>
                <p className='mt-2 text-lg md:text-2xl'>
                    Get the app today and write in peace, wherever you are.
                </p>
            </div>
        </div>
    );
};
export default HeroImagePP;
