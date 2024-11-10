import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    api: "modern-compiler",
    quietDeps: true,
    silenceDeprecations: ['legacy-js-api'],
  },
};

export default nextConfig;
