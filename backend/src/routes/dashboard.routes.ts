import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getDashboard } from "../controllers/dashboard.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getDashboard);

export default router;