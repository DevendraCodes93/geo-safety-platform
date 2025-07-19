/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  // Only use basePath and assetPrefix for GitHub Pages deployment
  basePath: isGitHubPages ? "/Crypgo" : "",
  assetPrefix: isGitHubPages ? "/Crypgo/" : "",
  images: {
    unoptimized: true,
  },
  // Ensure proper trailing slash handling
  trailingSlash: true,
};

export default nextConfig;
