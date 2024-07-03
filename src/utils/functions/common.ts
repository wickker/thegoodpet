import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const mc = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs))
