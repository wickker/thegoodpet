import { z } from 'zod'

// Requests
const createCustomerRequestSchema = z.object({
  input: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
    password: z.string(),
  }),
})

export type CreateCustomerRequest = z.infer<typeof createCustomerRequestSchema>
