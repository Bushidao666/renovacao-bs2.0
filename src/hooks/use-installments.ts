'use client'

import { useABTest } from './use-ab-test'

interface InstallmentInfo {
  count: number
  value: number
  gateway: 'YOUSHOP' | 'CNPAY'
}

export function useInstallments(): InstallmentInfo {
  const { variant } = useABTest('checkout')
  
  // Define os valores de parcelamento baseado no gateway
  // Variante A = YOUSHOP
  // Variante B = CNPAY
  if (variant === 'A') {
    return {
      count: 12,
      value: 150.30,
      gateway: 'YOUSHOP'
    }
  } else {
    return {
      count: 12,
      value: 156.74,
      gateway: 'CNPAY'
    }
  }
}