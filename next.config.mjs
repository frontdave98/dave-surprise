/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
