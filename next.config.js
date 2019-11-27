require('dotenv').config()

const withCSS = require('@zeit/next-css')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const path = require('path')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const nextConfig = {
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    BASE_URL: process.env.BASE_URL,
    TITLE: process.env.TITLE
  },
  webpack: (config, { dev }) => {
    const oldEntry = config.entry

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

    config.optimization.minimizer = []
    config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}))

    return config
  }
}

module.exports = withCSS(nextConfig)
