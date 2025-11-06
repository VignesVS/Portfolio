import express from "express";
import { sendMessage } from "../controllers/messageController.js";

const router = express.Router();

// POST: send contact message via email
router.post("/", sendMessage);

export default router;
