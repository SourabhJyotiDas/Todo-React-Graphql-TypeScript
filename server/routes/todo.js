import express from 'express';
import { authenticateUser } from '../middleware/checkAuth.js';  // Middleware to authenticate the user
import { createTodo, getTodos, updateTodo, deleteTodo, todoDetails } from '../controller/todo.js';

const router = express.Router();

router.post('/todos', authenticateUser, createTodo);

router.get('/todos', authenticateUser, getTodos);

router.get('/todos/:id', authenticateUser, todoDetails);

router.put('/todos/:id', authenticateUser, updateTodo);

router.delete('/todos/:id', authenticateUser, deleteTodo);

export default router;
