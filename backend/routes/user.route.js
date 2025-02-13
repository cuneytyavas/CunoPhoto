import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getAllUsers);
router.get("/:username", getUser);
router.patch("/update/:username", protectRoute, updateUser);
router.delete("/delete/:username", protectRoute, deleteUser);

export default router;
