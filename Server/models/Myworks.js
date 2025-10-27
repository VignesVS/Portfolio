import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  duration: { type: String, trim: true },
  from: { type: String, required: true, trim: true },
  to: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
}, { timestamps: true });

export default mongoose.model("Experience", experienceSchema);
