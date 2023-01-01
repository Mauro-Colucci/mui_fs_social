import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/register", upload.single("picture"), register);
router.post("/login", login);

export default router;
