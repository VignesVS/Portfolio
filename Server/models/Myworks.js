import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true, trim: true },
  designation: { type: String, required: true, trim: true },
  from: { type: String, required: true, trim: true },
  to: { type: String, required: true, trim: true },
  description: { type: String, default: "", trim: true },
  location: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ["Remote", "Onsite", "Hybrid"],
    required: true,
    trim: true,
  },
  logo: { type: String, trim: true }, // optional
});

export default mongoose.model("Experience", experienceSchema);
