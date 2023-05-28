/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXTAUTH_URL: 'https://tmsiti.vercel.app',
    NEXTAUTH_SECRET: 'Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=',
  },
}

module.exports = nextConfig
