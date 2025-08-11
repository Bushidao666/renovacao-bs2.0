'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { GlitchText } from '@/components/ui/glitch-text'
import { ScrollButton } from '@/components/ui/scroll-button'
import { OfferCard } from './offer-card'
import { PriceDisplay } from './price-display'
import { Sparkles, Zap } from 'lucide-react'

export function ComparisonSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
  
  const novatoItems = [
    { text: 'Acesso ao Fórum BlackSider', included: true },
    { text: 'Kit BlackSider Plus (Arsenal Completo)', included: true },
    { text: 'Selo de Membro Fundador no Perfil', included: false },
    { text: 'Acesso à Semana BlackSider', included: false },
    { text: 'Elegível à Caneca de Colecionador', included: false },
  ]
  
  const fundadorItems = [
    { text: 'Acesso ao Fórum BlackSider 2.0', included: true },
    { text: 'Kit BlackSider Plus (Arsenal Completo)', included: true },
    { text: 'Selo de Membro Fundador no Perfil (Exclusivo)', included: true, highlight: true },
    { text: 'Acesso à Semana BlackSider (Bônus)', included: true, highlight: true },
    { text: 'Elegível à Caneca de Colecionador (100 Primeiros)', included: true, highlight: true },
  ]
  
  return (
    <section id="comparison" className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
      
      {/* VS Effect in the middle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-primary/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}>
          VS
        </motion.div>
      </div>
      
      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-3 sm:mb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider">
              <GlitchText intensity="medium">
                VOCÊ NÃO É NOVATO.
              </GlitchText>
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider mt-2">
              <GlitchText intensity="medium" color="white">
                SUA LEALDADE TEM VALOR.
              </GlitchText>
            </h3>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-center text-base sm:text-lg text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-4">
            Veja a diferença entre a oferta para os novos membros e a sua condição especial de Fundador.
          </motion.p>
          
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
            {/* Novato Card */}
            <motion.div variants={itemVariants} className="h-full">
              <OfferCard
                title="OFERTA PARA NOVATOS"
                subtitle="Público Geral"
                dateRange="A partir de 19/08"
                variant="default"
                items={novatoItems}
              >
                <PriceDisplay
                  originalPrice={2999}
                  currentPrice={2999}
                  variant="default"
                  showSavings={false}
                />
              </OfferCard>
            </motion.div>
            
            {/* Fundador Card */}
            <motion.div variants={itemVariants} className="h-full">
              <OfferCard
                title="SUA OFERTA, FUNDADOR"
                subtitle="Condição Exclusiva"
                dateRange="Até 18/08"
                variant="premium"
                items={fundadorItems}
                badge="FUNDADOR"
              >
                <PriceDisplay
                  originalPrice={2999}
                  currentPrice={1499}
                  variant="premium"
                  showSavings={true}
                  installments={{
                    count: 10,
                    value: 149.90
                  }}
                />
              </OfferCard>
            </motion.div>
          </div>
          
          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <ScrollButton
              targetId="arsenal"
              size="lg"
              variant="default"
              className="bg-yellow-500 hover:bg-yellow-400 text-black w-full sm:w-auto">
              <Sparkles className="mr-2 h-5 w-5" />
              VER O ARSENAL COMPLETO
              <Zap className="ml-2 h-5 w-5" />
            </ScrollButton>
            
            <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
              * Oferta exclusiva para membros fundadores. Não perca!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}