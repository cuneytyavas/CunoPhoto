import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      const userId = decoded.userId;
      req.userId = userId;
      next();
    } else {
      res.status(401).json({
        message: "Not authorized",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};
export default protectRoute;
