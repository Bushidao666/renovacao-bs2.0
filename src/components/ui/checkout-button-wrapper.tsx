'use client'

import { Suspense } from 'react'
import { CheckoutButton, type CheckoutButtonProps } from './checkout-button'
import { NeonButton } from './neon-button'
import { Loader2 } from 'lucide-react'

function CheckoutButtonFallback(props: CheckoutButtonProps) {
  return (
    <NeonButton
      disabled
      variant={props.variant || 'default'}
      size={props.size || 'default'}
      className={props.className}
    >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Carregando...
    </NeonButton>
  )
}

export function CheckoutButtonWrapper(props: CheckoutButtonProps) {
  return (
    <Suspense fallback={<CheckoutButtonFallback {...props} />}>
      <CheckoutButton {...props} />
    </Suspense>
  )
}

// Export same props type for convenience
export type { CheckoutButtonProps } from './checkout-button'