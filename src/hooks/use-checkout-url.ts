'use client'

import { useABTest } from './use-ab-test'
import { useUTMParams, buildUTMString } from './use-utm-params'

export function useCheckoutUrl(): { url: string; isLoading: boolean } {
  const { variant, isLoading } = useABTest('checkout')
  const utmParams = useUTMParams()
  
  // URLs base do checkout (definidas via variáveis de ambiente)
  const checkoutUrlA = process.env.NEXT_PUBLIC_CHECKOUT_URL_A || 'https://checkout.example.com/a'
  const checkoutUrlB = process.env.NEXT_PUBLIC_CHECKOUT_URL_B || 'https://checkout.example.com/b'
  
  // Seleciona URL baseada na variante do teste A/B
  const baseUrl = variant === 'A' ? checkoutUrlA : checkoutUrlB
  
  // Constrói a URL final com os parâmetros UTM
  const utmString = buildUTMString(utmParams)
  const finalUrl = `${baseUrl}${utmString}`
  
  return { url: finalUrl, isLoading }
}