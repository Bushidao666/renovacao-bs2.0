'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Calendar, Star } from 'lucide-react'

interface BonusCardProps {
  number: number
  title: string
  description: string
  highlight?: string
  className?: string
}

export function BonusCard({ number, title, description, highlight, className }: BonusCardProps) {
  return (
    <motion.div
      className={cn(
        "relative group",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-primary/20 to-yellow-600/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
      
      <div className="relative bg-black/90 border-2 border-yellow-600/50 rounded-lg p-8 backdrop-blur-sm group-hover:border-yellow-600/80 transition-all duration-300 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-transparent to-primary" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Bonus number badge */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-full flex items-center justify-center"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Star className="w-6 h-6 text-black" />
            </motion.div>
            <span className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
              Bônus {number}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-300 leading-relaxed mb-4">
            {description}
          </p>
          
          {/* Highlight */}
          {highlight && (
            <motion.div
              className="inline-flex items-center gap-2 text-primary font-semibold"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Calendar className="w-4 h-4" />
              <span>{highlight}</span>
            </motion.div>
          )}
        </div>
        
        {/* Premium corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-yellow-600/20 to-transparent" />
        </div>
        
        {/* Bottom accent line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  )
}