import { Request, Response } from "express";
import {
  createNewTransaction,
  getUserTransactions,
  deleteUserTransaction,
  updateUserTransaction,
} from "../services/transaction.service";

// Crear transacción
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

// Obtener transacciones
export async function getTransactions(
  req: Request,
  res: Response
) {
  try {

    const userId = req.user.userId;

    const month = req.query.month
      ? Number(req.query.month)
      : undefined;

    const year = req.query.year
      ? Number(req.query.year)
      : undefined;

    const categoryId = req.query.categoryId
      ? String(req.query.categoryId)
      : undefined;

    const type = req.query.type
      ? String(req.query.type)
      : undefined;

    const page = req.query.page
      ? Number(req.query.page)
      : 1;

    const limit = req.query.limit
      ? Number(req.query.limit)
      : 10;

    const transactions = await getUserTransactions(
      userId,
      {
        month,
        year,
        categoryId,
        type,
      },
      page,
      limit
    );

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

// Borrar transacción
export async function deleteTransaction(
  req: Request,
  res: Response
) {
  try {
    const transactionId = req.params.id as string;
    const userId = req.user.userId;

    await deleteUserTransaction(
      transactionId,
      userId
    );

    return res.status(204).send();

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

// Actualizar una transacción
export async function updateTransaction(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const transactionId = req.params.id;

    const {
      description,
      amount,
      date,
      categoryId,
    } = req.body;

    const userId = req.user.userId;

    const transaction = await updateUserTransaction(
      transactionId,
      description,
      amount,
      new Date(date),
      categoryId,
      userId
    );

    return res.status(200).json(transaction);

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