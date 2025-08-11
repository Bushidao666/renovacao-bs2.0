'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { CyberBackground } from './cyber-background'
import { PandaVideoPlayer } from './panda-video-player'
import { GlitchText } from '@/components/ui/glitch-text'
import { ScrollButton } from '@/components/ui/scroll-button'
import { CountdownTimer } from '@/components/ui/countdown-timer'
import { ChevronRight } from 'lucide-react'

export function HeroSection() {
  // Target date: August 18, 2024 at 23:59
  const targetDate = new Date('2024-08-18T23:59:59')
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-x-hidden overflow-y-auto">
      {/* Cyber Background */}
      <CyberBackground />
      
      {/* Content Container */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-12 sm:py-16 md:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Main Headline */}
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider">
              <GlitchText intensity="strong" className="block">
                RENOVAÇÃO DA SUA ASSINATURA
              </GlitchText>
              <GlitchText intensity="strong" className="block mt-2">
                BLACKSIDER
              </GlitchText>
            </h1>
          </motion.div>
          
          {/* Video Player */}
          <motion.div variants={itemVariants}>
            <PandaVideoPlayer className="my-8 sm:my-10 md:my-12" />
          </motion.div>
          
          {/* Sub-headline */}
          <motion.div variants={itemVariants}>
            <p className="text-base sm:text-lg md:text-xl text-primary/90 max-w-3xl mx-auto px-4">
              Para você, <span className="text-primary text-glow">Membro Fundador</span>, 
              a escolha é simples: continuar na vanguarda ou voltar a ser um na multidão.
            </p>
          </motion.div>
          
          {/* CTA Button */}
          <motion.div variants={itemVariants} className="pt-4 sm:pt-6">
            <ScrollButton
              targetId="reward"
              size="lg"
              className="text-sm sm:text-base md:text-lg font-bold px-4 py-3 sm:px-6 sm:py-4"
            >
              VER MEUS BENEFÍCIOS EXCLUSIVOS
              <ChevronRight className="ml-2 h-5 w-5" />
            </ScrollButton>
            
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-primary/70">
              Renovação em até <span className="text-primary font-bold">10x sem juros</span> de R$149,90
            </p>
          </motion.div>
          
          {/* Countdown Timer */}
          <motion.div variants={itemVariants} className="pt-6 sm:pt-8">
            <div className="inline-block">
              <p className="text-xs sm:text-sm md:text-base text-primary/80 mb-3 sm:mb-4 uppercase tracking-wider">
                Acesso para Fundadores Encerra em:
              </p>
              <CountdownTimer targetDate={targetDate} />
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}