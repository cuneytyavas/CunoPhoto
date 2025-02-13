import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  const { password, avatar, ...inputs } = req.body;
  try {
    const user = await User.findOne({ username: req.params.username });

    if (req.userId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    let uploadedResponse = null;
    if (avatar) {
      const oldPublic_id = user.avatar.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`photo-app/${oldPublic_id}`);
      uploadedResponse = await cloudinary.uploader.upload(avatar, {
        folder: "photo-app",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          ...inputs,
          ...(password && { password: hashedPassword }),
          ...(avatar &&
            uploadedResponse && { avatar: uploadedResponse.secure_url }),
        },
      },
      { new: true }
    );

    res.status(200).json({
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      avatar: updatedUser.avatar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const reqUser = await User.findById(req.userId);
    const isAdmin = reqUser.isAdmin === true;

    const userToDelete = await User.findOne({ username: req.params.username });
    if (!isAdmin) {
      return res.status(404).json({ message: "Unauthorized" });
    } else {
      const oldPublic_id = userToDelete.avatar.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`photo-app/${oldPublic_id}`);

      await User.findByIdAndDelete(userToDelete._id);
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
