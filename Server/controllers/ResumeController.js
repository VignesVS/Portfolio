import Resume from "../models/Resume.js";
import { cloudinary } from "../config/cloudinary.js";

// Upload or replace resume
export const uploadResume = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Find if any resume already exists
    const existing = await Resume.findOne();

    // If an old resume exists → delete it from Cloudinary
    if (existing && existing.public_id) {
      await cloudinary.uploader.destroy(existing.public_id, { resource_type: "raw" });
      await Resume.findByIdAndDelete(existing._id);
    }

    // Save new resume info in DB
    const newResume = new Resume({
      url: req.file.path,
      public_id: req.file.filename,
    });

    await newResume.save();
    res.status(200).json(newResume);
  } catch (err) {
    console.error("Resume upload error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get resume
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) return res.json({ message: "No resume uploaded" });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
