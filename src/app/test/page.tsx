import { StorefrontPoc } from '@/components/common'
import { getAllPets } from '@/database/dtos/pets'

export default async function Page() {
  const pets = await getAllPets()

  return (
    <>
      <p className="text-pink-500">{JSON.stringify(pets)}</p>
      <StorefrontPoc />
    </>
  )
}
