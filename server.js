const { createServer } = require("http")
const path = require("path")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev: process.env.NODE_ENV !== "production" })
const handleNextRequests = app.getRequestHandler()

const PORT = 3000

app.prepare().then(_ => {
  const server = createServer((req, res) => {
    if (req.url === "/sw.js" || req.url === "/robots.txt") {
      app.serveStatic(req, res, path.resolve("./public/static" + req.url))
    } else if (req.url === "/favicon.ico") {
      app.serveStatic(req, res, path.resolve("./public/static" + req.url))
    } else if (req.url === "/manifest.json") {
      app.serveStatic(req, res, path.resolve("./public/static" + req.url))
    } else {
      handleNextRequests(req, res)
    }
  })

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`> App - running on port ${PORT}`)
  })
})