'use client'

import { useEffect, useState } from 'react'

type ABVariant = 'A' | 'B'

interface ABTestResult {
  variant: ABVariant
  isLoading: boolean
}

export function useABTest(testName: string = 'checkout'): ABTestResult {
  const [variant, setVariant] = useState<ABVariant>('A')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Chave única para este teste no sessionStorage
    const storageKey = `ab_test_${testName}`
    
    if (typeof window !== 'undefined') {
      // Verifica se já existe uma variante selecionada para esta sessão
      const storedVariant = window.sessionStorage ? sessionStorage.getItem(storageKey) : null
      
      if (storedVariant === 'A' || storedVariant === 'B') {
        setVariant(storedVariant)
      } else {
        // Seleciona aleatoriamente uma variante (50/50)
        const selectedVariant: ABVariant = Math.random() < 0.5 ? 'A' : 'B'
        setVariant(selectedVariant)
        
        // Armazena a variante selecionada para manter consistência durante a sessão
        if (window.sessionStorage) {
          sessionStorage.setItem(storageKey, selectedVariant)
        }
        
        // Também armazena em um cookie para análises posteriores (opcional)
        document.cookie = `${storageKey}=${selectedVariant}; path=/; max-age=${60 * 60 * 24 * 30}` // 30 dias
      }
    }
    
    setIsLoading(false)
  }, [testName])

  return { variant, isLoading }
}

// Hook auxiliar para obter a URL de checkout baseada na variante
export function useCheckoutUrl(): string {
  const { variant } = useABTest('checkout')
  
  const checkoutUrlA = process.env.NEXT_PUBLIC_CHECKOUT_URL_A || '#checkout-a'
  const checkoutUrlB = process.env.NEXT_PUBLIC_CHECKOUT_URL_B || '#checkout-b'
  
  return variant === 'A' ? checkoutUrlA : checkoutUrlB
}