const rateLimit = require('express-rate-limit')

const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({ error: 'Too many attempts, try again later' })
    }
})

module.exports = authRateLimiter