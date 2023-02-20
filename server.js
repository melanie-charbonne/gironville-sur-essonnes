const express = require('express')
const https = require("https");
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const httpsOptions = {
    key: fs.readFileSync('./certificates/localhost.key'),
    cert: fs.readFileSync('./certificates/localhost.crt'),
}

var corsOptions = {
    origin: ['https://gironville-sur-essonnes.local', 'https://localhost:3000'],
    credentials: true,
    methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.prepare().then(() => {
    const server = express()
    
    server.use(cors(corsOptions))
    server.use(bodyParser.json())
    // server.use(bodyParser.urlencoded({ extended: true }))
    
    server.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true)
        return handle(req, res, parsedUrl)
    })
    // server.listen(3000, (err) => {
    //     if (err) throw err
    //     console.log('> Ready on http://localhost:3000')
    // })
    https.createServer(httpsOptions, server).listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
        
})
