/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:process.env.REACT_APP_BASE_URL +`/:path*`,
      }
    ]
  },
  images: { 
    domains: ['upload.donilab.ml'], 
},
}
 
export default nextConfig