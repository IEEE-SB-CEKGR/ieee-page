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
    return {
      // 'beforeFiles' forces Next.js to proxy to BuildX BEFORE looking at your own pages
      beforeFiles: [
        {
          source: '/buildx',
          destination: 'https://buildx-2026.vercel.app/',
        },
        {
          source: '/buildx/',
          destination: 'https://buildx-2026.vercel.app/',
        },
        {
          source: '/buildx/:path*',
          destination: 'https://buildx-2026.vercel.app/:path*',
        },
      ],
      // Your existing rewrites run normally afterward
      afterFiles: [
        {
          source: '/Certificates',
          destination: 'https://certifyeasy-web.vercel.app/Certificates',
        },
        {
          source: '/Certificates/:path*',
          destination: 'https://certifyeasy-web.vercel.app/Certificates/:path*',
        },
      ]
    };
  },
};

module.exports = nextConfig;