'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CyberCardProps {
  children?: React.ReactNode
  className?: string
  variant?: 'default' | 'holographic' | 'premium'
  glowColor?: 'green' | 'gold' | 'red'
}

const CyberCard = React.forwardRef<HTMLDivElement, CyberCardProps>(
  ({ children, className, variant = 'default', glowColor = 'green' }, ref) => {
    const glowColors = {
      green: 'rgba(0, 255, 0, 0.5)',
      gold: 'rgba(255, 215, 0, 0.5)',
      red: 'rgba(255, 0, 0, 0.5)',
    }
    
    const borderColors = {
      green: 'rgba(0, 255, 0, 0.3)',
      gold: 'rgba(255, 215, 0, 0.3)',
      red: 'rgba(255, 0, 0, 0.3)',
    }
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-lg',
          className
        )}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Holographic effect for premium variant */}
        {variant === 'holographic' && (
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'linear-gradient(45deg, transparent 0%, rgba(255, 0, 255, 0.3) 50%, transparent 100%)',
                'linear-gradient(45deg, transparent 0%, rgba(0, 255, 255, 0.3) 50%, transparent 100%)',
                'linear-gradient(45deg, transparent 0%, rgba(255, 255, 0, 0.3) 50%, transparent 100%)',
                'linear-gradient(45deg, transparent 0%, rgba(255, 0, 255, 0.3) 50%, transparent 100%)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
        
        {/* Premium gradient for premium variant */}
        {variant === 'premium' && (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-transparent to-yellow-900/20" />
        )}
        
        {/* Border with glow */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(to bottom, ${borderColors[glowColor]}, transparent)`,
            padding: '1px',
          }}
        >
          <div className="h-full w-full rounded-lg bg-black" />
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" 
          style={{ borderColor: borderColors[glowColor] }} 
        />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" 
          style={{ borderColor: borderColors[glowColor] }} 
        />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" 
          style={{ borderColor: borderColors[glowColor] }} 
        />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" 
          style={{ borderColor: borderColors[glowColor] }} 
        />
        
        {/* Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 -z-10 blur-2xl opacity-20"
          style={{ backgroundColor: glowColors[glowColor] }}
        />
        
        {/* Scan line animation */}
        <motion.div
          className="absolute left-0 right-0 h-px opacity-50"
          style={{ backgroundColor: glowColors[glowColor] }}
          animate={{
            top: ['0%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
    )
  }
)
CyberCard.displayName = 'CyberCard'

export { CyberCard }