'use client'

import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto flex max-w-[400px] flex-col justify-center gap-3 text-center text-secondary"
    >
      <h1 className="font-fredoka text-3xl font-black leading-none md:text-4xl">
        Opps!
      </h1>
      <h2 className="font-fredoka font-black leading-none md:text-lg">
        The page you requested cannot be found
      </h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://placehold.co/400x400/png" className="w-full" />
    </motion.div>
  )
}
