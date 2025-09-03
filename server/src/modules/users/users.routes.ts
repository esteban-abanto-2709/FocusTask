import { Router } from "express";
import { getProfile, updateProfile } from "./users.controller";

const router = Router();

// Por ahora sin middleware, después agregaremos authenticateToken
router.get("/profile/:userId", getProfile);
router.put("/profile/:userId", updateProfile);

export default router;