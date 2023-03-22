import Cookie from 'cookie'

export function parseCookies(req) {
    if (req.headers) return Cookie.parse(req.headers?.cookie || '')
    else Cookie.parse(req ? req.cookie : '')
}

export function getAuthToken(req) {
    const cookies = parseCookies(req)
    return cookies.auth || ''
}
