/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    MONGODB_URI:
      'mongodb+srv://admin:admin@cluster0.61vc6.mongodb.net/mainDB?retryWrites=true&w=majority',
    JWT_SEC: '12345',
    FIREBASE_SEC: 'Cfd17sgJVzeJJ_KNXq62xII1vSkiRs',
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}
