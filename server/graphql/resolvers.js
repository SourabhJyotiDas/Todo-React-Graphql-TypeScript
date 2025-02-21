import { getTodos, createTodo, deleteTodo, todoDetails, updateTodo, chnageTodoStatus } from "../controller/todo.js";
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
    updateUserDetails: updateUserDetails,
    updateUserPassword: updatePassword,
    deleteUserAccount: deleteAccount,

    createNewTodo: createTodo,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo,
    chnageTodoStatus: chnageTodoStatus
  },


};
