import express from "express";
import { deleteAccount, login, logout, register, updatePassword, updateUserDetails, userDetails } from "../controller/user.js";
import { authenticateUser } from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/me").get(authenticateUser, userDetails);

router.route("/logout").get(authenticateUser, logout);

router.route("/update").put(authenticateUser, updateUserDetails);

router.route("/update/password").put(authenticateUser, updatePassword);

router.route("/delete").delete(authenticateUser, deleteAccount);

export default router;