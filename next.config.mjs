/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // puppeteer-core and @sparticuz/chromium must be treated as external packages
        // to function correctly in the Vercel serverless environment.
        serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
    },
};

export default nextConfig;
