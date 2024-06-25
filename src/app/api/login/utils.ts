import { cookies } from 'next/headers'
import Config from '@/configs'

const AUTH_COOKIE_AGE = 1800

const AUTH_COOKIE_NAME = 'code-verifier'

export const setAuthCodeVerifierCookie = (verifier: string) => {
  cookies().set(AUTH_COOKIE_NAME, verifier, {
    maxAge: AUTH_COOKIE_AGE,
    domain: Config.DOMAIN,
    path: '/',
    secure: true,
    httpOnly: true,
  })
}

export const generateCodeVerifier = () => {
  const rando = generateRandomCode()
  return base64UrlEncode(rando)
}

export const generateCodeChallenge = async (codeVerifier: string) => {
  const digestOp = await crypto.subtle.digest(
    { name: 'SHA-256' },
    new TextEncoder().encode(codeVerifier),
  )
  const hash = convertBufferToString(digestOp)
  return base64UrlEncode(hash)
}

export const generateState = async (): Promise<string> => {
  const timestamp = Date.now().toString()
  const randomString = Math.random().toString(36).substring(2)
  return timestamp + randomString
}

export const generateNonce = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let nonce = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    nonce += characters.charAt(randomIndex)
  }
  return nonce
}

const generateRandomCode = () => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return String.fromCharCode.apply(null, Array.from(array))
}

const base64UrlEncode = (str: string) => {
  const base64 = btoa(str)
  // ensures that the encoding does not have +, /, or = characters in it
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

const convertBufferToString = (hash: ArrayBuffer) => {
  const uintArray = new Uint8Array(hash)
  const numberArray = Array.from(uintArray)
  return String.fromCharCode(...numberArray)
}
