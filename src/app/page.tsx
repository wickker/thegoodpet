import { Suspense } from 'react'
import {
  Header,
  PrivacyPolicy,
  TileOverlayContainer,
} from '@/components/common'
import { HeroBanner, HowItWorksSection } from '@/components/Home'

export default function Page() {
  return (
    <>
      <Header />

      <div className="mt-4 md:mt-0">
        <TileOverlayContainer>
          <HeroBanner />
        </TileOverlayContainer>

        <HowItWorksSection />

        <div className="w-full bg-secondary py-4">
          <Suspense>
            <PrivacyPolicy className="text-white" />
          </Suspense>
        </div>
      </div>
    </>
  )
}
