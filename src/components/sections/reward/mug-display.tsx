'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface MugDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  username?: string
}

const MugDisplay = React.forwardRef<HTMLDivElement, MugDisplayProps>(
  ({ username = 'SpyHacker', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative w-full max-w-sm mx-auto', className)}
        {...props}
      >
        {/* Glow background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        </div>
        
        {/* 3D Container */}
        <motion.div
          className="relative z-10"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Mug mockup container */}
          <motion.div
            className="relative w-64 h-80 mx-auto"
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            {/* Mug base shape */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-2xl transform-gpu"
              style={{
                boxShadow: `
                  inset 0 0 20px rgba(0, 255, 0, 0.1),
                  0 0 40px rgba(0, 255, 0, 0.3),
                  0 0 60px rgba(0, 255, 0, 0.2)
                `,
              }}
            >
              {/* BlackSider Logo */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="text-4xl font-bold text-primary text-glow-strong tracking-wider">
                  BLACK
                </div>
                <div className="text-4xl font-bold text-primary text-glow-strong tracking-wider -mt-2">
                  SIDER
                </div>
              </div>
              
              {/* Username */}
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
                <div className="text-sm text-primary/80 font-mono tracking-wider">
                  @{username}
                </div>
              </div>
              
              {/* Metallic shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl"
                style={{
                  transform: 'translateX(-100%)',
                  animation: 'shine 3s ease-in-out infinite',
                }}
              />
            </div>
            
            {/* Handle */}
            <div className="absolute right-0 top-1/3 w-16 h-24">
              <div className="absolute inset-0 border-4 border-gray-800 rounded-r-3xl"
                style={{
                  borderLeft: 'none',
                  boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
                }}
              />
            </div>
          </motion.div>
          
          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [-20, 20],
                  x: [-10, 10],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Premium badge */}
        <motion.div
          className="absolute top-0 right-0 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black px-3 py-1 rounded-bl-lg font-bold text-xs uppercase tracking-wider"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          Edição Limitada
        </motion.div>
        
        {/* Holographic effect overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="h-full w-full bg-gradient-to-br from-purple-500 via-transparent to-cyan-500 mix-blend-color-dodge" />
        </div>
        
        <style jsx>{`
          @keyframes shine {
            0%, 100% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    )
  }
)
MugDisplay.displayName = 'MugDisplay'

export { MugDisplay }