'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Terminal } from 'lucide-react'

interface UpdateCardAlternateProps {
  icon: React.ReactNode
  title: string
  description: string
  progress?: number
  reverse?: boolean
  index: number
  className?: string
}

export function UpdateCardAlternate({ 
  icon, 
  title, 
  description, 
  progress = 75,
  reverse = false,
  index,
  className 
}: UpdateCardAlternateProps) {
  const slideDirection = reverse ? 50 : -50
  const [typingComplete, setTypingComplete] = React.useState(false)
  
  React.useEffect(() => {
    const timer = setTimeout(() => setTypingComplete(true), 1500 + index * 200)
    return () => clearTimeout(timer)
  }, [index])
  
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden",
        className
      )}
      initial={{ opacity: 0, x: slideDirection }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Content Container */}
      <div className={cn(
        "relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center",
        reverse && "lg:grid-flow-dense"
      )}>
        
        {/* Text Content */}
        <motion.div 
          className={cn(
            "space-y-6",
            reverse && "md:col-start-2"
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Feature number and status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                <span className="text-primary font-mono text-sm font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent max-w-[100px]" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs text-yellow-400 font-mono uppercase">Em desenvolvimento</span>
            </div>
          </div>
          
          {/* Title with typing effect */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono">
            <span className="text-primary">$</span> {title}
            {!typingComplete && (
              <motion.span
                className="inline-block w-[2px] h-6 bg-primary ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </h3>
          
          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            {description}
          </p>
          
          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-mono">progress.exe</span>
              <span className="font-mono">{progress}%</span>
            </div>
            
            <div className="relative h-2 bg-black/80 rounded-full overflow-hidden border border-primary/20">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-green-400"
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 2, 
                  ease: "easeOut",
                  delay: 0.5
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 2,
                    repeatDelay: 3
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  }}
                />
              </motion.div>
            </div>
            
            {/* ETA */}
            <p className="text-xs text-gray-500 font-mono">
              ETA: Q{Math.ceil((100 - progress) / 10)} 2024
            </p>
          </div>
        </motion.div>
        
        {/* Visual Terminal/Icon */}
        <motion.div 
          className={cn(
            "relative group",
            !reverse && "md:col-start-2"
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="relative w-full max-w-md mx-auto">
            {/* Terminal Container */}
            <div className="relative bg-black/90 border border-primary/30 rounded-lg overflow-hidden shadow-xl sm:shadow-2xl group-hover:border-primary/60 transition-all duration-300">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border-b border-primary/20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-grow text-center">
                  <span className="text-xs text-primary/60 font-mono">feature_preview.sh</span>
                </div>
                <Terminal className="w-4 h-4 text-primary/40" />
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 sm:p-8 lg:p-12">
                {/* Matrix rain background */}
                <div className="absolute inset-0 opacity-10">
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0, 255, 0, 0.1) 2px,
                        rgba(0, 255, 0, 0.1) 4px
                      )`,
                    }}
                    animate={{
                      y: [0, 20],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
                
                {/* Icon Display */}
                <motion.div
                  className="relative z-10 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="relative">
                    {/* Icon glow */}
                    <div className="absolute inset-0 blur-2xl opacity-50">
                      {React.cloneElement(icon as React.ReactElement<{className?: string}>, {
                        className: "w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-primary"
                      })}
                    </div>
                    
                    {/* Main icon */}
                    {React.cloneElement(icon as React.ReactElement<{className?: string}>, {
                      className: "w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-primary relative z-10"
                    })}
                    
                    {/* Scanning effect */}
                    <motion.div
                      className="absolute inset-0 border-2 border-primary/30 rounded-lg"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
                
                {/* Code preview */}
                <div className="mt-8 space-y-1 font-mono text-xs text-primary/60">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <span className="text-green-400">$</span> initializing {title.toLowerCase().replace(/ /g, '_')}...
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                  >
                    <span className="text-green-400">✓</span> modules loaded
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 + index * 0.1 }}
                  >
                    <span className="text-yellow-400">→</span> status: {progress}% complete
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity">
              <div className="h-full w-full bg-primary/50" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Section divider */}
      {index < 4 && (
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent mt-16"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />
      )}
    </motion.div>
  )
}