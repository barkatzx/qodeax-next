import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/services/:path*", destination: "/#services", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/sitemap", destination: "/sitemap.xml", permanent: true },
      { source: "/career", destination: "/", permanent: true },
      { source: "/career/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
