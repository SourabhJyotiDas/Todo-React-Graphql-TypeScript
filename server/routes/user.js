import express from "express";
import { deleteAccount, login, logout, register, updatePassword, updateUserDetails, userDetails } from "../controller/user.js";
import { authMiddleware } from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/me").get(authMiddleware, userDetails);

router.route("/logout").get(authMiddleware, logout);

router.route("/update").put(authMiddleware, updateUserDetails);

router.route("/update/password").put(authMiddleware, updatePassword);

router.route("/delete").delete(authMiddleware, deleteAccount);

export default router;