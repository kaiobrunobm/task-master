# task-master
task-master is a simple Node.js CLI application to manage a todo list. 

## Features

- **Add tasks**: Quickly add new tasks to your todo list.
- **Remove tasks**: Delete tasks by their ID.
- **Complete tasks**: Mark tasks as completed.
- **List tasks**: See all your tasks, along with completion status and IDs.  
- Tasks are persisted in a local `todo-list.json` file.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/kaiobrunobm/task-master.git
   cd task-master
   ```
2. Install dependencies (if any in the future):
   ```
   npm install
   ```

### Usage

Run the CLI with Node.js, using one of the available commands. 

#### Add a Task

```
npm run todo add "Your task title"
```

#### Remove a Task (by ID)

```
npm run todo remove <task_id>
```

#### Mark a Task as Completed (by ID)

```
npm run todo complete <task_id>
```

#### List All Tasks

```
npm run todo list
```

### Example

```
$ npm run todo add "Buy groceries"
Todo added

$ npm run todo list
[ ] Buy groceries [id:1234-...]
```

## File Structure

- `index.js`: Main CLI entry point. Handles command line arguments and task operations.
- `helper-function.js`: Functions to load and save tasks (`todo-list.json`).
- `todo-list.json`: Local file where tasks are stored persistently.

## Notes

- Each task has a unique ID. Use this ID for removing or completing tasks.
- Completed tasks are shown with `[X]`.

## License

MIT
