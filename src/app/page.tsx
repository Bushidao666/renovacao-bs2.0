import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/hero/hero-section'

// Lazy load das seções pesadas com loading placeholders
const RewardSection = dynamic(
  () => import('@/components/sections/reward/reward-section').then(mod => ({ default: mod.RewardSection })),
  { 
    loading: () => <div className="min-h-[600px] bg-black" />,
    ssr: true 
  }
)

const ComparisonSection = dynamic(
  () => import('@/components/sections/comparison/comparison-section').then(mod => ({ default: mod.ComparisonSection })),
  { 
    loading: () => <div className="min-h-[600px] bg-black" />,
    ssr: true 
  }
)

const ArsenalSection = dynamic(
  () => import('@/components/sections/arsenal/arsenal-section').then(mod => ({ default: mod.ArsenalSection })),
  { 
    loading: () => <div className="min-h-[800px] bg-black" />,
    ssr: true 
  }
)

const UpdatesSection = dynamic(
  () => import('@/components/sections/updates/updates-section').then(mod => ({ default: mod.UpdatesSection })),
  { 
    loading: () => <div className="min-h-[400px] bg-black" />,
    ssr: true 
  }
)

const FinalCTASection = dynamic(
  () => import('@/components/sections/final-cta/final-cta-section').then(mod => ({ default: mod.FinalCTASection })),
  { 
    loading: () => <div className="min-h-[600px] bg-black" />,
    ssr: true 
  }
)

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <RewardSection />
      <ComparisonSection />
      <ArsenalSection />
      <UpdatesSection />
      <FinalCTASection />
    </main>
  )
}