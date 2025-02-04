import { getTodos, createTodo, deleteTodo, todoDetails, updateTodo } from "../controller/todo.js";
import { deleteAccount, login, logout, register, updatePassword, updateUserDetails, userDetails,getAllUsers } from "../controller/user.js";

export const resolver = {

  Query: {
    Todos: getTodos,
    Users:getAllUsers,
  },
};
