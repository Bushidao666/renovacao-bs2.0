'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useCheckoutUrl } from '@/hooks/use-checkout-url'
import { NeonButton } from './neon-button'
import type { ButtonProps } from './button'
import { Loader2 } from 'lucide-react'

interface CheckoutButtonProps extends Omit<ButtonProps, 'onClick' | 'href'> {
  children: React.ReactNode
  trackingEvent?: string
  className?: string
}

export function CheckoutButton({ 
  children, 
  trackingEvent = 'checkout_click',
  className,
  disabled,
  ...props 
}: CheckoutButtonProps) {
  const { url, isLoading } = useCheckoutUrl()
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    // Track event (você pode integrar com Google Analytics, Segment, etc.)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', trackingEvent, {
        event_category: 'conversion',
        event_label: url,
      })
    }
    
    // Pequeno delay para garantir que o tracking seja enviado
    setTimeout(() => {
      window.location.href = url
    }, 100)
  }
  
  if (isLoading) {
    return (
      <NeonButton
        disabled
        className={cn('relative', className)}
        {...props}
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Carregando...
      </NeonButton>
    )
  }
  
  return (
    <NeonButton
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={className}
      {...props}
    >
      {children}
    </NeonButton>
  )
}