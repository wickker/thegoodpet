import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}
export const mc = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs))
