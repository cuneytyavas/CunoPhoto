import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res, user) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
