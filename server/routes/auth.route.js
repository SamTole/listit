import express from "express";
import { signup, login, logout, checkAuth } from '../controllers/auth.controller.js';
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// First it will call the verifyToken function, then it will call the checkAuth function. This is done by the "next" parameter in the verifyToken function
router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;