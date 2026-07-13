import {
  createBudget,
  findBudgetsByUser,
  findBudgetById,
  findBudgetByUserCategoryMonthYear,
  updateBudget,
  deleteBudget,
} from "../repositories/budget.repository";

import { findCategoryById } from "../repositories/category.repository";

// Crear un presupuesto
export async function createNewBudget(
  amount: number,
  month: number,
  year: number,
  categoryId: string,
  userId: string
) {
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }

  if (month < 1 || month > 12) {
    throw new Error("Invalid month");
  }

  if (year < 2000) {
    throw new Error("Invalid year");
  }

  const category = await findCategoryById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  const existingBudget =
    await findBudgetByUserCategoryMonthYear(
      userId,
      categoryId,
      month,
      year
    );

  if (existingBudget) {
    throw new Error("Budget already exists");
  }

  return createBudget(
    amount,
    month,
    year,
    categoryId,
    userId
  );
}

// Obtener presupuestos
export async function getUserBudgets(userId: string) {
  return findBudgetsByUser(userId);
}

// Eliminar presupuesto
export async function deleteUserBudget(
  budgetId: string,
  userId: string
) {
  const budget = await findBudgetById(budgetId);

  if (!budget) {
    throw new Error("Budget not found");
  }

  if (budget.userId !== userId) {
    throw new Error("Unauthorized");
  }

  await deleteBudget(budgetId);
}

// Actualizar presupuesto
export async function updateUserBudget(
  budgetId: string,
  amount: number,
  month: number,
  year: number,
  categoryId: string,
  userId: string
) {
  const budget = await findBudgetById(budgetId);

  if (!budget) {
    throw new Error("Budget not found");
  }

  if (budget.userId !== userId) {
    throw new Error("Unauthorized");
  }

  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }

  if (month < 1 || month > 12) {
    throw new Error("Invalid month");
  }

  if (year < 2000) {
    throw new Error("Invalid year");
  }

  const category = await findCategoryById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  const existingBudget =
    await findBudgetByUserCategoryMonthYear(
      userId,
      categoryId,
      month,
      year
    );

  if (existingBudget && existingBudget.id !== budgetId) {
    throw new Error("Budget already exists");
  }

  return updateBudget(
    budgetId,
    amount,
    month,
    year,
    categoryId
  );
}