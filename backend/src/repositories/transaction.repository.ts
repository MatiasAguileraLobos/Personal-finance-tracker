import prisma from "../lib/prisma";

export async function createTransaction(
  description: string,
  amount: number,
  date: Date,
  categoryId: string,
  userId: string
) {
  return prisma.transaction.create({
    data: {
      description,
      amount,
      date,
      categoryId,
      userId,
    },
  });
}

export async function findTransactionsByUser(userId: string) {
  return prisma.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      category: true,
    },
  });
}

export async function findTransactionById(id: string) {
  return prisma.transaction.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteTransaction(id: string) {
  return prisma.transaction.delete({
    where: {
      id,
    },
  });
}

// Actualizar una transacción
export async function updateTransaction(
  id: string,
  description: string,
  amount: number,
  date: Date,
  categoryId: string
) {
  return prisma.transaction.update({
    where: {
      id,
    },
    data: {
      description,
      amount,
      date,
      categoryId,
    },
    include: {
      category: true,
    },
  });
}