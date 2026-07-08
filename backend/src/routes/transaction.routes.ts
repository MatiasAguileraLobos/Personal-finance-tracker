import { Router } from "express";
import { createTransaction } from "../controllers/transaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", createTransaction);

export default router;