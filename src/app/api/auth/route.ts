import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { SHOPIFY_CUSTOMER_EMAIL_COOKIE } from '@/utils/constants/cookies'

// Checks if there is a user logged in and returns the user email
export async function GET() {
  const cookieStore = cookies()
  const emailCookie = cookieStore.get(SHOPIFY_CUSTOMER_EMAIL_COOKIE)
  return NextResponse.json(emailCookie?.value || '')
}
