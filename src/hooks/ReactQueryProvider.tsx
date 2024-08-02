'use client'

import { useContext, useState } from 'react'
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query'
import { BaseError } from '@/@types/common'
import { NotificationsContext } from '@/contexts/NotificationsProvider'

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { notification } = useContext(NotificationsContext)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError: (err) => handleError(err),
        }),
        mutationCache: new MutationCache({
          onError: (err) => handleError(err),
        }),
      }),
  )

  function handleError(err: Error) {
    const { title, message }: BaseError = JSON.parse(err.message)
    notification.error({
      title,
      message,
    })
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
