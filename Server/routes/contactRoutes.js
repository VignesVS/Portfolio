import express from "express";
import { getContact, updateContact } from "../controllers/contactController.js";

const router = express.Router();

// ✅ Only these two routes are needed
router.get("/", getContact);
router.put("/", updateContact);

export default router;
