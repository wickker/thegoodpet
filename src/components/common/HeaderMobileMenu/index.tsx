import Link from 'next/link'
import { handleClickUserAccount } from '@/components/common/Header/actions'
import { type Route } from '@/utils/constants/routes'
import { mc } from '@/utils/functions/common'

type HeaderMobileMenuProps = {
  isMenuOpen: boolean
  links: Array<{ path: Route; label: string }>
  onClickLink: () => void
}

export default function HeaderMobileMenu({
  isMenuOpen,
  links,
  onClickLink,
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
            <Link href={path} className="flex" onClick={onClickLink}>
              {label}
            </Link>
          </li>
        ))}
        <li className="border-b border-black px-[15px] py-1.5">
          <button
            className="flex"
            onClick={() => {
              onClickLink()
              handleClickUserAccount()
            }}
          >
            Account
          </button>
        </li>
      </ul>
    </div>
  )
}
