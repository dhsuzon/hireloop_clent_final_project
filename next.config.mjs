/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow avatar / company-logo images served over HTTPS from your backend/CDN.
    // Tighten `hostname` to your actual domain(s) once known.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
