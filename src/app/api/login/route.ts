import { NextResponse } from 'next/server'
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateNonce,
  generateState,
  setAuthCodeVerifierCookie,
} from './utils'
import Config from '@/configs'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET() {
  const state = await generateState()
  const nonce = generateNonce(32)
  // for public client
  const verifier = generateCodeVerifier()
  const challenge = await generateCodeChallenge(verifier)

  setAuthCodeVerifierCookie(verifier)

  const url = new URL(`${Config.SHOPIFY_AUTH_BASE_URL}/oauth/authorize`)
  url.searchParams.append(
    'scope',
    'openid email https://api.customers.com/auth/customer.graphql',
  )
  url.searchParams.append('client_id', Config.SHOPIFY_CLIENT_ID)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append(
    'redirect_uri',
    `${Config.BASE_URL}/api/login/resolve`,
  )
  url.searchParams.append('state', state)
  url.searchParams.append('nonce', nonce)
  url.searchParams.append('code_challenge', challenge)
  url.searchParams.append('code_challenge_method', 'S256')

  return NextResponse.redirect(url)
}
