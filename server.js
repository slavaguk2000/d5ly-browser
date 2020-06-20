// Express
const express = require('express')
const app = express()

module.exports = require('pako')

// Serve static files from /public
app.use( express.static('public', {
    setHeaders: (res, path, stat) => {
          if (path.endsWith('.wasm')) {
                  res.set('Content-Type', 'application/wasm')
                    }
                  }
                }) )

                // Start server
app.listen( 2223, () => console.log('Server running on port 2223!') )