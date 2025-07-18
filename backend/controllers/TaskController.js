import express from 'express';
import Task from '../models/Task.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require auth
router.use(authenticate);

// Create task
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, userId: req.userId });
  res.status(201).json(task);
});

// Get user's tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  if(!tasks){
    res.json({message:"Task not Found"})
  }
  res.json(tasks);
});

// Get a single task by ID
router.get('/:id', async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
});

// Update task
router.put('/:id', async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(task);
});

// Delete task
router.delete('/:id', async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Task deleted' });
});

export default router;
