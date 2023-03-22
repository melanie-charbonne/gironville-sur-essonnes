import { serialize } from 'cookie'

export default function login(req, res) {
    const token = req?.body?.data?.login?.authToken
    const serializeCookie = serialize('auth', String(token), {
        httpOnly: true,
        secure: 'development' !== process.env.NODE_ENV,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
    })
    
    res.setHeader('set-Cookie', serializeCookie)
    // Only sending a message that successful, because we dont want to send JWT to client.
    res.status(200).json({ success: Boolean(token) })
}

