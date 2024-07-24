import { ZodFormattedError } from 'zod'

export type BaseError = {
  title: string
  message: string
}

export type ServerActionError<T> = {
  zodError: ZodFormattedError<T> | null
  error?: BaseError
}
