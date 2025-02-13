import express from "express";
import {
  createPhoto,
  getAllPhotos,
  getPhoto,
  deletePhoto,
  getPhotosByUser,
} from "../controllers/photo.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createPhoto);
router.get("/", getAllPhotos);
router.get("/:id", getPhoto);
router.get("/user/:username", getPhotosByUser);
router.delete("/delete/:id", protectRoute, deletePhoto);

export default router;
