import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  
  content: { type: String, required: true },        // 300-word about text
  image: { type: String },                          // URL of the uploaded image
}, { timestamps: true });

export default mongoose.model("About", aboutSchema);
