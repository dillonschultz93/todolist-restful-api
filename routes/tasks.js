const router = require('express').Router();

// Controllers
const {
  getTaskById,
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/Task');

router.param('taskId', getTaskById);

router.get('/tasks/', getAllTasks);

router.get('/task/:taskId/', getTask);

router.post('/task/create/', createTask);

router.put('/task/:taskId/update', updateTask);

router.delete('/task/:taskId/delete', deleteTask);

module.exports = router;
