import { USER_TOKEN } from '../constants/routes'
import { SignJWT, jwtVerify } from 'jose'

export async function verifyAuth(req, res) {
  const token = req.cookies[USER_TOKEN]

  // Redirect login/signup page if logged in
  if (
    (req.nextUrl.pathname.includes('/login') ||
      req.nextUrl.pathname.includes('/signup')) &&
    token
  ) {
    try {
      const verified = await jwtVerify(token, process.env.JWT_SEC)
    } catch (error) {
      console.log(error)
    }
  }
}
