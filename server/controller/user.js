import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";


export const getAllUsers = async (parent, args, { req, res }) => {

   try {

      // if (!req.user) throw new Error("unauthorised: Login first");

      const users = await User.find({});
      return users;
   } catch (error) {
      throw new Error(error.message);
   }
};



export const register = async (parent, args, { req, res }) => {

   try {

      if (!args.username || !args.password || !args.email) {
         throw new Error("Please fill all fields");
      }

      const existingUser = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
      if (existingUser) {
         throw new Error("User already exist.");
      }

      const hashedPassword = await bcrypt.hash(args.password, 10);

      const newUser = await User.create({
         username: args.username,
         password: hashedPassword,
         email: args.email,
      });

      // Generate a JWT token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
         expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      });

      // Set the token in cookies
      res.cookie('token', token, {
         httpOnly: true,
         secure: true,// Must be true for cross-site cookies
         sameSite: 'none',  // Allow cross-site access
         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });


      return ({
         message: 'User registered successfully',
         user: newUser
      });
   } catch (error) {
      throw new Error(error.message);
   }
};


export const login = async (parent, args, { req, res }) => {
   try {
      const { password, email } = args;

      if (!password || !email) {
         throw new Error("fields required");
      }

      const user = await User.findOne({ email }).select('+password');

      if (!user) throw new Error("User not found");

      const isPasswordMatching = await bcrypt.compare(password, user.password);

      if (!isPasswordMatching) {
         throw new Error("Invalid credentials");
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
         expiresIn: process.env.JWT_EXPIRES_IN || '7d', // Set expiration time
      });

      // Set the token in cookies
      res.cookie('token', token, {
         httpOnly: true,
         secure: true,// Must be true for cross-site cookies
         sameSite: 'none',  // Allow cross-site access
         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });


      return ({
         message: 'Login successfully',
         user: user
      });
   } catch (error) {
      throw new Error(error.message);
   }
};


export const userDetails = (parent, args, { req, res }) => {
   try {
      // Ensure `req.user` is available
      if (!req.user) throw new Error("unauthorised: Login first");

      const user = req.user;
      return user;
   } catch (error) {
      throw new Error(error.message);
   }
};



export const logout = (parent, args, { req, res }) => {
   try {
      // Clear the token from cookies

      res.clearCookie('token', {
         httpOnly: true,
         secure: "true",
         sameSite: 'none' // Must match the original setting
      });


      return ({
         success: true,
         message: "Logout successfully"
      })

   } catch (error) {
      throw new Error(error.message);
   }
};



export const updateUserDetails = async (parent, args, { req, res }) => {
   try {
      const { username, email, phone } = args;

      console.log(username, email, phone)

      // Ensure user is authenticated (req.user is set by `authMiddleware` middleware)
      if (!req.user) {
         throw new Error("unauthorised: Login first");
      }

      // Update user fields
      const user = await User.findById(req.user._id);

      console.log(user)

      if (!user) {
         throw new Error("User not found.");
      }

      if (username) {
         user.username = username;
      }
      if (email) {
         user.email = email
      }
      if (phone) {
         user.phone = phone
      }

      await user.save();

      return ({
         success: true,
         message: "User updated Successfully"
      })

   } catch (error) {
      throw new Error(error.message);
   }
};


export const updatePassword = async (parent, args, { req, res }) => {
   try {
      const { oldPassword, newPassword } = req.body;

      if (!req.user) throw new Error("unauthorised: Login first");

      const user = await User.findById(req.user._id).select('+password'); // Include password field

      const isPasswordMatching = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordMatching) {
         throw new Error("old password is incorrect");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the password
      user.password = hashedPassword;
      await user.save();

      return ({
         success: true,
         message: 'Password updated successfully',
      });

   } catch (error) {
      throw new Error(error.message);
   }
};


export const deleteAccount = async (parent, args, { req, res }) => {
   try {
      if (!req.user) throw new Error("unauthorised: Login first");

      // Delete the user account from the database
      const deletedUser = await User.findByIdAndDelete(req.user._id);

      if (!deletedUser) {
         throw new Error("User not found or Already deleted");
      }

      res.clearCookie('token', {
         httpOnly: true,
         secure: "true",
         sameSite: 'none' // Must match the original setting
      });

      return ({
         success: true,
         message: 'Account deleted successfully',
      });
   } catch (error) {
      throw new Error(error.message);
   }
};