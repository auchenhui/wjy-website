import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Shared cPanel accounts often impose a very low process limit. Keep the
    // production build from spawning a pool of Node.js child processes.
    cpus: 1,
    workerThreads: true,
    webpackBuildWorker: false,
  },
};

export default nextConfig;
