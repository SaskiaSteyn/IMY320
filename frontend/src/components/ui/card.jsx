import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './button';

const Card = React.forwardRef(
    (
        {
            className,
            backgroundImage,
            title,
            text,
            link,
            buttonText = 'Learn More',
            ...props
        },
        ref
    ) => (
        <div
            ref={ref}
            className={cn('shadow-sm relative overflow-hidden', className)}
            style={{
                backgroundColor: '#19191a',
                border: '1px solid #525252',
                borderRadius: '5px',
                backgroundImage: backgroundImage
                    ? `url(${backgroundImage})`
                    : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            {...props}
        >
            {/* Content */}
            <div className='relative z-10 p-6'>
                {title && (
                    <h3 className='text-2xl font-semibold leading-none tracking-tight text-white mb-4'>
                        {title}
                    </h3>
                )}
                {text && (
                    <div className='text-sm text-gray-200 space-y-3'>
                        {Array.isArray(text) ? (
                            text.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))
                        ) : (
                            <p>{text}</p>
                        )}
                    </div>
                )}
                {link && (
                    <div className='mt-4'>
                        <Button onClick={() => (window.location.href = link)}>
                            {buttonText}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
    />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            'text-2xl font-semibold leading-none tracking-tight',
            className
        )}
        {...props}
    />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props}
    />
));
CardFooter.displayName = 'CardFooter';

const ImageCard = React.forwardRef(
    (
        {
            className,
            image,
            imageAlt,
            title,
            text,
            link,
            buttonText = 'Learn More',
            ...props
        },
        ref
    ) => (
        <div
            ref={ref}
            className={cn(
                'shadow-sm relative overflow-hidden flex flex-col h-full',
                className
            )}
            style={{
                backgroundColor: '#19191a',
                border: '1px solid #525252',
                borderRadius: '5px',
            }}
            {...props}
        >
            {/* Image Section - 50% */}
            {image && (
                <div className='w-full flex-1'>
                    <img
                        src={image}
                        alt={imageAlt || title || 'Card image'}
                        className='w-full h-full object-cover'
                    />
                </div>
            )}

            {/* Text Content Section - 50% */}
            <div className='p-6 flex-1 flex flex-col justify-start'>
                {title && (
                    <h3 className='text-2xl font-semibold leading-none tracking-tight text-white mb-4'>
                        {title}
                    </h3>
                )}
                {text && (
                    <div className='text-sm text-gray-200 space-y-3'>
                        {Array.isArray(text) ? (
                            text.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))
                        ) : (
                            <p>{text}</p>
                        )}
                    </div>
                )}
                {link && (
                    <div className='mt-4'>
                        <Button onClick={() => (window.location.href = link)}>
                            {buttonText}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
);
ImageCard.displayName = 'ImageCard';

export {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    ImageCard,
};
