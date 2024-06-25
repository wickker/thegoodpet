import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET() {
  return NextResponse.json({ message: 'Good pets go meow!' }, { status: 200 })
}
