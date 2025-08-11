'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface GlitchTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  intensity?: 'light' | 'medium' | 'strong'
  color?: 'green' | 'red' | 'white'
}

const GlitchText = React.forwardRef<HTMLSpanElement, GlitchTextProps>(
  ({ children, className, intensity = 'medium', color = 'green', ...props }, ref) => {
    const [isGlitching, setIsGlitching] = React.useState(false)
    
    React.useEffect(() => {
      const interval = setInterval(() => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }, 3000)
      
      return () => clearInterval(interval)
    }, [])
    
    const colorClasses = {
      green: 'text-primary',
      red: 'text-red-500',
      white: 'text-white',
    }
    
    const glowClasses = {
      green: 'text-glow',
      red: 'text-glow-red',
      white: '',
    }
    
    const intensityClasses = {
      light: 'data-[glitch=true]:animate-[glitch_0.2s_ease-in-out]',
      medium: 'data-[glitch=true]:animate-[glitch_0.3s_ease-in-out]',
      strong: 'data-[glitch=true]:animate-[glitch_0.4s_ease-in-out]',
    }
    
    return (
      <span
        ref={ref}
        className={cn(
          'relative inline-block',
          colorClasses[color],
          glowClasses[color],
          intensityClasses[intensity],
          className
        )}
        data-glitch={isGlitching}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        
        {/* Glitch layers */}
        {isGlitching && (
          <>
            <span
              className="absolute inset-0 opacity-80"
              style={{
                textShadow: '-2px 0 #ff0000',
                animation: 'glitch-1 0.3s ease-in-out',
                clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)',
              }}
            >
              {children}
            </span>
            <span
              className="absolute inset-0 opacity-80"
              style={{
                textShadow: '2px 0 #00ffff',
                animation: 'glitch-2 0.3s ease-in-out',
                clipPath: 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)',
              }}
            >
              {children}
            </span>
          </>
        )}
      </span>
    )
  }
)
GlitchText.displayName = 'GlitchText'

export { GlitchText }