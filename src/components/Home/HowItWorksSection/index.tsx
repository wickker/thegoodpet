const sections = [
  {
    title: 'Share everything about your pet',
    content: 'From their name to any health conidtions they may have',
    image: './activity/cat_activity_1.png',
    alt: 'lazy cat',
  },
  {
    title: "We'll design a tailored recipe and feeding plan",
    content: 'Including a range of supplements with adjustable portions',
    image: './activity/cat_activity_3.png',
    alt: '',
  },
  {
    title: 'Delivered to your door at your own schedule',
    content: 'Change, pause or cancel at any time',
    image: './activity/dog_activity_3.png',
    alt: '',
  },
]

const HowItWorksSection = () => (
  <div className="mx-auto max-w-[1200px] px-[15px] py-12">
    <h1 className="mb-6 text-center font-fredoka text-4xl font-black leading-none text-primary md:mb-12 md:text-6xl">
      How does it work?
    </h1>
    <div className="i grid place-items-center items-start gap-x-12 gap-y-12 md:grid-cols-3">
      {sections.map((s) => (
        <div className="grid h-full justify-items-center text-center md:max-w-[300px]">
          <h2 className="font-fredoka text-2xl font-black leading-none text-primary">
            {s.title}
          </h2>
          <p>{s.content}</p>
          <div
            className="aspect-square w-[200px]"
            style={{
              backgroundImage: `url("${s.image}")`,
              backgroundSize: 'cover',
            }}
          />
        </div>
      ))}
    </div>
  </div>
)

export default HowItWorksSection
