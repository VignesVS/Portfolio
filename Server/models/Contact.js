import mongoose from "mongoose"; 
const contactSchema = new mongoose.Schema({
   email: { type: String, trim: true }, 
   phone: { type: String, trim: true },
    linkedin: { type: String, trim: true }, 
    github: { type: String, trim: true }, 
    address: { type: String, trim: true }, },
     { timestamps: true });

export default mongoose.model("Contact", contactSchema);
