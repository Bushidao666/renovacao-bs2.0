'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { UpdateCardAlternate } from './update-card-alternate'
import { GlitchText } from '@/components/ui/glitch-text'
import { 
  Terminal,
  Star,
  Bot,
  Palette,
  Gift,
  Mail
} from 'lucide-react'

const updates = [
  {
    icon: <Star className="w-8 h-8 text-primary" />,
    title: 'Favoritar Posts',
    description: 'Para você nunca mais perder uma ideia de 1 milhão.',
    progress: 85
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: 'BlackIA',
    description: 'Nossa própria IA de guerra, saindo da jaula para te ajudar nos projetos.',
    progress: 72
  },
  {
    icon: <Palette className="w-8 h-8 text-primary" />,
    title: 'Posts em HTML/CSS',
    description: 'Deixe seus posts bonitões, como os dos ADMs.',
    progress: 90
  },
  {
    icon: <Gift className="w-8 h-8 text-primary" />,
    title: 'Bônus Automático',
    description: 'Comente a palavra-chave e o sistema entrega o presente sozinho.',
    progress: 78
  },
  {
    icon: <Mail className="w-8 h-8 text-primary" />,
    title: 'Newsletter Semanal',
    description: 'O resumo do que bombou na semana, direto no seu e-mail.',
    progress: 95
  }
]

export function UpdatesSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }
  
  return (
    <section id="updates" className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden bg-black/50">
      {/* Tech grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="cyber-grid opacity-5" />
      </div>
      
      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent w-full"
          animate={{
            y: [-100, 1000],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent w-full"
          animate={{
            y: [-200, 900],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
      </div>
      
      <motion.div
        className="relative z-10 container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <Terminal className="w-8 h-8 text-primary" />
              <motion.div
                className="h-8 w-px bg-primary"
                animate={{
                  scaleY: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-primary font-mono text-sm uppercase tracking-wider">
                System Update
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider mb-3 sm:mb-4">
              <GlitchText intensity="strong">
                O JOGO NÃO PARA
              </GlitchText>
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 text-primary">
                O MODO TURBO ESTÁ ATIVADO
              </span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-400 mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
              As próximas atualizações já estão no gatilho e serão liberadas para você{' '}
              <span className="text-primary font-bold">sem custo extra</span>.
            </p>
          </motion.div>
          
          {/* Updates list - Alternating layout */}
          <div className="space-y-16 sm:space-y-20 md:space-y-24 mt-12 sm:mt-16">
            {updates.map((update, index) => (
              <UpdateCardAlternate
                key={index}
                {...update}
                index={index}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
          
          {/* Coming soon indicator */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 text-primary/60"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="font-mono text-sm">Carregando mais atualizações...</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}