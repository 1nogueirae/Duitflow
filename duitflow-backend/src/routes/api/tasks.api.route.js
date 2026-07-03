const { Task } = require('../../database/models')
const express = require('express')
const router = express.Router()

const taskMiddleware = require('../../middlewares/tasks.middleware')
const authMiddleware = require('../../middlewares/auth.middleware')

router.get('/', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' })

    const tasks = await Task.findAll()

    return res.status(200).json({
        message: 'Tasks searched successfully',
        tasks
    })
})

router.get('/me', authMiddleware, async (req, res) => {
    const tasks = await Task.findAll({
        where: {
            userId: req.user.id
        }
    })

    return res.status(200).json({
        message: 'Tasks searched successfully',
        tasks
    })
})

router.get('/:id', authMiddleware, async (req, res) => {
    const task = await Task.findByPk(req.params.id)

    if (!task) return res.status(404).json({ error: 'Task not found' })

    if (req.user.role !== 'admin' && task.userId !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' })
    }

    return res.status(200).json({
        message: 'Task searched successfully',
        task
    })
})

router.post('/', authMiddleware, taskMiddleware, async (req, res) => {
    const task = await Task.create({
        ...req.body,
        userId: req.user.id
    })

    return res.status(201).json({
        message: 'Task created successfully',
        task
    })
})

router.put('/:id', authMiddleware, taskMiddleware, async (req, res) => {
    const task = await Task.findByPk(req.params.id)

    if (!task) {
        return res.status(404).json({ error: 'Task not found' })
    }

    if (req.user.role !== 'admin' && task.userId !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' })
    }

    Object.assign(task, req.body)

    if (req.user.role !== 'admin') {
        task.userId = req.user.id
    }

    await task.save()

    return res.status(200).json({
        message: 'Task updated successfully',
        task
    })
})

router.delete('/:id', authMiddleware, async (req, res) => {
    const task = await Task.findByPk(req.params.id)

    if (!task) {
        return res.status(404).json({ error: 'Task not found' })
    }

    if (req.user.role !== 'admin' && task.userId !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' })
    }

    await task.destroy()

    return res.status(200).json({
        message: 'Task deleted successfully'
    })
})

module.exports = router