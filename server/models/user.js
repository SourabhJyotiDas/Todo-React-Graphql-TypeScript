import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      validate: {
         validator: function (value) {
            // Ensures no spaces in the username
            return !/\s/.test(value);
         },
         message: 'Username should not contain spaces.',
      },
   },
   password: {
      select: false,
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format.'],
   },
   phone: {
      type: String,
   },
   status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
   },
   verified: {
      type: Boolean
   }
}, {
   timestamps: true, // Adds createdAt and updatedAt automatically
});

// Middleware to update `updatedAt` on every save
userSchema.pre('save', function (next) {
   this.updatedAt = Date.now();
   next();
});

// Middleware to hash the password before saving if it's modified
userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      return next(); // Skip if passwordHash is not modified
   }
});

export const User = mongoose.model('User', userSchema);


