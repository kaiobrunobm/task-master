import express from 'express'
import { prisma } from './lib/prisma.js';

const port = process.env.SERVER_PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Todo list</h1>');
});

app.get('/tasks', async (req, res) => {
  try {
    const allTasks = await prisma.todo.findMany();
    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = await prisma.todo.create({
      data: {
        title,
        description
      }
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const updatedTask = await prisma.todo.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedTask);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.todo.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') { 
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
