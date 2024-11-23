'use client'
import { forwardRef, useState, ForwardedRef, MouseEventHandler } from 'react'
import { DateTime } from 'luxon'
import DatePicker from 'react-datepicker'
import { BsCalendar2EventFill } from 'react-icons/bs'
import { getInitDelieveryDate } from './utils'
import 'react-datepicker/dist/react-datepicker.css'

const DeliveryDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<DateTime>(
    getInitDelieveryDate(),
  )

  const handleChangeDate = (date: Date | null) => {
    const luxonDateTime = DateTime.fromJSDate(date || new Date())
    setSelectedDate(luxonDateTime)
  }

  return (
    <div className="grid">
      <DatePicker
        minDate={getInitDelieveryDate().toJSDate()}
        selected={selectedDate.toJSDate()}
        onChange={handleChangeDate}
        customInput={<CustomButton />}
      />
      <input type="date" value={selectedDate.toISODate() || ''} hidden />
    </div>
  )
}

type CustomButtonProps = {
  value?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

const CustomButton = forwardRef(
  (
    { value, onClick }: CustomButtonProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <div
      className="flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 outline-secondary hover:cursor-pointer"
      ref={ref}
      onClick={onClick}
    >
      <span>{value}</span>
      <BsCalendar2EventFill className="text-secondary" />
    </div>
  ),
)

export default DeliveryDatePicker
