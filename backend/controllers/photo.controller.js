import Photo from "../models/photo.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPhoto = async (req, res) => {
  const { title, description, image } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!title || !description || !image || !user) {
      return res
        .status(400)
        .json({ message: "Please log in and fill all fields" });
    }
    const uploadedResponse = await cloudinary.uploader.upload(image, {
      folder: "photo-app",
    });
    const img = uploadedResponse.secure_url;
    const newPhoto = await Photo.create({
      title,
      description,
      image: img,
      user: user._id,
    });
    user.photos.push(newPhoto._id);
    await user.save();
    res.status(201).json({ message: "Photo created successfully", newPhoto });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const getAllPhotos = async (req, res) => {
  const { search } = req.query;

  try {
    let photos;

    if (search) {
      photos = await Photo.find({
        title: { $regex: search, $options: "i" },
      })
        .sort({ createdAt: -1 })
        .populate({
          path: "user",
          select: "-password",
        });
    } else {
      photos = await Photo.find().sort({ createdAt: -1 }).populate({
        path: "user",
        select: "-password",
      });
    }

    if (photos.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(photos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const singlePhoto = await Photo.findById(id).populate({
      path: "user",
      select: "-password",
    });
    res.status(200).json(singlePhoto);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const deletePhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.userId);
    const isAdmin = user.isAdmin === true;
    const photo = await Photo.findById(id);
    
    if (photo.user.toString() !== user._id.toString() && !isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // https://res.cloudinary.com/ds05ogiti/image/upload/v1731266152/photo-app/ywwwoemwc1334b0jbvmx.jpg
    const public_id = photo.image.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`photo-app/${public_id}`);
    await Photo.findByIdAndDelete(id);
    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const getPhotosByUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const photos = await Photo.find({ user: user._id })
      .populate({
        path: "user",
        select: "-password",
      })
      .sort({
        createdAt: -1,
      });
    if (photos.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(photos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
