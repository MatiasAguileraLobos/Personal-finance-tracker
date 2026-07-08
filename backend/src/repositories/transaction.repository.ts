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