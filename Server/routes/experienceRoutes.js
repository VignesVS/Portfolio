import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/MyworkController.js";

const router = express.Router();

router.get("/", getExperiences);
router.post("/",protect, addExperience);
router.put("/:id",protect, updateExperience);
router.delete("/:id",protect, deleteExperience);

export default router;
