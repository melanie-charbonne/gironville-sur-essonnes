const express = require('express')
const https = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookie = require('cookie')


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

    server.use(express.json)

    server.use(cors(corsOptions))
    //server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    server.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true)
        return handle(req, res, parsedUrl)
    })
    // server.post('/api/login', (req, res) => {
    //     // const parsedUrl = parse(req.url, true)
    //     // return handle(req, res, parsedUrl)
    //     const { username, password } = req.body.data
    //     res.json({
    //         username,
    //         password,
    //         success: true
    //     })
        
    //     // const data = req?.body?.data ?? ''
    //     // res.setHeader(
    //     //     'Set-Cookie',
    //     //     cookie.serialize('auth', String(data.login?.authToken ?? ''), {
    //     //         httpOnly: true,
    //     //         secure: 'development' !== process.env.NODE_ENV,
    //     //         path: '/',
    //     //         maxAge: 60 * 60 * 24 * 7, // 1 week
    //     //     })
    //     // )

    //     // // Only sending a message that successful, because we dont want to send JWT to client.
    //     // res.status(200).json({ success: Boolean(data?.login?.authToken) })
    // })
    // server.listen(3000, (err) => {
    //     if (err) throw err
    //     console.log('> Ready on http://localhost:3000')
    // })
    https.createServer(httpsOptions, server).listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on https://localhost:3000')
    })
})



// const { createServer } = require('https')
// const { parse } = require('url')
// const next = require('next')
// const fs = require('fs')
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()
// const httpsOptions = {
//     key: fs.readFileSync('./certificates/localhost.key'),
//     cert: fs.readFileSync('./certificates/localhost.crt'),
// }
// app.prepare().then(() => {
//     createServer(httpsOptions, (req, res) => {
//         const parsedUrl = parse(req.url, true)
//         handle(req, res, parsedUrl)
//     }).listen(3000, (err) => {
//         if (err) throw err
//         console.log('> Server started on https://localhost:3000')
//     })
// })
