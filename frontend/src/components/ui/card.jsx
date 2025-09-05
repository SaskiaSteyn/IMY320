import * as React from 'react';
import { cn } from '../../lib/utils';

const Card = React.forwardRef(
    ({ className, backgroundImage, title, text, ...props }, ref) => (
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
                {text && <p className='text-sm text-gray-200'>{text}</p>}
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

export {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
};
