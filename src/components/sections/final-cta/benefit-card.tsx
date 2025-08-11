'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BenefitCardProps {
  title: string
  highlight?: string
  className?: string
  delay?: number
}

export function BenefitCard({ title, highlight, className, delay = 0 }: BenefitCardProps) {
  return (
    <motion.div
      className={cn(
        "relative group",
        className
      )}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20 backdrop-blur-sm group-hover:border-primary/40 transition-all duration-300">
        {/* Check icon */}
        <motion.div
          className="relative flex-shrink-0"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-primary/20 blur-xl" />
          <div className="relative w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-green-400 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-black" strokeWidth={3} />
          </div>
        </motion.div>
        
        {/* Content */}
        <div className="flex-grow">
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {title}
            {highlight && (
              <span className="text-primary font-bold ml-1">{highlight}</span>
            )}
          </p>
        </div>
        
        {/* Hover accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
      </div>
    </motion.div>
  )
}