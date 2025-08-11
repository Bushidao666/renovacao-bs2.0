'use client'

import * as React from 'react'
import { NeonButton } from './neon-button'

interface ScrollButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: React.ReactNode
  targetId: string
  offset?: number
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'xl'
  glow?: boolean
  pulse?: boolean
}

export function ScrollButton({ 
  children, 
  targetId,
  offset = 0,
  className,
  ...props 
}: ScrollButtonProps) {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
  
  return (
    <NeonButton
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </NeonButton>
  )
}