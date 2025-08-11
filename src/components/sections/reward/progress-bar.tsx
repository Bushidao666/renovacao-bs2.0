'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number
  total: number
  label?: string
  showCount?: boolean
  variant?: 'default' | 'gradient' | 'pulse'
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    current, 
    total, 
    label = 'Restantes', 
    showCount = true, 
    variant = 'gradient',
    className, 
    ...props 
  }, ref) => {
    const percentage = ((total - current) / total) * 100
    
    return (
      <div
        ref={ref}
        className={cn('w-full max-w-md mx-auto', className)}
        {...props}
      >
        {/* Label and count */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm md:text-base text-primary/80 uppercase tracking-wider">
            {label}:
          </span>
          {showCount && (
            <span className="text-lg md:text-xl font-bold text-primary tabular-nums">
              {current} / {total}
            </span>
          )}
        </div>
        
        {/* Progress bar container */}
        <div className="relative h-6 md:h-8 bg-black border-2 border-primary/30 rounded-full overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>
          
          {/* Progress fill */}
          <motion.div
            className="absolute inset-y-0 left-0 flex items-center justify-end"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          >
            {variant === 'default' && (
              <div className="h-full w-full bg-primary" />
            )}
            
            {variant === 'gradient' && (
              <div className="h-full w-full bg-gradient-to-r from-green-600 via-primary to-green-400 animate-gradient" />
            )}
            
            {variant === 'pulse' && (
              <div className="h-full w-full bg-primary pulse-green" />
            )}
            
            {/* Glow effect at the end */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[120%] bg-primary blur-md" />
          </motion.div>
          
          {/* Animated stripes overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(0, 255, 0, 0.1) 10px,
                rgba(0, 255, 0, 0.1) 20px
              )`,
              animation: 'slide 1s linear infinite',
            }}
          />
          
          {/* Inner highlight */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
        </div>
        
        {/* Warning text when low */}
        {current <= 30 && (
          <motion.p
            className="text-xs md:text-sm text-red-500 text-center mt-2 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span className="text-glow-red">⚠ Últimas unidades disponíveis!</span>
          </motion.p>
        )}
        
        <style jsx>{`
          @keyframes slide {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 40px 0;
            }
          }
        `}</style>
      </div>
    )
  }
)
ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }