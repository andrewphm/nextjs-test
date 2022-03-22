const secret = process.env.JWT_SEC
import { USER_TOKEN } from '../constants/routes'
import { SignJWT, jwtVerify } from 'jose'

import { NextResponse } from 'next/server'

export default async function middleware(req) {
  const token = req.cookies[USER_TOKEN]

  // Check user-token if attempting to reach main page
  if (req.nextUrl.pathname === '/') {
    if (!token) {
      console.log('No token, redirect to login')
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    } else {
      try {
        const verified = await jwtVerify(
          token,
          new TextEncoder().encode(secret)
        )
        return NextResponse.next()
      } catch (error) {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    }
  }

  // Redirect to homepage if attempting to view login/signup page when already logged in
  if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup') {
    if (token) {
      try {
        const verified = await jwtVerify(
          token,
          new TextEncoder().encode(secret)
        )
        console.log('redirecting to homepage')
        const url = req.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
      } catch (error) {
        console.log(error)
        return NextResponse.next()
      }
    }
  }
}
