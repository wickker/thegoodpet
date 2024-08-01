import { Button } from '@/components/common'

export default function HeroBanner() {
  return (
    <div className="bg-background">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center px-[15px] md:grid-cols-2 md:gap-x-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://placehold.co/600x400/png"
          className="justify-self-center md:order-2"
        />

        <div className="flex flex-col items-center justify-center gap-5 py-4 text-center text-primary md:min-h-[450px] md:items-start md:py-0 md:text-left">
          <h1 className="font-fredoka text-[80px] font-black leading-none">
            Tailored raw meals for your pet
          </h1>
          <p className="text-lg">Human Grade. Nutrient Dense. Well-Balanced.</p>
          <Button>Customise now!</Button>
        </div>
      </div>
    </div>
  )
}
