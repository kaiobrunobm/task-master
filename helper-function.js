import fs from 'node:fs'
import path from 'node:path'

const todoListJsonPath = path.join('./todo-list.json')

export const loadTasks = () => {
  if (fs.existsSync(todoListJsonPath)) {
    const fileData = fs.readFileSync(todoListJsonPath, 'utf-8');

    try {
      return JSON.parse(fileData)
    } catch (error) {
      console.log(error)
      return []
    }
  }

  return []
}

export const saveTask = (tasks) => {
  fs.writeFileSync(todoListJsonPath, JSON.stringify(tasks, null, 2))
}
