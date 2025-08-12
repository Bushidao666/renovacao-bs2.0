'use client'

import * as React from 'react'
import { useInView } from 'framer-motion'

interface LazyLoadProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string | number
  threshold?: number
}

export function LazyLoad({ 
  children, 
  fallback = null,
  rootMargin: _rootMargin = '100px',
  threshold = 0.1 
}: LazyLoadProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once: true,
    amount: threshold 
  })
  const [hasLoaded, setHasLoaded] = React.useState(false)

  React.useEffect(() => {
    if (isInView && !hasLoaded) {
      setHasLoaded(true)
    }
  }, [isInView, hasLoaded])

  return (
    <div ref={ref}>
      {hasLoaded ? children : fallback}
    </div>
  )
}