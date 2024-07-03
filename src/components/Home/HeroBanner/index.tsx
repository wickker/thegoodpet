export default function HeroBanner() {
  return (
    <div className="w-full bg-background">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 px-[30px] md:grid-cols-2 md:gap-x-8">
        <div className="h-[500px] bg-[url('https://placehold.co/600x400/png')] bg-contain bg-center bg-no-repeat md:order-2" />

        <div className="flex flex-col items-center justify-center gap-5 py-4 text-center text-primary md:items-start md:py-0 md:text-left">
          <h1 className="font-fredoka text-[80px] font-black leading-none">
            Tailored raw meals for your pet
          </h1>
          <p className="text-lg">Human Grade. Nutrient Dense. Well-Balanced.</p>
          {/* TODO: Make button component */}
          <button className="w-[300px] rounded-full bg-primary py-2.5 text-lg text-white">
            Sign up now
          </button>
        </div>
      </div>
    </div>
  )
}
