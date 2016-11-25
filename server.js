'use strict'

const http = require('http')
const url = `https://telegram.me/${process.env.CHANNEL.slice(1)}`

const server = http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end(`This is Atomic Robo bot on <a href = '${url}'>${url}</a>`)
})

server.listen(process.env.PORT)

console.log(`Server running at http://${process.env.IP}:${process.env.PORT}/`)
