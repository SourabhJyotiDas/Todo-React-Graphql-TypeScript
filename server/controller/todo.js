import { Todo } from "../models/todo.js";


export const createTodo = async (req, res) => {
   try {
      const { title, description, status, dueDate } = req.body;

      if (!title) {
         return res.status(400).json({
            success: false,
            message: 'Title is required',
         });
      }

      const newTodo = new Todo({
         user: req.user._id,  // Attach the authenticated user's ID
         title,
         description,
         status: status || 'pending',  // Default status is 'pending' if not provided
         dueDate,
      });

      await newTodo.save();

      return res.status(201).json({
         success: true,
         message: 'Todo created successfully',
         todo: newTodo,
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error.message,
      });
   }
};

export const getTodos = async (req, res) => {
   try {
      const todos = await Todo.find({ user: req.user._id });

      return res.status(200).json({
         success: true,
         todos,
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error.message,
      });
   }
};


export const todoDetails = async (req, res) => {
   try {
      const { id } = req.params;

      // Find the todo by id and ensure it belongs to the authenticated user
      const todo = await Todo.findOne({ _id: id, user: req.user._id });

      if (!todo) {
         return res.status(404).json({
            success: false,
            message: 'Todo not found or you are not authorized to view it',
         });
      }

      return res.status(200).json({
         success: true,
         todo,
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error.message,
      });
   }
};


export const updateTodo = async (req, res) => {
   try {
      const { id } = req.params;
      const { title, description, status, dueDate } = req.body;

      const updatedTodo = await Todo.findOneAndUpdate(
         { _id: id, user: req.user._id },  // Ensure the todo belongs to the authenticated user
         { title, description, status, dueDate },
         { new: true, runValidators: true }  // Return the updated todo and validate the fields
      );

      if (!updatedTodo) {
         return res.status(404).json({
            success: false,
            message: 'Todo not found or you are not authorized to update it',
         });
      }

      return res.status(200).json({
         success: true,
         message: 'Todo updated successfully',
         todo: updatedTodo,
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error.message,
      });
   }
};


export const deleteTodo = async (req, res) => {
   try {
      const { id } = req.params;

      const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });

      if (!deletedTodo) {
         return res.status(404).json({
            success: false,
            message: 'Todo not found or you are not authorized to delete it',
         });
      }

      return res.status(200).json({
         success: true,
         message: 'Todo deleted successfully',
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error.message,
      });
   }
};
