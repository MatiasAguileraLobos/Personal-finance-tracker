import prisma from "../lib/prisma";

// Crear un presupuesto
export async function createBudget(
  amount: number,
  month: number,
  year: number,
  categoryId: string,
  userId: string
) {
  return prisma.budget.create({
    data: {
      amount,
      month,
      year,
      categoryId,
      userId,
    },
    include: {
      category: true,
    },
  });
}

// Obtener todos los presupuestos de un usuario
export async function findBudgetsByUser(userId: string) {
  return prisma.budget.findMany({
    where: {
      userId,
    },
    orderBy: [
      {
        year: "desc",
      },
      {
        month: "desc",
      },
    ],
    include: {
      category: true,
    },
  });
}

// Buscar un presupuesto por ID
export async function findBudgetById(id: string) {
  return prisma.budget.findUnique({
    where: {
      id,
    },
  });
}

// Buscar un presupuesto por usuario, categoría, mes y año
export async function findBudgetByUserCategoryMonthYear(
  userId: string,
  categoryId: string,
  month: number,
  year: number
) {
  return prisma.budget.findFirst({
    where: {
      userId,
      categoryId,
      month,
      year,
    },
  });
}

// Actualizar un presupuesto
export async function updateBudget(
  id: string,
  amount: number,
  month: number,
  year: number,
  categoryId: string
) {
  return prisma.budget.update({
    where: {
      id,
    },
    data: {
      amount,
      month,
      year,
      categoryId,
    },
    include: {
      category: true,
    },
  });
}

// Eliminar un presupuesto
export async function deleteBudget(id: string) {
  return prisma.budget.delete({
    where: {
      id,
    },
  });
}