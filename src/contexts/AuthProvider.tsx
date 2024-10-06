'use client'

import { createContext, PropsWithChildren } from 'react'
import useAuth from '@/hooks/query/useAuth'

type AuthContextSchema = {
  userEmail: string
}

export const AuthContext = createContext<AuthContextSchema>({
  userEmail: '',
})

export default function AuthProvider({ children }: PropsWithChildren) {
  const { useGetLoggedInUserQuery } = useAuth()
  const getUser = useGetLoggedInUserQuery()

  console.log(getUser.data)

  return (
    <AuthContext.Provider value={{ userEmail: getUser?.data || '' }}>
      {children}
    </AuthContext.Provider>
  )
}
