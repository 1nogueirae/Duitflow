const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const registerSchema = require('../schemas/register.schema')

const ajv = new Ajv()
addFormats(ajv)

const validate = ajv.compile(registerSchema)

function registerMiddleware(req, res, next) {
    const valid = validate(req.body)

    if (valid) return next()

    return res.status(400).json({
        error: 'Invalid register data',
        errors: validate.errors
    })
}

module.exports = registerMiddleware