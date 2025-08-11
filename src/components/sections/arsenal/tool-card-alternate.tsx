'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

interface ToolCardAlternateProps {
  image: string
  title: string
  description: string
  tag?: string
  reverse?: boolean
  index: number
  className?: string
}

export function ToolCardAlternate({ 
  image, 
  title, 
  description, 
  tag = "INCLUÍDO", 
  reverse = false,
  index,
  className 
}: ToolCardAlternateProps) {
  const slideDirection = reverse ? 50 : -50
  
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
        "relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center p-4 sm:p-6 md:p-8 lg:p-12",
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
          {/* Tool number */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
          
          {/* Title */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            {description}
          </p>
          
          {/* Features/Benefits */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-400">Ferramenta exclusiva do BlackSider</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-400">Atualizada constantemente</span>
            </div>
          </div>
          
          {/* Tag */}
          <motion.div
            className="inline-flex items-center gap-2"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black text-sm font-bold rounded uppercase tracking-wider">
              {tag}
            </span>
          </motion.div>
        </motion.div>
        
        {/* Logo/Image */}
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
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto aspect-square">
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl scale-110 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Main container with rotating border and image */}
            <motion.div
              className="relative w-full h-full"
              whileHover={{ 
                scale: 1.05,
                rotateY: 10,
                rotateX: -10
              }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Rotating border */}
              <motion.div
                className="absolute inset-0 rounded-full p-[2px]"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, #00ff00, transparent)',
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Image container */}
              <div className="absolute inset-[2px] rounded-full overflow-hidden bg-black">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  style={{
                    filter: 'brightness(1.1) saturate(1.2)',
                  }}
                />
                
                {/* Overlay gradient for better integration */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />
              </div>
              
              {/* Hover particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full blur-sm"
                    style={{
                      top: `${50 + 40 * Math.cos(i * Math.PI / 3)}%`,
                      left: `${50 + 40 * Math.sin(i * Math.PI / 3)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Section divider */}
      {index < 5 && (
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />
      )}
    </motion.div>
  )
}