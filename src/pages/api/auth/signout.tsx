// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

type Data = {
  success: boolean
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('user-token', '', {
      expires: new Date(0),
      path: '/',
    })
  )

  return res.status(200).json({ success: true, message: 'Cleared cookies' })
}
