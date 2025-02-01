import express from 'express';
import { authenticateUser } from '../middleware/checkAuth.js';  // Middleware to authenticate the user
import { createTodo, getTodos, updateTodo, deleteTodo, todoDetails } from '../controller/todo.js';

const router = express.Router();

router.post('/create', authenticateUser, createTodo);

router.get('/todos', authenticateUser, getTodos);

router.get('/details/:id', authenticateUser, todoDetails);

router.put('/update/:id', authenticateUser, updateTodo);

router.delete('/delete/:id', authenticateUser, deleteTodo);

export default router;
