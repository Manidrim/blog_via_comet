// next.config.js - VERSION SÉCURISÉE avec Headers OWASP
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      allowedOrigins: ["localhost:3000"], // ✅ Limiter les origines
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },

  // ✅ Headers de sécurité OBLIGATOIRES (OWASP Top 10:2025)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // ⚠️ Next.js nécessite unsafe-eval en dev
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' https://*.vercel-storage.com https://*.public.blob.vercel-storage.com data: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://vercel.live",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;