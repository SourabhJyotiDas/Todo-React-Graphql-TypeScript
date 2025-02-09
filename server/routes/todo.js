import express from 'express';
import { authMiddleware } from '../middleware/checkAuth.js';  // Middleware to authenticate the user
import { createTodo, getTodos, updateTodo, deleteTodo, todoDetails } from '../controller/todo.js';

const router = express.Router();

router.post('/create', authMiddleware, createTodo);

router.get('/todos', authMiddleware, getTodos);

router.get('/details/:id', authMiddleware, todoDetails);

router.put('/update/:id', authMiddleware, updateTodo);

router.delete('/delete/:id', authMiddleware, deleteTodo);

export default router;
