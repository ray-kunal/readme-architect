import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none rounded-md',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary':
              variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary':
              variant === 'secondary',
            'hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent':
              variant === 'ghost',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive':
              variant === 'danger',
          },
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
