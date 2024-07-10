import Link from 'next/link'
import { type Route } from '@/utils/constants/routes'
import { mc } from '@/utils/functions/common'

type HeaderMobileMenuProps = {
  isMenuOpen: boolean
  links: Array<{ path: Route; label: string }>
}

export default function HeaderMobileMenu({
  isMenuOpen,
  links,
}: HeaderMobileMenuProps) {
  return (
    <div
      className={mc(
        'absolute -z-10 h-0 w-full -translate-y-[165px] bg-background opacity-0 transition-all md:hidden',
        isMenuOpen && 'h-fit translate-y-0 opacity-100',
      )}
    >
      <ul className="pb-4 text-lg font-medium text-secondary">
        {links.map(({ label, path }, index) => (
          <li className="border-b border-black px-[15px] py-1.5" key={index}>
            <Link href={path} className="flex">
              {label}
            </Link>
          </li>
        ))}
        <li className="border-b border-black px-[15px] py-1.5">
          <Link href="/" className="flex">
            Account
          </Link>
        </li>
      </ul>
    </div>
  )
}
