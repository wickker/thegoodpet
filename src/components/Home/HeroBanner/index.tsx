export default function HeroBanner() {
  // TODO: Make responsive
  return (
    <div className="h-[500px] bg-background">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 px-[30px]">
        <div className="flex flex-col items-start justify-center gap-4 text-primary">
          <h1 className="text-7xl font-black">
            Tailored raw meals for your pet
          </h1>
          <p className="text-lg">Human Grade. Nutrient Dense. Well Balance.</p>
          <button className="w-[300px] rounded-full bg-primary py-2.5 text-lg text-white">
            Sign up now
          </button>
        </div>
        <div>
          {/* TODO: convert to <Image />asset instead of link */}
          <img
            alt="test"
            src="https://s3-alpha-sig.figma.com/img/03ee/2dab/a40bd1b70a8cf6cbd1895509fd336342?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pFU8EjubzswklQzjPFXrCszX5s51HPXkwVndJyOLOeMw~FNZNOAJlAlpxgGicBmWiISisoiSei75BRKc4cQfP7qIATS-RURcdBF5hnMyjxqPrqJmMcZvpT5I781V-5PeiX38tk2aKI3uwevJbYZQm1Rq149HPN8eJkE9-FhGXEBi27-hIGni58PHOfq4kD1k8Hgl6yHYBLDl-vk2LJ9tqjfHoicjwiwkmwaGNopQoL~y2HJvfAXd~lJn40okM~bX2dPBlTnKNZvCqVVKN2Pjm4~6uEH8Yy-OU2-IIVJaVLPjWTHhW~1Fc1vZTkeqAvYyc9IAH1GJ4D2f45QJ1h7P1g__"
          />
        </div>
      </div>
    </div>
  )
}
