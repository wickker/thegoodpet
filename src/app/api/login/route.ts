import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // defaults to auto

function generateCodeVerifier() {
  const rando = generateRandomCode()
  return base64UrlEncode(rando)
}

async function generateCodeChallenge(codeVerifier: string) {
  const digestOp = await crypto.subtle.digest(
    { name: 'SHA-256' },
    new TextEncoder().encode(codeVerifier),
  )
  const hash = convertBufferToString(digestOp)
  return base64UrlEncode(hash)
}

function generateRandomCode() {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return String.fromCharCode.apply(null, Array.from(array))
}

function base64UrlEncode(str: string) {
  const base64 = btoa(str)
  // This is to ensure that the encoding does not have +, /, or = characters in it.
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function convertBufferToString(hash: ArrayBuffer) {
  const uintArray = new Uint8Array(hash)
  const numberArray = Array.from(uintArray)
  return String.fromCharCode(...numberArray)
}

async function generateState(): Promise<string> {
  const timestamp = Date.now().toString()
  const randomString = Math.random().toString(36).substring(2)
  return timestamp + randomString
}

function generateNonce(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let nonce = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    nonce += characters.charAt(randomIndex)
  }

  return nonce
}

export async function GET() {
  //   console.log('request login : ', request)

  const clientId = 'shp_809b15ef-67ef-48eb-b6af-99ff117105b7'
  const authorizationRequestUrl = new URL(
    `https://shopify.com/66843738169/auth/oauth/authorize`,
  )
  authorizationRequestUrl.searchParams.append(
    'scope',
    'openid email https://api.customers.com/auth/customer.graphql',
  )
  authorizationRequestUrl.searchParams.append('client_id', clientId)
  authorizationRequestUrl.searchParams.append('response_type', 'code')
  authorizationRequestUrl.searchParams.append(
    'redirect_uri',
    `https://be0f-14-100-101-160.ngrok-free.app/api/login/resolve`,
  )
  const state = await generateState()
  const nonce = generateNonce(5)
  authorizationRequestUrl.searchParams.append('state', state)
  authorizationRequestUrl.searchParams.append('nonce', nonce)
  // Public client
  const verifier = generateCodeVerifier()
  const challenge = await generateCodeChallenge(verifier)
  //   localStorage.setItem('code-verifier', verifier)
  const cookieStore = cookies()
  cookieStore.set('code-verifier', verifier, {
    maxAge: 1800,
    domain: 'be0f-14-100-101-160.ngrok-free.app',
    path: '/',
    secure: true,
    httpOnly: true,
  })
  authorizationRequestUrl.searchParams.append('code_challenge', challenge)
  authorizationRequestUrl.searchParams.append('code_challenge_method', 'S256')
  //   window.location.href = authorizationRequestUrl.toString()
  return NextResponse.redirect(authorizationRequestUrl)
}
