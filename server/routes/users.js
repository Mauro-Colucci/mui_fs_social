import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addRemoveFriend,
  getUser,
  getUserFriends,
} from "../controllers/user.js";

const router = Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

router.patch("/:userId/:friendId", verifyToken, addRemoveFriend);

export default router;
