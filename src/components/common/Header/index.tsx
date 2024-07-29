'use client'

import { Suspense, useContext, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsPersonCircle, BsList, BsXLg } from 'react-icons/bs'
import { handleClickUserAccount } from './actions'
import RefetchCart from './refetchCart'
import { HeaderMobileMenu, ButtonCart } from '@/components/common'
import { CartContext } from '@/contexts/CartProvider'
import { Route } from '@/utils/constants/routes'

const links = [
  {
    path: Route.SHOP,
    label: 'Shop',
  },
  {
    path: Route.LEARN,
    label: 'Learn',
  },
  {
    path: Route.SUBSCRIBE,
    label: 'Subscribe',
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openCart, getCart } = useContext(CartContext)

  const handleCloseMenu = () => setIsMenuOpen(false)

  return (
    <>
      <Suspense>
        <RefetchCart />
      </Suspense>

      <div className="sticky top-0">
        <div className="relative h-[122px] bg-background pt-[40px]">
          <div className="absolute inset-0 flex h-[40px] items-center justify-center bg-secondary px-[15px] text-white">
            <p className="truncate">
              Get 50% off your first delivery | Enjoy 100% tailored meals and
              adjust anytime
            </p>
          </div>

          <div className="mx-auto grid h-[80px] w-full max-w-[1200px] grid-cols-3 px-[15px] text-secondary">
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

            <Image
              src="/logo.png"
              alt="The Good Pet logo"
              height={56}
              width={135}
              className="mx-auto self-center"
            />

            <div className="flex items-center justify-end gap-10">
              <button
                className="hidden text-[25px] md:block"
                onClick={() => handleClickUserAccount()}
              >
                <BsPersonCircle />
              </button>
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
          onClickLink={handleCloseMenu}
        />
      </div>
    </>
  )
}
