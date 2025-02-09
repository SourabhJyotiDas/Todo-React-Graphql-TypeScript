import { Todo } from "../models/todo.js";

export const getTodos = async (parent, { id }, { req, res }) => {
   try {

      if (!req.user) throw new Error("unauthorized: Login first")

      const todos = await Todo.find({ user: id }).populate("user")
      return todos;

   } catch (error) {
      throw new Error(error, message)
   }
};


export const createTodo = async (parent, args, { req, res }) => {
   try {

      if (!req.user) throw new Error("unauthorized: Login first");

      const { title, description } = args;

      if (!title) {
         throw new Error("Title should not be empty");
      }

      const newTodo = new Todo({
         user: req.user._id,  
         title,
         description,
         dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });

      await newTodo.save();

      return ({
         success: true,
         message: 'Todo created successfully',
      });

   } catch (error) {
      throw new Error(error, message)
   }
};




export const todoDetails = async (parent, args, { req, res }) => {
   try {
      const { id } = args;

      // Find the todo by id and ensure it belongs to the authenticated user
      const todo = await Todo.findOne({ _id: id, user: req.user._id });

      if (!todo) {
         throw new Error("Todo not found")
      }

      return todo;

   } catch (error) {
      throw new Error(error, message)
   }
};


export const updateTodo = async (parent, args, { req, res }) => {
   try {
      const { id, title, description, status, dueDate } = args;

      const updatedTodo = await Todo.findOneAndUpdate(
         { _id: id, user: req.user._id },  // Ensure the todo belongs to the authenticated user
         { title, description, status, dueDate },
         { new: true, runValidators: true }  // Return the updated todo and validate the fields
      );

      if (!updatedTodo) {
         throw new Error("Todo not found");
      }

      return ({
         success: true,
         message: 'Todo updated successfully',
      });
   } catch (error) {
      throw new Error(error, message)
   }
};


export const deleteTodo = async (parent, args, { req, res }) => {
   try {
      const { id } = args;

      const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });

      if (!deletedTodo) {
         throw new Error("Todo not found or already deleted");
      }

      return ({
         success: true,
         message: 'Todo deleted successfully',
      });
   } catch (error) {
      throw new Error(error, message)
   }
};
