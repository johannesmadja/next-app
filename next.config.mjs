import path from "path";
import { fileURLToPath } from "url";

// 1. Recréer l'équivalent de __dirname en ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  sassOptions: {
    loadPaths: [path.join(__dirname, "src/styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/w500/**",
      },
    ],
  },
};

export default nextConfig;
