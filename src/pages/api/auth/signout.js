import cookie from 'cookie';

export default async function handler(req, res) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('user-token', '', {
      expires: new Date(0),
      path: '/',
    })
  );

  return res.status(200).json({ success: true, message: 'Cleared cookies' });
}
