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
      beforeFiles: [
        {
          source: '/circuitron2026',
          destination: 'https://your-circuitron-domain.vercel.app',
        },
        {
          source: '/circuitron2026/',
          destination: 'https://your-circuitron-domain.vercel.app/',
        },
        {
          source: '/circuitron2026/:path*',
          destination: 'https://your-circuitron-domain.vercel.app/:path*',
        },

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
        {
          source: '/C2C',
          destination: 'https://c2c-2026.vercel.app',
        },
        {
          source: '/C2C/',
          destination: 'https://c2c-2026.vercel.app/', 
        },
        {
          source: '/C2C/:path*',
          destination: 'https://c2c-2026.vercel.app/:path*', 
        },
      ],
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