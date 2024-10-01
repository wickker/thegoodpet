import { PrivacyPolicy, TileOverlayContainer } from '@/components/common'
import { HeroBanner, HowItWorksSection } from '@/components/Home'

export default function Page() {
  return (
    <>
      <div className="mt-4 md:mt-0">
        <TileOverlayContainer>
          <HeroBanner />
        </TileOverlayContainer>

        <HowItWorksSection />

        <div className="w-full bg-secondary py-4">
          <PrivacyPolicy className="text-white" />
        </div>
      </div>
    </>
  )
}
