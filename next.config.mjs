/** @type {import('next').NextConfig} */

// for github pages
const nextConfig = {
  //COMMENT 2 LINES FOR DEV.
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
  };

export default nextConfig;
