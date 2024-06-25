import { StorefrontPoc } from '@/components/common'
import { getAllPets } from '@/database/dtos/pets'

export default async function Page() {
  const pets = await getAllPets()

  return (
    <>
      <h1 className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
        Hello, Next.js!
      </h1>
      <p>{JSON.stringify(pets)}</p>
      <StorefrontPoc />
    </>
  )
}
