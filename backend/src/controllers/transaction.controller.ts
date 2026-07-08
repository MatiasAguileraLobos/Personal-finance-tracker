import { Request, Response } from "express";
import {
  createNewTransaction,
  getUserTransactions,
} from "../services/transaction.service";

export async function createTransaction(
  req: Request,
  res: Response
) {
  try {
    const {
      description,
      amount,
      date,
      categoryId,
    } = req.body;

    const userId = req.user.userId;

    const transaction = await createNewTransaction(
      description,
      amount,
      new Date(date),
      categoryId,
      userId
    );

    return res.status(201).json(transaction);

  } catch (error) {

    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getTransactions(
  req: Request,
  res: Response
) {
  try {

    const userId = req.user.userId;

    const transactions = await getUserTransactions(userId);

    return res.json(transactions);

  } catch (error) {

    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}