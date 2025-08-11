'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const neonButtonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden group',
  {
    variants: {
      variant: {
        default: 'bg-primary text-black hover:bg-primary/90',
        outline: 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-black',
        ghost: 'bg-transparent text-primary hover:bg-primary/10',
      },
      size: {
        default: 'h-12 px-8 py-3 text-sm',
        sm: 'h-10 px-6 py-2 text-xs',
        lg: 'h-14 px-10 py-4 text-base',
        xl: 'h-16 px-12 py-5 text-lg',
      },
      glow: {
        true: 'neon-border-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      glow: true,
    },
  }
)

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButtonVariants> {
  asChild?: boolean
  pulse?: boolean
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant, size, glow, pulse = false, children, ...props }, ref) => {
    return (
      <motion.button
        className={cn(
          neonButtonVariants({ variant, size, glow, className }),
          pulse && 'pulse-green'
        )}
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {/* Background glow effect */}
        <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        
        {/* Corner decorations */}
        <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary" />
        <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary" />
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary" />
        
        {/* Button content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        
        {/* Hover line animation */}
        <motion.span
          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    )
  }
)
NeonButton.displayName = 'NeonButton'

export { NeonButton, neonButtonVariants }