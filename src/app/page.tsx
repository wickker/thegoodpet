import { Header, TileOverlayContainer } from '@/components/common'
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

        <div className="grid w-full place-items-center bg-secondary py-4">
          <a
            className="text-sm text-white underline"
            href="/privacy-policy.html"
            target="_blank"
          >
            Privacy policy
          </a>
        </div>
      </div>
    </>
  )
}
