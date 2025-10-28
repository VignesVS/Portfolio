import express from "express";
import { getSkills, addSkill, updateSkill, deleteSkill } from "../controllers/skillController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js"; // multer + Cloudinary

const router = express.Router();

// Public route
router.get("/", getSkills);

// Admin routes
router.post("/", protect,upload.single("logo"), addSkill);
router.put("/:id",protect, upload.single("logo"), updateSkill);
router.delete("/:id",protect, deleteSkill);

export default router;
