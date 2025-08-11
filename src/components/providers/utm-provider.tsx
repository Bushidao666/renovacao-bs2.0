'use client'

import { Suspense } from 'react'

export function UTMProvider({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>
}