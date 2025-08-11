'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface UpdateCardProps {
  icon: string | React.ReactNode
  title: string
  description: string
  progress?: number
  className?: string
  delay?: number
}

export function UpdateCard({ 
  icon, 
  title, 
  description, 
  progress = Math.random() * 40 + 60, // Random progress between 60-100
  className,
  delay = 0
}: UpdateCardProps) {
  const [showTyping, setShowTyping] = React.useState(false)
  
  React.useEffect(() => {
    const timer = setTimeout(() => setShowTyping(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])
  
  return (
    <motion.div
      className={cn(
        "relative group",
        className
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative bg-black/60 border border-primary/20 rounded-lg p-6 backdrop-blur-sm overflow-hidden">
        {/* Terminal-style header */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-primary/10 flex items-center px-3 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="ml-2 text-xs text-primary/60 font-mono">feature_update.exe</span>
        </div>
        
        {/* Content */}
        <div className="mt-10 flex gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <motion.div
              className="text-4xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay + 0.5
              }}
            >
              {icon}
            </motion.div>
          </div>
          
          {/* Text content */}
          <div className="flex-grow">
            {/* Title with typing effect */}
            <h3 className="text-lg font-bold text-primary mb-2 font-mono">
              {showTyping ? (
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: title.length * 0.05, ease: "linear" }}
                  className="inline-block overflow-hidden whitespace-nowrap"
                >
                  {title}
                </motion.span>
              ) : (
                <span className="opacity-0">{title}</span>
              )}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed">
              {description}
            </p>
            
            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-primary/60 mb-1">
                <span className="font-mono">Loading...</span>
                <span className="font-mono">{Math.round(progress)}%</span>
              </div>
              
              <div className="h-2 bg-black/80 rounded-full overflow-hidden border border-primary/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-green-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ 
                    duration: 2, 
                    delay: delay + 0.5,
                    ease: "easeOut"
                  }}
                >
                  {/* Animated glow */}
                  <motion.div
                    className="h-full w-20 bg-white/30 blur-xl"
                    animate={{
                      x: [-20, 200],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: delay + 2.5,
                      repeatDelay: 3
                    }}
                  />
                </motion.div>
              </div>
            </div>
            
            {/* Status badge */}
            <motion.div 
              className="inline-flex items-center gap-2 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 1 }}
            >
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-xs text-yellow-400 font-mono uppercase">Em desenvolvimento</span>
            </motion.div>
          </div>
        </div>
        
        {/* Matrix rain effect (subtle) */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="matrix-rain" />
        </div>
      </div>
    </motion.div>
  )
}