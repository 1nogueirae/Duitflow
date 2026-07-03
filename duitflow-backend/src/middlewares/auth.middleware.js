const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ error: 'Token not provided' })

    const parts = authHeader.split(' ')

    if (parts.length !== 2) return res.status(401).json({ error: 'Token malformatted' })

    const [, token] = parts

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        return next()
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' })
    }
}

module.exports = authMiddleware