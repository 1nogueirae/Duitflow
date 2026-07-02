require('dotenv').config();

const cors = require('cors')

const apiTasksRoute = require('./routes/api/apiTasks.route')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/tasks', apiTasksRoute)

app.use((err, req, res, next) => {
    const status = err.status ?? 500
    const fallbackMessage = status >= 400 && status < 500 ? 'Bad request' : 'An error occurred'
    const clientMessage = err.message ?? fallbackMessage

    if (status >= 500) {
        console.error(err)
    } else {
        console.warn(`[${req.method} ${req.originalUrl}] ${clientMessage}`)
    }

    const message = status >= 500 ? 'Internal server error' : clientMessage
    res.status(status).json({ message })
})

app.listen(port, () => {
    console.log(`Server started at ${port} port`)
})
