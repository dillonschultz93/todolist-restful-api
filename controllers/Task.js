const Task = require('../models/Task');

// Get a task by it's id from the param
exports.getTaskById = (request, response, next, taskId) => {
  Task.findById(taskId).exec((error, task) => {
    error || !task
      ? response.status(400).json({ error: 'Tasks not found' })
      : (request.task = task);

    next();
  });
};

// Get all tasks
exports.getAllTasks = (request, response) => {
  Task.find()
    .sort('-createdAt')
    .exec((error, tasks) => {
      error || !tasks
        ? response.status(400).json({ error: 'Something went wrong' })
        : response.json(tasks);
    });
};

exports.getTask = (request, response) => {
  return response.json(request.task);
};

exports.createTask = (request, response) => {
  const task = new Task(request.body);

  task.save((error, task) => {
    error || !task
      ? response.status(400).json({ error: 'Something went wrong' })
      : response.json({ task });
  });
};

exports.updateTask = (request, response) => {
  const task = request.task;

  task.task = request.body.task;
  task.completed = request.body.completed;

  task.save((error, item) => {
    error || !item
      ? response.status(400).json({ error: 'Something went wrong' })
      : response.json(item);
  });
};

exports.deleteTask = (request, response) => {
  const task = request.task;

  task.remove((error, task) => {
    error || !task
      ? response.status(400).json({ error: 'Something went wrong' })
      : response.json({ task_deleted: task, message: 'Task deleted' });
  });
};
