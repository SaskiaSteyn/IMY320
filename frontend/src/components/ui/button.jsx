import * as React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
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
            default: 'bg-[#e79210] text-black hover:bg-gray-100',
            destructive:
                'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline:
                'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary border hover:text-black hover:bg-gray-100',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline',
            cart: 'bg-[#e79210] text-black hover:opacity-90 hover:scale-105 active:scale-95 hover:-translate-y-1',
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
                    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group transform',
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            >
                <span className='flex items-center'>
                    {variant === 'cart' && (
                        <FaShoppingCart className='mr-2 text-sm transition-all duration-300 group-hover:rotate-12' />
                    )}
                    {props.children}
                </span>
            </Comp>
        );
    }
);
Button.displayName = 'Button';

export { Button };
