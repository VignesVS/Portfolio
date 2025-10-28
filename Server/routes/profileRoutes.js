import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary, upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

// Multer + Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio",        // folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"]
  },
});

const parser = multer({ storage });

// Routes
router.get("/", getProfile);
router.put("/", protect,upload.single("profileImage"), updateProfile);


export default router;
