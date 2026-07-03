// src/middlewares/login.middleware.js
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const loginSchema = require('../schemas/login.schema')

const ajv = new Ajv()
addFormats(ajv)

const validate = ajv.compile(loginSchema)

function loginMiddleware(req, res, next) {
    const valid = validate(req.body)

    if (valid) return next()

    return res.status(400).json({
        error: 'Invalid login data',
        errors: validate.errors
    })
}

module.exports = loginMiddleware