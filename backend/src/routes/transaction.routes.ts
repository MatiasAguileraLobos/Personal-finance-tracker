import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createTransaction,
         getTransactions
 } from "../controllers/transaction.controller";

const router = Router();

router.use(authMiddleware);

console.log(createTransaction);
console.log(getTransactions);

router.post("/", createTransaction);
router.get("/", getTransactions);

export default router;