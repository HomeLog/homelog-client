/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'homelog-dev.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'homelog.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'homelog-storage',
        port: '9000',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = isServer;
    }

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
