/** 
 * @type {import('next').NextConfig} 
 * */
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/crypto-sim-9b9c4.appspot.com/o/avatarImages**'
      }
    ],
  },
}