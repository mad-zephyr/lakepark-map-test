/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    // config.module.rules.push({
    //   test: /\.fbx$/,
    //   use: [
    //     {
    //       loader: "file-loader",
    //       options: {
    //         name: "[path][name].[ext]",
    //       },
    //     },
    //   ],
    // });

    return config;
  },
};

export default nextConfig;
