module.exports = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push('@prisma/client')
        }
        return config
    },
    images: {
        domains: ['raw.githubusercontent.com'],
    },
    productionBrowserSourceMaps: true
}