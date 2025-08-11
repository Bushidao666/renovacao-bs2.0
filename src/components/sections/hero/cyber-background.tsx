'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CyberBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  showGrid?: boolean
  showScanlines?: boolean
  showParticles?: boolean
}

const CyberBackground = React.forwardRef<HTMLDivElement, CyberBackgroundProps>(
  ({ showGrid = true, showScanlines = true, showParticles = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('fixed inset-0 overflow-hidden', className)}
        {...props}
      >
        {/* Base dark background */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Cyber grid */}
        {showGrid && (
          <div className="absolute inset-0 cyber-grid opacity-30" />
        )}
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Scanlines */}
        {showScanlines && (
          <div className="absolute inset-0 scanlines pointer-events-none" />
        )}
        
        {/* Floating particles */}
        {showParticles && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        )}
        
        {/* Corner vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
      </div>
    )
  }
)
CyberBackground.displayName = 'CyberBackground'

export { CyberBackground }