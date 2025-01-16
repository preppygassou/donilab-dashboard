/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.REACT_APP_BASE_URL + '/:path*',
      }
    ]
  },

  images: { 
    /* remotePatterns:['upload.donilab.ml'], */
    /* domains: ['https://api.donilab.ml'], */
    unoptimized: true 
  },
}
 
export default nextConfig