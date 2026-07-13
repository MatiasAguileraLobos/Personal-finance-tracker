import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import transactionRoutes from "./routes/transaction.routes";
import budgetRoutes from "./routes/budget.routes"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("/budgets",budgetRoutes);


export default app;