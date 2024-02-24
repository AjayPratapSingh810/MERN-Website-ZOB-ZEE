import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { registerUser, loginUser, getUser, logoutUser } from "../controllers/userController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getuser", isAuthenticated, getUser);
router.get("/logout", isAuthenticated, logoutUser)

export default router;