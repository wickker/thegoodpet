import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
  console.log('request resolve login : ', request)
  const cookieStore = cookies()
  console.log('cookie : ', cookieStore.get('code-verifier'))
  return NextResponse.json({ message: 'RESOLVE LOGIN' }, { status: 200 })
}
