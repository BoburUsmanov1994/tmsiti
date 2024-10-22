/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
];

const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXTAUTH_URL: "https://catalog.tmsiti.uz",
    // NEXTAUTH_URL:'http://localhost:3000',
    NEXTAUTH_SECRET: "Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/temporarily-error",
        permanent: true,
        basePath: false,
      },
    ];
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
