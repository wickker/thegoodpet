import { StorefrontPoc } from '@/components/common'
import { getAllPets } from '@/database/dtos/pets'

export default async function Page() {
  const pets = await getAllPets()

  return (
    <>
      <h1 className="text-blue-600">Hello, Next.js!</h1>
      <p className="text-pink-500">{JSON.stringify(pets)}</p>
      <StorefrontPoc />
    </>
  )
}
