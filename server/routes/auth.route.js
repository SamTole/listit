import express from "express";
import { signup, login, logout, addCategory, checkAuth } from '../controllers/auth.controller.js';
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// First it will call the verifyToken function, then it will call the checkAuth function. This is done by the "next" parameter in the verifyToken function
// This route is protected. If there is a token, it will call the next function: checkAuth
router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/addCategory", addCategory);
router.post("/logout", logout);

export default router;