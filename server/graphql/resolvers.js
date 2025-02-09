import { getTodos, createTodo, deleteTodo, todoDetails, updateTodo } from "../controller/todo.js";
import { deleteAccount, login, logout, register, updatePassword, updateUserDetails, userDetails, getAllUsers } from "../controller/user.js";

export const resolver = {

  Query: {
    Todos: getTodos,
    Users: getAllUsers,
    userDetails: userDetails,
    todoDetails: todoDetails,
  },

  Mutation: {

    createNewUser: register,
    logoutUser: logout,
    loginUser: login,
    updateUserPassword: updatePassword,
    updateUserDetails: updateUserDetails,
    deleteUserAccount: deleteAccount,

    createNewTodo: createTodo,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo,

  },


};
