import express from 'express';
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//*READ
router.get("/", verifyToken, getFeedPosts, getUserPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

//Update
router.post("/:id/like", verifyToken, likePost);

export default router;