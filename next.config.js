require('dotenv').config()

const path = require('path')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const withCss = require('@zeit/next-css')
const webpack = require('webpack')

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
    config.plugins = config.plugins || []

    config.entry = () =>
      oldEntry().then(entry => {
        entry['main.js'] &&
          entry['main.js'].push(path.resolve('./utils/offline'))
        return entry
      })

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

    config.plugins.push(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/)
    )

    return config
  }
}

module.exports = withCss(nextConfig)
