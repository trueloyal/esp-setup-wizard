import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/esp-setup-wizard",
  images: { unoptimized: true },
};

export default nextConfig;
