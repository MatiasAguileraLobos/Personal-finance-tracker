import {
  createTransaction,
  findTransactionsByUser,
  findTransactionById,
  deleteTransaction,
  updateTransaction,
} from "../repositories/transaction.repository";
import { findCategoryById } from "../repositories/category.repository";

// Crear una nueva transacción
export async function createNewTransaction(
  description: string,
  amount: number,
  date: Date,
  categoryId: string,
  userId: string
) {
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }

  const category = await findCategoryById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  return createTransaction(
    description,
    amount,
    date,
    categoryId,
    userId
  );
}

// Obtener las transacciones por usuario con filtros opcionales
export async function getUserTransactions(
  userId: string,
  filters: {
    month?: number;
    year?: number;
    categoryId?: string;
    type?: string;
  },
  page: number,
  limit: number
) {
  const result = await findTransactionsByUser(
    userId,
    filters,
    page,
    limit
  );

  return {
    page,
    limit,
    total: result.total,
    totalPages: Math.ceil(result.total / limit),
    transactions: result.transactions,
  };
}

// Borrar una transacción
export async function deleteUserTransaction(
  transactionId: string,
  userId: string
) {
  const transaction = await findTransactionById(transactionId);

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  if (transaction.userId !== userId) {
    throw new Error("Unauthorized");
  }

  await deleteTransaction(transactionId);
}

// Actualizar una transacción
export async function updateUserTransaction(
  transactionId: string,
  description: string,
  amount: number,
  date: Date,
  categoryId: string,
  userId: string
) {
  const transaction = await findTransactionById(transactionId);

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  if (transaction.userId !== userId) {
    throw new Error("Unauthorized");
  }

  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }

  const category = await findCategoryById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  return updateTransaction(
    transactionId,
    description,
    amount,
    date,
    categoryId
  );
}