import Cats from '@/data/catBreeds.json'
import Dogs from '@/data/dogBreeds.json'
import { PetType } from '@/utils/constants/db'

type BreedDropdownProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  petType?: PetType
}

export default function BreedDropdown({
  petType,
  ...rest
}: BreedDropdownProps) {
  return (
    <select
      className="block w-full rounded-lg border px-3 py-2 outline-secondary"
      {...rest}
    >
      <option value=""></option>
      <>
        {petType === PetType.CAT
          ? Cats.map((cat) => (
              <option value={cat.name} key={cat.name}>
                {cat.name}
              </option>
            ))
          : Dogs.map((dog) => (
              <option value={dog.name} key={dog.name}>
                {dog.name}
              </option>
            ))}
      </>
    </select>
  )
}
