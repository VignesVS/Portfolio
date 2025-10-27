import express from "express";
import { getExperiences, addExperience, updateExperience, deleteExperience } from "../controllers/MyworkController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getExperiences);            // Public
router.post("/", protect,addExperience);   // Admin only
router.put("/:id",protect, updateExperience);   // Admin only
router.delete("/:id",protect, deleteExperience); // Admin only

export default router;
