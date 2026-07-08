import {
  createTransaction,
  findTransactionsByUser,
} from "../repositories/transaction.repository";
import { findCategoryById } from "../repositories/category.repository";

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

  const transaction = await createTransaction(
    description,
    amount,
    date,
    categoryId,
    userId
  );

  return transaction;
}

export async function getUserTransactions(userId: string) {
  return findTransactionsByUser(userId);
}