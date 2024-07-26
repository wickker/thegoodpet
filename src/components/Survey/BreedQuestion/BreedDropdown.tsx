import Cats from '@/data/catBreeds.json'
import Dogs from '@/data/dogBreeds.json'
import { Species } from '@/utils/constants/db'

type BreedDropdownProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  species?: Species
}

export default function BreedDropdown({
  species,
  ...rest
}: BreedDropdownProps) {
  return (
    <div className="select-wrapper">
      <select
        className="block w-full appearance-none rounded-lg border px-3 py-2 outline-secondary"
        {...rest}
      >
        <option value=""></option>
        <>
          {species === Species.CAT
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
    </div>
  )
}
