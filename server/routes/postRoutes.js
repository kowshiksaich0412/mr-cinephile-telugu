import express from "express";
import {
  createPost,
  deletePost,
  getPopularPosts,
  getPostBySlug,
  getPosts,
  getTrendingPosts,
  updatePost
} from "../controllers/postController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(getPosts));
router.get("/trending", asyncHandler(getTrendingPosts));
router.get("/popular", asyncHandler(getPopularPosts));
router.get("/:slug", asyncHandler(getPostBySlug));

router.post("/", protect, adminOnly, upload.single("image"), asyncHandler(createPost));
router.put("/:id", protect, adminOnly, upload.single("image"), asyncHandler(updatePost));
router.delete("/:id", protect, adminOnly, asyncHandler(deletePost));

export default router;
