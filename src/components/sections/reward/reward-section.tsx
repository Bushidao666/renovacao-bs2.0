'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { GlitchText } from '@/components/ui/glitch-text'
import { CheckoutButtonWrapper as CheckoutButton } from '@/components/ui/checkout-button-wrapper'
import { ProgressBar } from './progress-bar'
import { Trophy, Zap } from 'lucide-react'

// Lazy load do componente 3D pesado
const MugDisplay3D = dynamic(
  () => import('./mug-display-3d').then(mod => ({ default: mod.MugDisplay3D })),
  { 
    loading: () => (
      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Carregando modelo 3D...</p>
        </div>
      </div>
    ),
    ssr: false 
  }
)

export function RewardSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  }
  
  // Contador em tempo real a partir da Edge Function (Supabase)
  const [counts, setCounts] = React.useState<{
    remaining: number
    purchased: number
    total: number
  } | null>(null)

  React.useEffect(() => {
    let isActive = true
    const fetchCounts = async () => {
      try {
        // Proxy local público (sem headers de auth no client)
        const res = await fetch(`/api/founder-members`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
          mode: 'cors',
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!isActive) return
        setCounts({
          remaining: typeof data.remaining === 'number' ? data.remaining : 0,
          purchased: typeof data.purchased === 'number' ? data.purchased : 0,
          total: typeof data.total === 'number' ? data.total : 100,
        })
      } catch {
        // Falha silenciosa: mantém fallback estático
      }
    }

    fetchCounts()
    const interval = setInterval(fetchCounts, 20000)
    return () => {
      isActive = false
      clearInterval(interval)
    }
  }, [])
  
  return (
    <section id="reward" className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-x-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      
      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider">
              <GlitchText intensity="medium" className="text-gold">
                OS 100 PRIMEIROS SERÃO RECOMPENSADOS
              </GlitchText>
            </h2>
          </motion.div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left: Mug Display */}
            <motion.div variants={itemVariants} className="w-full max-w-md md:max-w-full mx-auto order-2 md:order-1">
              <MugDisplay3D username="SpyHacker" />
            </motion.div>
            
            {/* Right: Info and CTA */}
            <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8 order-1 md:order-2">
              {/* Text content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-yellow-400">
                  <Trophy className="w-6 h-6" />
                  <span className="text-sm uppercase tracking-wider font-semibold">
                    Prêmio Exclusivo de Fundador
                  </span>
                </div>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                  Como agradecimento pessoal aos <span className="text-yellow-400 font-bold">100 primeiros Fundadores</span> que 
                  renovarem na segunda-feira, a partir das 8h, enviarei esta caneca de colecionador 
                  para a sua casa.
                </p>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                  Ela não está à venda. É um presente. 
                  <span className="text-primary text-glow ml-1">Um símbolo da nossa Aliança.</span>
                </p>
              </div>
              
              {/* Progress Bar */}
              <div className="py-4 sm:py-6">
                <ProgressBar 
                  current={counts?.remaining ?? 23} 
                  total={counts?.total ?? 100} 
                  label="Canecas de Fundador Restantes"
                  variant="gradient"
                />
              </div>
              
              {/* CTA Button */}
              <div className="text-center md:text-left">
                <CheckoutButton
                  size="lg"
                  variant="default"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black w-full sm:w-auto"
                  trackingEvent="reward_checkout_click"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  QUERO MINHA CANECA E RENOVAR MEU ACESSO
                </CheckoutButton>
                
                <p className="text-xs text-gray-500 mt-2 sm:mt-3">
                  * Limitado aos 100 primeiros. Envio incluso.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}