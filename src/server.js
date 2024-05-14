import path from 'path'
import express from 'express'
const compression = require('compression')

const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, 'index.html')

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) return false
  return compression.filter(req, res)
}

app.use(express.static(DIST_DIR))
app.use(
  compression({
    level: 6, // set compression level from 1 to 9 (6 by default)
    filter: shouldCompress, // set predicate to determine whether to compress
  })
)
  
app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

const PORT = process.env.PORT || 8082
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
