import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Refers to the 'User' model
      required: true,
   },
   title: {
      type: String,
      required: true,
      trim: true,
   },
   description: {
      type: String,
      trim: true,
   },
   status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
   },
   dueDate: {
      type: Date,
   },
}, {
   timestamps: true, // Automatically adds createdAt and updatedAt
});

// Middleware to update `updatedAt` on save
todoSchema.pre('save', function (next) {
   this.updatedAt = Date.now();
   next();
});

export const Todo = mongoose.model('Todo', todoSchema);

