import express from "express";
import { createTodo } from "../controller/todo.js";

const router = express.Router();

router.route("/create", createTodo)

export default router;