import { useFormStatus } from 'react-dom'
import { BsPersonCircle } from 'react-icons/bs'
import Loader from '../Loader'

export default function UserButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="hidden text-[25px] md:flex md:items-center"
      type="submit"
      disabled={pending}
    >
      {pending ? <Loader size="sm" /> : <BsPersonCircle />}
    </button>
  )
}
