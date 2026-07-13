import { Request, Response } from "express";
import {
  createNewBudget,
  getUserBudgets,
  updateUserBudget,
  deleteUserBudget,
} from "../services/budget.services";

// Crear presupuesto
export async function createBudget(
  req: Request,
  res: Response
) {
  try {
    const {
      amount,
      month,
      year,
      categoryId,
    } = req.body;

    const userId = req.user.userId;

    const budget = await createNewBudget(
      amount,
      month,
      year,
      categoryId,
      userId
    );

    return res.status(201).json(budget);

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

// Obtener presupuestos
export async function getBudgets(
  req: Request,
  res: Response
) {
  try {

    const userId = req.user.userId;

    const budgets = await getUserBudgets(userId);

    return res.json(budgets);

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

// Actualizar presupuesto
export async function updateBudget(
  req: Request<{ id: string }>,
  res: Response
) {
  try {

    const budgetId = req.params.id;

    const {
      amount,
      month,
      year,
      categoryId,
    } = req.body;

    const userId = req.user.userId;

    const budget = await updateUserBudget(
      budgetId,
      amount,
      month,
      year,
      categoryId,
      userId
    );

    return res.status(200).json(budget);

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

// Eliminar presupuesto
export async function deleteBudget(
  req: Request<{ id: string }>,
  res: Response
) {
  try {

    const budgetId = req.params.id;
    const userId = req.user.userId;

    await deleteUserBudget(
      budgetId,
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