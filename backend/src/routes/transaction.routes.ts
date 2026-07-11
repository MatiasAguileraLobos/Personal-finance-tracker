import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createTransaction,
         getTransactions,
         deleteTransaction,
         updateTransaction,
 } from "../controllers/transaction.controller";

const router = Router();

router.use(authMiddleware);

console.log(createTransaction);
console.log(getTransactions);

router.post("/", createTransaction);
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);

export default router;