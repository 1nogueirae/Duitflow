module.exports = {
    type: 'object',

    properties: {
        title: {
            type: 'string'
        },

        description: {
            type: 'string'
        },

        status: {
            type: 'string',
            enum: ['pending', 'in_progress', 'done']
        },

        dueDate: {
            type: 'string'
        },

        dueTime: {
            type: 'string'
        }
    },

    required: ['title', 'status'],

    additionalProperties: false
};