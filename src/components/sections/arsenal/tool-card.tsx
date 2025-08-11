'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ToolCardProps {
  icon?: string | React.ReactNode
  image?: string
  title: string
  description: string
  tag?: string
  className?: string
}

export function ToolCard({ icon, image, title, description, tag = "INCLUÍDO", className }: ToolCardProps) {
  return (
    <motion.div
      className={cn(
        "relative group h-full",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Card background with gradient border */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/5 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
      
      <div className="relative h-full bg-black/80 border border-primary/30 rounded-lg p-6 backdrop-blur-sm group-hover:border-primary/60 transition-all duration-300 overflow-hidden">
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content - Vertical centered layout */}
        <div className="relative z-10 flex flex-col items-center text-center h-full">
          {/* Logo Container */}
          <div className="mb-6 p-4">
            {image ? (
              <motion.div 
                className="relative w-40 h-40 mx-auto"
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 180
                }}
                transition={{ 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Logo background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Logo */}
                <div className="relative w-full h-full" style={{ transform: 'rotateY(0deg)' }}>
                  <Image
                    src={image}
                    alt={title}
                    width={160}
                    height={160}
                    className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                    style={{
                      filter: 'drop-shadow(0 0 30px rgba(0, 255, 0, 0.5))',
                    }}
                  />
                </div>
                
                {/* Hover particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-ping" />
                  <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                </div>
              </motion.div>
            ) : (
              <div className="text-7xl">
                {typeof icon === 'string' ? icon : icon}
              </div>
            )}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-primary">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed flex-grow px-4">
            {description}
          </p>
          
          {/* Tag */}
          <motion.div
            className="mt-4 inline-flex items-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black text-xs font-bold rounded uppercase tracking-wider">
              {tag}
            </span>
          </motion.div>
        </div>
        
        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
          <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-primary transform rotate-45 translate-x-8 -translate-y-8" />
        </div>
        
        {/* Scanline effect on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="scanlines" />
        </div>
      </div>
    </motion.div>
  )
}