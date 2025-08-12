'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { TrendingDown } from 'lucide-react'
import { useInstallments } from '@/hooks/use-installments'

interface PriceDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  originalPrice?: number
  currentPrice: number
  currency?: string
  variant?: 'default' | 'premium'
  showSavings?: boolean
}

const PriceDisplay = React.forwardRef<HTMLDivElement, PriceDisplayProps>(
  ({ 
    originalPrice, 
    currentPrice, 
    currency = 'R$',
    variant = 'default',
    showSavings = true,
    className, 
    ...props 
  }, ref) => {
    const isPremium = variant === 'premium'
    const installments = useInstallments()
    const savings = originalPrice ? originalPrice - currentPrice : 0
    const savingsPercentage = originalPrice ? Math.round((savings / originalPrice) * 100) : 0
    
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price)
    }
    
    return (
      <div
        ref={ref}
        className={cn('text-center', className)}
        {...props}
      >
        {/* Original price (striked) */}
        {originalPrice && originalPrice !== currentPrice && (
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl md:text-3xl text-gray-500 line-through">
              {currency} {formatPrice(originalPrice)}
            </span>
          </motion.div>
        )}
        
        {/* Current price */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={cn(
            'text-4xl md:text-5xl font-bold',
            isPremium ? 'text-yellow-400' : 'text-white'
          )}>
            <span className="text-2xl md:text-3xl align-top">{currency}</span>
            <span className={isPremium ? 'text-glow' : ''}>
              {formatPrice(currentPrice)}
            </span>
          </div>
          
          {/* Glow effect for premium */}
          {isPremium && (
            <div className="absolute inset-0 -z-10 blur-2xl opacity-30">
              <div className="h-full w-full bg-yellow-400" />
            </div>
          )}
        </motion.div>
        
        {/* Installments */}
        {isPremium && (
          <motion.p
            className="text-sm md:text-base text-gray-400 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            ou em {installments.count}x de{' '}
            <span className={cn(
              'font-semibold',
              isPremium ? 'text-yellow-400' : 'text-white'
            )}>
              {currency} {installments.value.toFixed(2).replace('.', ',')}
            </span>
          </motion.p>
        )}
        
        {/* Savings badge */}
        {showSavings && savings > 0 && isPremium && (
          <motion.div
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
          >
            <TrendingDown className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-400">
              Economize {currency} 1.503 ({savingsPercentage}% OFF)
            </span>
          </motion.div>
        )}
      </div>
    )
  }
)
PriceDisplay.displayName = 'PriceDisplay'

export { PriceDisplay }