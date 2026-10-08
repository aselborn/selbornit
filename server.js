import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(root, 'dist')
const logDir = process.env.LOG_DIR || path.join(root, 'logs')
const logFile = path.join(logDir, 'pageviews.jsonl')
const port = Number(process.env.PORT) || 80

const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
  '.json': 'application/json', '.woff2': 'font/woff2',
}

fs.mkdirSync(logDir, { recursive: true })
const out = fs.createWriteStream(logFile, { flags: 'a' })

const header = (req, name) => {
  const v = req.headers[name]
  return Array.isArray(v) ? v.join(', ') : v || null
}

function logView(req, res, ms) {
  const entry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    status: res.statusCode,
    durationMs: Math.round(ms * 100) / 100,
    ip: header(req, 'x-forwarded-for') || req.socket.remoteAddress,
    userAgent: header(req, 'user-agent'),
    referer: header(req, 'referer'),
    language: header(req, 'accept-language'),
    host: header(req, 'host'),
    dnt: header(req, 'dnt'),
  }
  out.write(JSON.stringify(entry) + '\n')
}

http.createServer((req, res) => {
  const start = process.hrtime.bigint()
  let pathname
  try {
    pathname = decodeURIComponent((req.url || '/').split('?')[0])
  } catch {
    res.statusCode = 400
    return res.end('Bad request')
  }
  let file = path.join(dist, path.normalize(pathname))
  if (file !== dist && !file.startsWith(dist + path.sep)) {
    res.statusCode = 403
    return res.end('Forbidden')
  }
  const isPage = !path.extname(pathname)
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(dist, 'index.html')

  if (isPage) {
    res.on('finish', () => logView(req, res, Number(process.hrtime.bigint() - start) / 1e6))
  }
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream')
  fs.createReadStream(file).on('error', () => { res.statusCode = 500; res.end() }).pipe(res)
}).listen(port, () => console.log(`Serving on http://localhost:${port}, logging to ${logFile}`))
