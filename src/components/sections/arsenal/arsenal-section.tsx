'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ToolCardAlternate } from './tool-card-alternate'
import { BonusCard } from './bonus-card'
import { GlitchText } from '@/components/ui/glitch-text'
import { ScrollButton } from '@/components/ui/scroll-button'
import { ArrowDown } from 'lucide-react'

const tools = [
  {
    image: '/images/Cloaker.png',
    title: 'Protocolo Fantasma - Cloaker do Spy',
    description: 'Vire um fantasma no sistema. O bot do Mark vê uma receita de bolo, o cliente vê sua oferta.'
  },
  {
    image: '/images/Aquecedor_de_Chips.png',
    title: 'Hidra - Aquecedor de Chips',
    description: 'Um exército de números de WhatsApp que se aquecem com IA e nunca morrem.'
  },
  {
    image: '/images/Gerador_de_Notificacoes.png',
    title: 'Hyper - Gerador de notificações BlackSider',
    description: 'Fabrique uma realidade de sucesso com notificações de venda em vídeo perfeitas, indistinguíveis das reais.'
  },
  {
    image: '/images/Radar_Blacksider.png',
    title: 'Radar BlackSider - As ofertas do Spy',
    description: 'Receba o alvo já marcado no mapa. As minas de ouro da semana, curadas por mim e minha equipe.'
  },
  {
    image: '/images/Cybervault.png',
    title: 'CyberVault - 1000+ templates de SaaS prontos',
    description: 'Um catálogo com mais de mil softwares prontos para você colocar sua marca e começar a vender amanhã.'
  },
  {
    image: '/images/Sidertools.png',
    title: 'SiderTools - Nosso rateio de ferramentas',
    description: 'O fim do aluguel digital. Clonadores, ofuscadores e scripts que valem uma fortuna, em um só lugar.'
  }
]

const bonuses = [
  {
    number: 1,
    title: 'Semana BlackSider',
    description: 'De 25 a 29 de agosto, cinco top players do fórum, que já faturaram 7 dígitos, vão abrir a caixa-preta em 5 lives exclusivas, mostrando estratégias e ferramentas que usam na trincheira. Isso, por si só, não tem preço.',
    highlight: '25 a 29 de agosto'
  },
  {
    number: 2,
    title: 'Frame de Membro Fundador',
    description: 'Todo fundador que renovar agora vai ganhar um selo de honra em seu perfil. Uma marca que ninguém poderá tirar de você.'
  }
]

export function ArsenalSection() {
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
  
  return (
    <section id="arsenal" className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      
      <motion.div
        className="relative z-10 container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section title */}
          <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider mb-3 sm:mb-4">
              <GlitchText intensity="medium" className="text-primary">
                O Arsenal BlackSider 2.0
              </GlitchText>
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              Ferramentas que transformam iniciantes em profissionais
            </p>
          </motion.div>
          
          {/* Tools list - Alternating layout */}
          <div className="space-y-12 sm:space-y-16 mb-16 sm:mb-20">
            {tools.map((tool, index) => (
              <ToolCardAlternate 
                key={index} 
                {...tool} 
                index={index}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
          
          {/* Bonus section */}
          <motion.div variants={itemVariants} className="mt-16 sm:mt-20 md:mt-24">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider">
                <GlitchText intensity="medium" className="text-gold">
                  E AINDA NÃO ACABOU...
                </GlitchText>
              </h3>
              <p className="text-base sm:text-lg text-primary mt-2">
                BÔNUS EXCLUSIVOS PARA QUEM CONTINUAR NA ALIANÇA
              </p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
              variants={containerVariants}
            >
              {bonuses.map((bonus, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <BonusCard {...bonus} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* CTA Button */}
          <motion.div 
            variants={itemVariants} 
            className="text-center mt-12 sm:mt-16"
          >
            <ScrollButton
              targetId="final-cta"
              size="lg"
              variant="default"
              className="bg-gradient-to-r from-primary to-yellow-400 hover:from-yellow-400 hover:to-primary text-black w-full sm:w-auto"
            >
              <ArrowDown className="mr-2 h-5 w-5" />
              QUERO GARANTIR MEU ACESSO AGORA
            </ScrollButton>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}