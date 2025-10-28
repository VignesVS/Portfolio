import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = "image";
    let allowedFormats = ["jpg", "png", "jpeg", "webp"];

    // If it's a PDF (resume), handle as raw
    if (file.mimetype === "application/pdf") {
      resourceType = "raw";
      allowedFormats = ["pdf"];
    }

    return {
      folder: "portfolio_uploads",
      resource_type: resourceType,
      allowed_formats: allowedFormats,
    };
  },
});




const upload = multer({ storage });

export { cloudinary, upload };
