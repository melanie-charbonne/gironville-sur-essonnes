const path = require('path')

module.exports = {
    // async headers() {
    //     return [
    //         {
    //             source: '/:path*',
    //             headers: [
    //                 { key: 'Access-Control-Allow-Credentials', value: 'true' },
    //                 { key: 'Access-Control-Allow-Origin', value: 'https://gironville-sur-essonnes.local, https://localhost:3000' },
    //                 {
    //                     key: 'Access-Control-Allow-Methods',
    //                     value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    //                 },
    //                 {
    //                     key: 'Access-Control-Allow-Headers',
    //                     value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    //                 },
    //             ],
    //         },
    //     ]
    // },

    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        domains: ['localhost', 'gironville-sur-essonnes.local'],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })
        return config
    },
}
