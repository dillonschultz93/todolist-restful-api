# todolist-restful-api

A RESTful CRUD API that keeps track of todo items.

## The stack:

- Node
- Express
- MongoDB
- Mongoose

## Routes

### GET

- `/api/tasks/`: Returns an array of all tasks.
- `/api/task/:taskId`: Returns a particular task

### POST

- `/task/create/`: Creates a new task

### PUT

- `/task/:taskId/update`: Updates a particular task

### DELETE

- `/task/:taskId/delete`: Deletes a particular task
