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
        // Replace this URL with the actual Vercel deployment URL of your C2C site
        destination: 'https://c2c-2026.vercel.app//C2C', 
      },
      {
        source: '/C2C/:path*',
        destination: 'https://c2c-2026.vercel.app//C2C/:path*',
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