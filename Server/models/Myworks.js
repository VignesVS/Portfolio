import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  from: {
    type: String,
    required: true,
    trim: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
});

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
