import type { NextConfig } from "next";
const path = require("path");
const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
};

module.exports = {
  webpack: (config: { resolve: { alias: { [x: string]: any; }; }; }) => {
    config.resolve.alias["@public"] = path.join(__dirname, "public");
    return config;
  },
};
export default nextConfig;
