import express from "express";
import { upload } from "../config/cloudinary.js";
import { uploadResume, getResume } from "../controllers/ResumeController.js";

const router = express.Router();

// Upload resume file (PDF, DOCX, etc.)
router.post("/", upload.single("file"), uploadResume);
router.get("/", getResume);

export default router;
