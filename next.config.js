require('dotenv').config();

const path = require('path');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const withCss = require('@zeit/next-css');

const nextConfig = {
    env: {
        GRAPHQL_URL: process.env.GRAPHQL_URL,
        API_URL: process.env.API_URL,
        BASE_URL: process.env.BASE_URL,
        TITLE: process.env.TITLE,
        GA_TRACKING_CODE: process.env.GA_TRACKING_CODE
    },
    webpack: (config, { dev, isServer }) => {
        const oldEntry = config.entry

        config.entry = () =>
            oldEntry().then(entry => {
                entry['main.js'] &&
                    entry['main.js'].push(path.resolve('./utils/offline'))
                return entry
            })

        if (isServer) {
            const antStyles = /antd\/.*?\/style\/css.*?/
            const origExternals = [...config.externals]
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback()
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback)
                    } else {
                        callback()
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ]

            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader',
            })
        }

        /* Enable only in Production */
        if (!dev) {
            // Service Worker
            config.plugins.push(
                new SWPrecacheWebpackPlugin({
                    cacheId: 'next-ss',
                    filepath: './public/static/sw.js',
                    minify: true,
                    staticFileGlobsIgnorePatterns: [/\.next\//],
                    staticFileGlobs: [
                        'static/**/*' // Precache all static files by default
                    ],
                    runtimeCaching: [
                        // Example with different handlers
                        {
                            handler: 'fastest',
                            urlPattern: /[.](png|jpg|css)/
                        },
                        {
                            handler: 'networkFirst',
                            urlPattern: /^http.*/ // cache all files
                        }
                    ]
                })
            )
        }

        return config
    }
}

module.exports = withCss(nextConfig);
