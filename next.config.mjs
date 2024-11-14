/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

if (process.env.NODE_ENV === 'development') {
  // we import the utility from the next-dev submodule
  const { setupDevPlatform } = await import(
    '@cloudflare/next-on-pages/next-dev'
  );

  // we call the utility with the bindings we want to have access to
  await setupDevPlatform();
}
