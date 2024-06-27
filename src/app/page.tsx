import { StorefrontPoc } from '@/components/common'
import { getAllPets } from '@/database/dtos/pets'

export default async function Page() {
  const pets = await getAllPets()

  return (
    <>
      <h1 className="text-sky-700">Hello, Next.js!</h1>
      <p className="text-pink-500">{JSON.stringify(pets)}</p>
      <StorefrontPoc />
    </>
  )
}
