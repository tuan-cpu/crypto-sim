/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'gateway.pinata.cloud',
          port: '',
          pathname: '/ipfs/**',
        },
      ],
    },
  }