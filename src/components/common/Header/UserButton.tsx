import { useFormStatus } from 'react-dom'
import { BsPersonCircle, BsPersonCheckFill } from 'react-icons/bs'
import { Loader } from '@/components/common'

export default function UserButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="hidden text-[25px] md:flex md:items-center"
      type="submit"
      disabled={pending}
    >
      {pending ? <Loader size="sm" /> : <BsPersonCircle />}
      {/* {pending ? <Loader size="sm" /> : <BsPersonCheckFill />} */}
    </button>
  )
}
