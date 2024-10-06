import { useFormStatus } from 'react-dom'
import { BsPersonCircle, BsPersonCheckFill } from 'react-icons/bs'
import { Loader } from '@/components/common'

type UserButtonProps = {
  userEmail: string
}

export default function UserButton({ userEmail }: UserButtonProps) {
  const { pending } = useFormStatus()

  const renderButton = () => {
    if (pending) {
      return <Loader size="sm" />
    }
    if (userEmail) {
      return <BsPersonCheckFill />
    }
    return <BsPersonCircle />
  }

  return (
    <button
      className="hidden text-[25px] md:flex md:items-center"
      type="submit"
      disabled={pending}
    >
      {renderButton()}
    </button>
  )
}
