'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { TrendingDown } from 'lucide-react'
import { useInstallments } from '@/hooks/use-installments'

export function PriceDisplay() {
  const installments = useInstallments()
  
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-primary/20 blur-3xl" />
      
      <div className="relative bg-black/60 border-2 border-primary/30 rounded-2xl p-8 lg:p-12 text-center backdrop-blur-sm">
        {/* Founder badge */}
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg">
            Condição Especial Fundador
          </div>
        </motion.div>
        
        {/* Price comparison */}
        <div className="mt-8 mb-6">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-2xl text-gray-500 line-through">R$ 3.000</span>
            <motion.div
              animate={{ rotate: 180 }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <TrendingDown className="w-6 h-6 text-primary" />
            </motion.div>
          </div>
          
          <p className="text-sm text-gray-400 mb-6">
            Preço para novos membros do Kit BlackSider Plus
          </p>
        </div>
        
        {/* Main price */}
        <div className="mb-6">
          <p className="text-lg text-primary mb-2 font-semibold">POR APENAS:</p>
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h3 className="text-6xl lg:text-7xl font-bold text-white">
              R$ 1.497
            </h3>
            {/* Price glow */}
            <div className="absolute inset-0 text-6xl lg:text-7xl font-bold text-primary blur-2xl opacity-50">
              R$ 1.497
            </div>
          </motion.div>
        </div>
        
        {/* Installments */}
        <motion.p
          className="text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ou em <span className="text-primary font-bold">{installments.count}x de R$ {installments.value.toFixed(2).replace('.', ',')}</span>
        </motion.p>
        
        {/* Savings badge */}
        <motion.div
          className="mt-6 inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-lg px-4 py-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-primary font-semibold">
            Você economiza R$ 1.503
          </span>
        </motion.div>
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-2xl" />
      </div>
    </motion.div>
  )
}