'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { BenefitCard } from './benefit-card'
import { PriceDisplay } from './price-display'
import { GlitchText } from '@/components/ui/glitch-text'
import { CheckoutButtonWrapper as CheckoutButton } from '@/components/ui/checkout-button-wrapper'
import { CountdownTimer } from '@/components/ui/countdown-timer'
import { 
  AlertTriangle,
  Zap,
  Lock,
  ChevronRight
} from 'lucide-react'

const benefits = [
  {
    title: 'Acesso ao Fórum BlackSider 2.0 por',
    highlight: '1 ano completo'
  },
  {
    title: 'O Arsenal Completo:',
    highlight: 'Protocolo Fantasma, Hidra, Hyper, Radar, CyberVault e SiderTools'
  },
  {
    title: 'Bônus:',
    highlight: 'Semana BlackSider + Frame de Fundador'
  },
  {
    title: 'Todas as',
    highlight: 'futuras atualizações sem custo extra'
  }
]

export function FinalCTASection() {
  // Target date for countdown
  const targetDate = new Date('2024-08-18T23:59:59')
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  }
  
  return (
    <section id="final-cta" className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden bg-black">
      {/* Dramatic background */}
      <div className="absolute inset-0">
        {/* Red alert gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-black to-black" />
        
        {/* Animated scan lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 0, 0, 0.03) 2px,
              rgba(255, 0, 0, 0.03) 4px
            )`,
          }}
          animate={{
            y: [0, 10],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Corner vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>
      
      {/* Falling particles (digital ashes) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: -10,
            }}
            animate={{
              y: ['0vh', '100vh'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <motion.div
        className="relative z-10 container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Urgent headline */}
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-10 md:mb-12">
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <Lock className="w-8 h-8 text-red-500" />
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-wider">
              <GlitchText intensity="strong" className="text-red-500">
                A PORTA FECHA NO DIA 18
              </GlitchText>
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-3 sm:mt-4 text-white">
                A ESCOLHA É SUA
              </span>
            </h2>
          </motion.div>
          
          {/* Countdown Timer - Large and centered */}
          <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
            <div className="max-w-2xl mx-auto">
              <CountdownTimer targetDate={targetDate} />
            </div>
          </motion.div>
          
          {/* Summary section */}
          <motion.div variants={itemVariants} className="mb-8 sm:mb-10 md:mb-12">
            <div className="bg-gradient-to-r from-primary/20 via-black to-primary/20 p-6 sm:p-8 rounded-2xl border border-primary/30">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4 text-center">
                Resumo da sua Condição Especial de Fundador:
              </h3>
              <p className="text-base sm:text-lg text-gray-300 text-center max-w-3xl mx-auto leading-relaxed px-2">
                Você não é novato. Você acreditou no projeto quando era só mato. 
                Por isso, enquanto os novos membros pagarão <span className="text-red-500 font-bold">R$ 2.999</span> pelo 
                Kit BlackSider Plus, você terá acesso a <span className="text-primary font-bold">TUDO</span>, 
                pagando apenas o valor da renovação básica.
              </p>
            </div>
          </motion.div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start mb-12 sm:mb-16">
            {/* Benefits list */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                Sua Renovação de Fundador Inclui:
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <BenefitCard
                    key={index}
                    {...benefit}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Price display */}
            <motion.div variants={itemVariants}>
              <PriceDisplay />
            </motion.div>
          </div>
          
          {/* Final CTA */}
          <motion.div 
            variants={itemVariants} 
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CheckoutButton
                size="lg"
                className="text-base sm:text-lg md:text-xl lg:text-2xl px-6 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8 bg-gradient-to-r from-primary to-green-400 hover:from-green-400 hover:to-primary text-black font-bold uppercase tracking-wider shadow-2xl w-full sm:w-auto"
                trackingEvent="final_cta_checkout_click"
              >
                <Zap className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8" />
                SIM, EU CONTINUO NA ALIANÇA
                <ChevronRight className="ml-2 sm:ml-3 h-6 w-6 sm:h-8 sm:w-8" />
              </CheckoutButton>
            </motion.div>
            
            {/* Security badges */}
            <motion.div 
              className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Pagamento 100% Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Acesso Imediato</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-900/20 to-transparent pointer-events-none" />
    </section>
  )
}