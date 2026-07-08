import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transaction.routes";

import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);


export default app;