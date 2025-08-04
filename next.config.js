const path = require("path");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Redirect all imports of "react-router-dom" to our tiny shim.
    config.resolve.alias["react-router-dom"] = path.join(
      __dirname,
      "src/lib/next-router-adapter.js"
    );
    return config;
  },
};

module.exports = nextConfig;