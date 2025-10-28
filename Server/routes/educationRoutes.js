import express from "express";
import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js";
import { protect } from "../middleware/authMiddleware.js";
//import { verifyAdminToken } from "../middleware/adminAuth.js"; // same as your other protected routes

const router = express.Router();

router.get("/", getEducation);
router.post("/", protect, addEducation);
router.put("/:id",protect,  updateEducation);
router.delete("/:id",protect,  deleteEducation);

export default router;
