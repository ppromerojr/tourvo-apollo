const { createServer } = require('http')
const path = require('path')
const next = require('next')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handleNextRequests = app.getRequestHandler()

const PORT = process.env.PORT || 3000

const staticFiles = ['sw.js', 'robots.txt', 'favicon.ico', 'manifest.json']

const isStaticFile = name =>
  staticFiles.includes(name) || isGoogleHTMLFile(name)
const isGoogleHTMLFile = name => !!name.match(/^google(\w+)\.html$/)

app.prepare().then(_ => {
  const server = createServer((req, res) => {
    let requestPath = req.url.replace(/^\/+/, '')

    if (isStaticFile(requestPath)) {
      app.serveStatic(req, res, path.resolve(`./public/static/${requestPath}`))
    } else {
      handleNextRequests(req, res)
    }
  })

  server.listen(PORT, err => {
    if (err) throw err

    console.log(`> App running on port ${PORT}`, process.env.NODE_ENV)
  })
})
