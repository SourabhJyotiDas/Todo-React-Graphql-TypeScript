import jwt from 'jsonwebtoken';
import { User } from '../models/user.js'; // Replace with the correct path to your User model

export const authenticateUser = async (req, res, next) => {
   try {
      // Retrieve the token from cookies
      const { token } = req.cookies;

      if (!token) {
         return res.status(401).json({
            success: false,
            message: 'Unauthorized: Login first',
         });
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID
      const user = await User.findById(decoded.id);

      if (!user) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
         });
      }

      // Attach the user to the request object
      req.user = user;

      next(); // Proceed to the next middleware or route handler
   } catch (error) {
      return res.status(401).json({
         success: false,
         message: 'Unauthorized: Invalid token',
      });
   }
};
