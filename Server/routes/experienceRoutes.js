import express from "express";
import {
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/MyworkController.js";
import { protect } from "../middleware/authMiddleware.js"; // 👈 this line

const router = express.Router();

// routes
router.get("/", getExperiences);
router.post("/", protect, addExperience);     // 👈 protected
router.put("/:id",protect, updateExperience); // 👈 protected
router.delete("/:id",protect, deleteExperience); // 👈 protected

export default router;
