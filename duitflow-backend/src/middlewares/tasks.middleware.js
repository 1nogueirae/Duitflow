const Ajv = require('ajv')
const ajv = new Ajv()
const addFormats = require('ajv-formats')
const taskSchema = require('../schemas/task.schema')
addFormats(ajv)

const validate = ajv.compile(taskSchema)

async function taskValidate(req, res, next) {
    const task = req.body
    const valid = validate(task)

    if (valid) {
        next()
    } else {
        res.status(400).json({ error: 'Invalid task data', errors: validate.errors })
    }
}

module.exports = taskValidate