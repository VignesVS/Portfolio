import express from "express";
import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js";
//import { verifyAdminToken } from "../middleware/adminAuth.js"; // same as your other protected routes

const router = express.Router();

router.get("/", getEducation);
router.post("/",  addEducation);
router.put("/:id",  updateEducation);
router.delete("/:id",  deleteEducation);

export default router;
