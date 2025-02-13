import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import connectToDB from "./customFunctions/connectToDB.js";
import cookieParser from "cookie-parser";
import photoRoute from "./routes/photo.route.js";
import userRoute from "./routes/user.route.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;

//MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

//ROUTES
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/photo", photoRoute);
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});
