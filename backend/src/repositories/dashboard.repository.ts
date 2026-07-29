import prisma from "../lib/prisma";

export async function findTransactionsByMonth(
    userId: string,
    month: number,
    year: number
) {
    return prisma.transaction.findMany({
        where: {
            userId,
            date: {
                gte: new Date(year, month - 1, 1),
                lt: new Date(year, month, 1),
            },
        },
        include: {
            category: true,
        },
        orderBy: {
            date: "desc",
        },
    });
}

export async function findBudgetsByMonth(
    userId: string,
    month: number,
    year: number
) {
    return prisma.budget.findMany({
        where: {
            userId,
            month,
            year,
        },
        include: {
            category: true,
        },
        orderBy: {
            category: {
                name: "asc",
            },
        },
    });
}