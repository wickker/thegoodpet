'use client'

import { useState } from 'react'
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query'

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          // TODO: Show error notification
          onError: (err) => {
            console.log(err.message)
          },
        }),
        mutationCache: new MutationCache({
          onError: (err) => {
            console.log(err.message)
          },
        }),
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
