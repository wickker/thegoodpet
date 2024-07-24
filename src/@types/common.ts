import { ZodFormattedError } from 'zod'

export type BaseError = {
  title: string
  message: string
}

export type ServerActionError<T> = {
  zodError: ZodFormattedError<T> | null
  error?: BaseError
}

export type Meat = {
  grams: number
  type: string // TODO: Arix update type to meat
  quantity: number
}
