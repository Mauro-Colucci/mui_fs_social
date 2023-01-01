import { Router } from "express";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/", verifyToken, upload.single("picture"), createPost);
router.get("/", verifyToken, getFeedPosts);
router.get(":userId/posts", verifyToken, getUserPosts);
router.patch("/:id/like", verifyToken, likePost);

export default router;
