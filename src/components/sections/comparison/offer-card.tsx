'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check, X, Crown, Lock } from 'lucide-react'

interface OfferItem {
  text: string
  included: boolean
  highlight?: boolean
}

interface OfferCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  variant: 'default' | 'premium'
  items: OfferItem[]
  badge?: string
  dateRange?: string
}

const OfferCard = React.forwardRef<HTMLDivElement, OfferCardProps>(
  ({ title, subtitle, variant, items, badge, dateRange, className, children, ...props }, ref) => {
    const isPremium = variant === 'premium'
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative h-full overflow-hidden rounded-xl',
          className
        )}
        whileHover={{ scale: isPremium ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {/* Background */}
        <div className={cn(
          'absolute inset-0',
          isPremium 
            ? 'bg-gradient-to-br from-yellow-900/20 via-black to-yellow-900/20' 
            : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        )} />
        
        {/* Border glow for premium */}
        {isPremium && (
          <>
            <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-400 animate-gradient">
              <div className="h-full w-full rounded-xl bg-black" />
            </div>
            
            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400/60 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [-10, 10],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Content */}
        <div className={cn(
          'relative z-10 p-4 sm:p-6 md:p-8 h-full flex flex-col',
          !isPremium && 'border border-gray-700 rounded-xl'
        )}>
          {/* Badge */}
          {badge && (
            <motion.div
              className={cn(
                'absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
                isPremium
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                  : 'bg-gray-700 text-gray-400'
              )}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {isPremium && <Crown className="inline-block w-3 h-3 mr-1" />}
              {badge}
            </motion.div>
          )}
          
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h3 className={cn(
              'text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2',
              isPremium ? 'text-yellow-400' : 'text-gray-400'
            )}>
              {title}
            </h3>
            {subtitle && (
              <p className={cn(
                'text-sm',
                isPremium ? 'text-yellow-400/70' : 'text-gray-500'
              )}>
                {subtitle}
              </p>
            )}
            {dateRange && (
              <p className={cn(
                'text-xs mt-2 font-medium',
                isPremium ? 'text-yellow-400/60' : 'text-gray-600'
              )}>
                {dateRange}
              </p>
            )}
          </div>
          
          {/* Items list */}
          <div className="space-y-4 flex-1">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.included ? (
                  <Check className={cn(
                    'w-5 h-5 flex-shrink-0 mt-0.5',
                    isPremium ? 'text-green-400' : 'text-green-600'
                  )} />
                ) : (
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <span className={cn(
                  'text-sm',
                  item.included 
                    ? (isPremium ? 'text-white' : 'text-gray-300')
                    : 'text-gray-500 line-through',
                  item.highlight && isPremium && 'text-yellow-400 font-semibold'
                )}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
          
          {/* Children (for price display) */}
          <div className="mt-6 sm:mt-8">
            {children}
          </div>
        </div>
        
        {/* Corner decoration for premium */}
        {isPremium && (
          <>
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 transform rotate-45" />
              <Lock className="absolute top-2 right-2 w-4 h-4 text-black" />
            </div>
          </>
        )}
      </motion.div>
    )
  }
)
OfferCard.displayName = 'OfferCard'

export { OfferCard }