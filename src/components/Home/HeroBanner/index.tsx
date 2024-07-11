import { Button } from '@/components/common'

export default function HeroBanner() {
  return (
    <div className="bg-background">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 px-[15px] md:grid-cols-2 md:gap-x-8">
        <div className="h-[500px] bg-[url('https://placehold.co/600x400/png')] bg-contain bg-center bg-no-repeat md:order-2" />

        <div className="flex flex-col items-center justify-center gap-5 py-4 text-center text-primary md:items-start md:py-0 md:text-left">
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
