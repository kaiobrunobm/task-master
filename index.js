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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
