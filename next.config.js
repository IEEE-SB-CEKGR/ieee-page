/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'your-backend-domain.com', 'unsplash.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/Certificates',
        destination: 'https://certifyeasy-web.vercel.app/Certificates',
      },
      {
        source: '/Certificates/:path*',
        destination: 'https://certifyeasy-web.vercel.app/Certificates/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
