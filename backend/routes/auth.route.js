import express from "express";
import {
  login,
  logout,
  register,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getCurrentUser", protectRoute, getCurrentUser);

export default router;
