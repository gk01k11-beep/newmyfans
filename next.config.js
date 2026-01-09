const nextConfig = {
    transpilePackages: ['puppeteer-core'],
    experimental: {
        serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
    },
};

module.exports = nextConfig;
