import jwt from 'jsonwebtoken';
import { User } from '../models/user.js'; // Replace with the correct path to your User model


export const authMiddleware = async (req, res, next) => {
   const token = req.cookies.token; // Read token from cookies

   if (!token) {
      req.user = null; // No token, no user
      return next();
   }

   try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID
      const user = await User.findById(decoded.id);

      if (!user) {
         req.user = null;
         return res.status(404).json({
            success: false,
            message: 'User not found',
         });
      }

      // Attach the user to the request object
      req.user = user;
   } catch (err) {
      console.error("Invalid Token", err);
      req.user = null;
   }

   next();
};
