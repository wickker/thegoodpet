import { ZodFormattedError } from 'zod'

export type BaseError = {
  title: string
  message: string
}

export type ServerActionError<T> = {
  error: ZodFormattedError<T> | null
}

export type Meat = {
  grams: number
  type: string // TODO: Arix update type to meat
  quantity: number
}
