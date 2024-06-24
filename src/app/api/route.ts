import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
  console.log(request)
  return NextResponse.json({ hello: 'world' })
}
