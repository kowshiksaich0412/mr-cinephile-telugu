import express from "express";
import { addComment, getComments } from "../controllers/commentController.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.get("/:postId", asyncHandler(getComments));
router.post("/:postId", asyncHandler(addComment));

export default router;
