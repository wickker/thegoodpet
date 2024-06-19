import { z } from 'zod';

// Requests
const GetAllProductsRequestSchema = z.object({
  first: z.number(),
});

export type GetAllProductsRequest = z.infer<typeof GetAllProductsRequestSchema>;
