import { randomUUID } from 'node:crypto'
import { loadTasks, saveTask } from './helper-function.js'
const cliComand = process.argv.slice(2)

if (cliComand.length > 2) {
  throw new SyntaxError('Task master only accepts two command: "action" and "task/id"')
}

switch (cliComand[0]) {
  case 'add':
    let tasks = [];

    tasks = loadTasks();

    const newDataTodo = {
      id: randomUUID(),
      title: cliComand[1],
      completed: false,
      createdAt: new Date()
    }

    tasks.push(newDataTodo)

    saveTask(tasks)

    console.log("Todo added")
    break;
  case 'remove':

    let tasksToRemove = [];

    tasksToRemove = loadTasks();

    const updatedTaskRemoved = tasksToRemove.filter(task => task.id !== cliComand[1])
    saveTask(updatedTaskRemoved)

    console.log("Todo removed")

    break;
  case 'complete':

    let tasksToUpdate = [];
    tasksToUpdate = loadTasks();

    const updatedTask = tasksToUpdate.map(task => {
      if (task.id === cliComand[1]) {
        return {
          ...task,
          completed: true
        }
      } else {
        return task
      }
    })

    saveTask(updatedTask)
    console.log("Todo completed")

    break;
  case 'list':
    const tasksList = loadTasks();
    
    if (tasksList.length <= 0) {
      throw new Error('No tasks found')
    }

    tasksList.forEach(task => {
      console.log(`[${task.completed ? 'X' : ' '}] ${task.title} [id:${task.id}]`)
    })
    break;
  case undefined: 
    console.log('No command provided')
    break;
  default:
    console.log('Unknown command')
    break;
}
