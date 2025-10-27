import express from "express";
import { getAbout, updateAbout } from "../controllers/aboutController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js"; // your multer + Cloudinary setup

const router = express.Router();

// Public route
router.get("/", getAbout);

// Admin-only route with file upload
router.put("/", protect,upload.single("image"), updateAbout);

export default router;
