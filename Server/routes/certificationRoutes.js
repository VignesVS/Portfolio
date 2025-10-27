import express from "express";
import {
  getCertifications,
  addCertification,
  updateCertification,
  deleteCertification
} from "../controllers/certificationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js"; // multer + Cloudinary

const router = express.Router();

// Public route
router.get("/", getCertifications);

// Admin routes
router.post("/", upload.single("image"), addCertification);
router.put("/:id",protect, upload.single("image"), updateCertification);
router.delete("/:id",protect, deleteCertification);

export default router;
