/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set the project root to avoid the multiple lockfile warning
  turbopack: {
    root: __dirname,
  },
  // Enable the App Router (app/ directory) – default in Next 13+
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
