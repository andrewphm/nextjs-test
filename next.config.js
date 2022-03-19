/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI:
      'mongodb+srv://admin:admin@cluster0.61vc6.mongodb.net/mainDB?retryWrites=true&w=majority',
  },
};

module.exports = nextConfig;
