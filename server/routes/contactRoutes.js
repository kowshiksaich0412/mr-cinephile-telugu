import express from "express";
import { createContactMessage } from "../controllers/contactController.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();
router.post("/", asyncHandler(createContactMessage));

export default router;
