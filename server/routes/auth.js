import { Router } from "express";
import { register } from "../controllers/auth.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/register", upload.single("picture"), register);

export default router;
