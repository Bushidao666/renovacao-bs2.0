import { HeroSection } from '@/components/sections/hero/hero-section'
import { RewardSection } from '@/components/sections/reward/reward-section'
import { ComparisonSection } from '@/components/sections/comparison/comparison-section'
import { ArsenalSection } from '@/components/sections/arsenal/arsenal-section'
import { UpdatesSection } from '@/components/sections/updates/updates-section'
import { FinalCTASection } from '@/components/sections/final-cta/final-cta-section'

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