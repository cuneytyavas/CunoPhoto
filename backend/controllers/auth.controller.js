import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../customFunctions/generateToken.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    // ✅ Email regex kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      const user = await newUser.save();
      generateTokenAndSetCookie(res, user);
      return res.status(201).json({
        Id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    const isPwMatch = await bcrypt.compare(password, user.password);
    if (user && isPwMatch) {
      generateTokenAndSetCookie(res, user);
      return res.status(200).json({
        Id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      });
    } else {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Error Occured while Logging out." });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getCurrentUser controller", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};
