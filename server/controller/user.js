import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { User } from "../models/user.js";


export const getAllUsers = async () => {
   try {

      const users = await User.find({});
      return users;

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

export const register = async (req, res, next) => {
   try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
         return res.status(400).json({
            success: false,
            message: 'Please fill all fields',
         });
      }

      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
         return res.status(409).json({
            success: false,
            message: 'A user already exists with this username or email',
         });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
         username,
         password: hashedPassword,
         email,
      });

      // Generate a JWT token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
         expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      });

      // Set the token in cookies
      res.cookie('token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(201).json({
         success: true,
         message: 'User registered successfully',
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};


export const login = async (req, res, next) => {
   try {
      const { password, email } = req.body;

      if (!password || !email) {
         return res.status(400).json({
            success: false,
            message: 'Please fill all fields',
         });
      }

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
         });
      }

      const isPasswordMatching = await bcrypt.compare(password, user.password);

      if (!isPasswordMatching) {
         return res.status(401).json({
            success: false,
            message: 'Incorrect password',
         });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
         expiresIn: process.env.JWT_EXPIRES_IN || '7d', // Set expiration time
      });

      // Set the token in cookies
      res.cookie('token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production', // Secure flag for HTTPS in production
         sameSite: 'strict', // Prevent CSRF attacks
         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      });

      return res.status(200).json({
         success: true,
         message: 'Login successful',
         user,
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

export const userDetails = (req, res) => {
   try {
      // Ensure `req.user` is available
      if (!req.user) {
         return res.status(401).json({
            success: false,
            message: 'Unauthorized: No user details found',
         });
      }

      return res.status(200).json({
         success: true,
         user: req.user
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error.message,
      });
   }
};

export const logout = (req, res) => {
   try {
      // Clear the token from cookies
      res.clearCookie('token', {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production', // Only in HTTPS in production
         sameSite: 'strict', // Prevent CSRF attacks
      });

      return res.status(200).json({
         success: true,
         message: 'Logged out successfully',
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error.message,
      });
   }
};


export const updateUserDetails = async (req, res) => {
   try {
      const { username, phone, status } = req.body;

      // Ensure user is authenticated (req.user is set by `authenticateUser` middleware)
      if (!req.user) {
         return res.status(401).json({
            success: false,
            message: 'Unauthorized: No user found',
         });
      }

      // Update user fields
      const updatedUser = await User.findByIdAndUpdate(
         req.user._id,
         { username, phone, status },
         { new: true, runValidators: true } // Return the updated user and validate
      );

      if (!updatedUser) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
         });
      }

      return res.status(200).json({
         success: true,
         message: 'User details updated successfully',
         updatedUser
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error.message,
      });
   }
};


export const updatePassword = async (req, res) => {
   try {
      const { oldPassword, newPassword } = req.body;

      if (!req.user) {
         return res.status(401).json({
            success: false,
            message: 'Unauthorized: No user found',
         });
      }

      const user = await User.findById(req.user._id).select('+password'); // Include password field

      const isPasswordMatching = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordMatching) {
         return res.status(400).json({
            success: false,
            message: 'Old password is incorrect',
         });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the password
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({
         success: true,
         message: 'Password updated successfully',
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error.message,
      });
   }
};


export const deleteAccount = async (req, res) => {
   try {
      if (!req.user) {
         return res.status(401).json({
            success: false,
            message: 'Unauthorized: No user found',
         });
      }

      // Delete the user account from the database
      const deletedUser = await User.findByIdAndDelete(req.user._id);

      if (!deletedUser) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
         });
      }

      res.clearCookie('token', {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production', // Only in HTTPS in production
         sameSite: 'strict', // Prevent CSRF attacks
      });

      return res.status(200).json({
         success: true,
         message: 'Account deleted successfully',
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error.message,
      });
   }
};