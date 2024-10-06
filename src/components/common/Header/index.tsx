'use client'

import { Suspense, useContext, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsList, BsXLg } from 'react-icons/bs'
import { handleClickUserAccount } from './actions'
import Banner from './Banner'
import CartRefetch from './CartRefetch'
import UserButton from './UserButton'
import { HeaderMobileMenu, ButtonCart } from '@/components/common'
import { CartContext } from '@/contexts/CartProvider'
import useAuth from '@/hooks/query/useAuth'
import { Route } from '@/utils/constants/routes'

const links = [
  // TODO: Enable later
  // {
  //   path: Route.SHOP,
  //   label: 'Shop',
  // },
  // {
  //   path: Route.LEARN,
  //   label: 'Learn',
  // },
  {
    path: Route.SURVEY,
    label: 'Subscribe',
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openCart, getCart } = useContext(CartContext)
  const { useGetLoggedInUserQuery } = useAuth()
  const { data: userEmail } = useGetLoggedInUserQuery()

  return (
    <>
      <Suspense>
        <CartRefetch getCart={getCart} />
      </Suspense>

      <div className="sticky top-0 z-10">
        <div className="relative h-[122px] bg-background pt-[40px]">
          <Banner />

          <div className="mx-auto grid h-[80px] w-full max-w-[1200px] grid-cols-3 items-center px-[15px] text-secondary">
            <button
              className="w-min self-center text-[25px] md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <BsXLg /> : <BsList />}
            </button>

            <ul className="hidden items-center gap-10 text-lg font-medium md:flex">
              {links.map(({ label, path }, index) => (
                <li className="group relative" key={index}>
                  <Link href={path}>{label}</Link>
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] w-full bg-secondary opacity-0 transition-opacity group-hover:opacity-100"></span>
                </li>
              ))}
            </ul>

            <Link href={Route.HOME}>
              <Image
                src="/logo.png"
                alt="The Good Pet logo"
                height={56}
                width={135}
                className="mx-auto self-center"
              />
            </Link>

            <div className="flex items-center justify-end gap-10">
              <form action={handleClickUserAccount}>
                <UserButton userEmail={userEmail || ''} />
              </form>

              <ButtonCart
                onClick={openCart}
                itemsCount={getCart?.data?.totalQuantity}
              />
            </div>
          </div>
        </div>

        <HeaderMobileMenu
          isMenuOpen={isMenuOpen}
          links={links}
          userEmail={userEmail || ''}
        />
      </div>
    </>
  )
}
