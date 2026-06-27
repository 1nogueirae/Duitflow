const { Task: Tasks } = require('../../database/models')
const express = require('express');
const router = express.Router();
const taskMiddleware = require('../../middlewares/tasksMiddleware')

router.get('/', async (req, res) => {
    const tasks = await Tasks.findAll()
    res.json(tasks)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const task = await Tasks.findByPk(id)
    if (task) {
        res.status(200).json({ message: `Task searched successfully`, task: task })
    } else {
        res.status(404).json({ message: `Task not found` })
    }
})

router.post('/', taskMiddleware, async (req, res) => {
    const data = req.body
    await Tasks.create(data)

    res.status(201).json({ message: `Task created successfully`, task: data })
})

router.put('/:id', taskMiddleware, async (req, res) => {
    const data = req.body
    const id = req.params.id
    const task = await Tasks.findByPk(id)

    if (task && data) {
        task.title = data.title
        task.description = data.description
        task.status = data.status ?? task.status
        task.dueDate = data.dueDate ?? task.dueDate
        task.dueTime = data.dueTime ?? task.dueTime
        await task.save()
        res.status(200).json({ message: `Task updated successfully`, task })
    } else {
        res.status(404).json({ error: 'Task not found' })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const task = await Tasks.findByPk(id)
    if (task) {
        await task.destroy()
        res.status(200).json({ message: `Task deleted successfully` })
    } else {
        res.status(404).json({ error: 'Task not found' })
    }

})

module.exports = router