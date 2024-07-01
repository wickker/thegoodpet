import Image from 'next/image'
import Link from 'next/link'
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'

const links = [
  {
    href: '/',
    title: 'Shop',
  },
  {
    href: '/',
    title: 'Learn',
  },
  {
    href: '/',
    title: 'Subscribe',
  },
]

export default function Header() {
  return (
    <div className="relative h-[122px] bg-background pt-[40px]">
      <div className="absolute inset-0 flex h-[40px] items-center justify-center bg-secondary px-[30px] font-inter text-white">
        <p className="truncate">
          Get 50% off your first delivery | Enjoy 100% tailored meals and adjust
          anytime
        </p>
      </div>

      <div className="mx-auto grid h-[80px] w-full max-w-[1200px] grid-cols-3 px-[30px] text-secondary">
        <button className="w-min self-center md:hidden">
          <HiMenu className="text-[25px]" />
        </button>

        <ul className="hidden items-center gap-10 font-fredoka text-lg font-medium md:flex">
          {links.map(({ title, href }, index) => (
            <li className="group relative" key={index}>
              <Link href={href}>{title}</Link>
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] w-full bg-secondary opacity-0 transition-opacity group-hover:opacity-100"></span>
            </li>
          ))}
        </ul>

        <Image
          src="/logo.png"
          alt="The Good Pet logo"
          height={60}
          width={143}
          className="mx-auto self-center"
        />

        <div className="flex items-center justify-end gap-10">
          <FaUserCircle className="hidden text-[25px] md:block" />
          <FaShoppingCart className="text-[25px]" />
        </div>
      </div>
    </div>
  )
}
