import * as React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(
    (
        {
            className,
            variant = 'default',
            size = 'default',
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? 'span' : 'button';

        const variants = {
            default:
                'bg-white text-black hover:bg-gray-100 border border-transparent hover:border-gray-400 transition-all',
            destructive:
                'bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-transparent hover:border-red-600',
            outline:
                'border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-400',
            secondary:
                'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent hover:border-gray-400',
            ghost: 'hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-gray-300',
            link: 'text-primary underline-offset-4 hover:underline border border-transparent',
        };

        const sizes = {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10',
        };

        return (
            <Comp
                className={cn(
                    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button };
