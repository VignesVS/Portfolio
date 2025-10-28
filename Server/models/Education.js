import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true, trim: true }, // College/School name
    educationLevel: { type: String, required: true, trim: true }, // e.g., Bachelor's, Master's, High School
    fieldOfStudy: { type: String, trim: true }, // e.g., Computer Science
    from: { type: String, trim: true }, // e.g., 2019
    to: { type: String, trim: true }, // e.g., 2023 or "Present"
    location: { type: String, trim: true },
    grade: { type: String, trim: true }, // optional — e.g., "8.7 CGPA", "First Class"
    description: { type: String, trim: true }, // optional — short summary or highlight
  },
  { timestamps: true }
);

export default mongoose.model("Education", educationSchema);
