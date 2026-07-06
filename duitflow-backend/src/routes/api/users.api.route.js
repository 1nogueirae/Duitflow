const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const { User } = require('../../database/models')

const registerMiddleware = require('../../middlewares/register.middleware')
const loginMiddleware = require('../../middlewares/login.middleware')
const authMiddleware = require('../../middlewares/auth.middleware')
const authRateLimiter = require('../../middlewares/rateLimit.middleware')

const express = require('express');
const router = express.Router();

const createToken = (user) => {
    return jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

router.get('/', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' })

    const users = await User.findAll()
    const usersFiltered = users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
    res.status(200).json({ message: `Users searched successfully`, users: usersFiltered })
})

router.post('/register', authRateLimiter, registerMiddleware, async (req, res) => {
    const user = req.body

    const existingUser = await User.findOne({ where: { email: user.email } })

    if (existingUser) return res.status(409).json({ error: 'User already exists' })

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(user.password, saltRounds)

    const newUser = await User.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: 'user'
    })

    const token = createToken(newUser)

    res.status(201).json({
        message: 'User created successfully',
        token: token,
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
    })

})

router.post('/login', authRateLimiter, loginMiddleware, async (req, res) => {
    const user = req.body
    const email = user.email
    const password = user.password

    const existingUser = await User.findOne({ where: { email } })
    if (!existingUser) return res.status(401).json({ error: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, existingUser.password)

    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })

    const token = createToken(existingUser)

    res.json({
        message: 'Login successful',
        token: token,
        user: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role
        }
    })
})

module.exports = router