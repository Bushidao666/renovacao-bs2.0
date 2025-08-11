'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  [key: string]: string | undefined
}

export function useUTMParams(): UTMParams {
  const searchParams = useSearchParams()
  const [utmParams, setUtmParams] = useState<UTMParams>({})

  useEffect(() => {
    const params: UTMParams = {}
    
    // Captura todos os parâmetros UTM da URL
    searchParams.forEach((value, key) => {
      if (key.startsWith('utm_') || key === 'ref' || key === 'source') {
        params[key] = value
      }
    })
    
    // Se não houver UTMs na URL, tenta recuperar do sessionStorage
    if (Object.keys(params).length === 0) {
      const storedUTMs = sessionStorage.getItem('utm_params')
      if (storedUTMs) {
        return setUtmParams(JSON.parse(storedUTMs))
      }
    } else {
      // Armazena UTMs no sessionStorage para persistir durante a sessão
      sessionStorage.setItem('utm_params', JSON.stringify(params))
    }
    
    setUtmParams(params)
  }, [searchParams])

  return utmParams
}

export function buildUTMString(params: UTMParams): string {
  const utmEntries = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
  
  return utmEntries.length > 0 ? `?${utmEntries.join('&')}` : ''
}