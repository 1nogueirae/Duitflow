module.exports = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 1
        },
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string',
            minLength: 6
        },
        role: {
            type: 'string',
            enum: ['admin', 'user']
        }
    },
    required: ['name', 'email', 'password'],
    additionalProperties: false
}