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

export async function findTransactionsByUser(
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
    const where: any = {
        userId,
    };

    if (filters.month && filters.year) {
        where.date = {
            gte: new Date(filters.year, filters.month - 1, 1),
            lt: new Date(filters.year, filters.month, 1),
        };
    }

    if (filters.categoryId) {
        where.categoryId = filters.categoryId;
    }

    if (filters.type) {
        where.category = {
            type: filters.type,
        };
    }

    const total = await prisma.transaction.count({
        where,
    });

    const transactions = await prisma.transaction.findMany({
        where,
        orderBy: {
            date: "desc",
        },
        include: {
            category: true,
        },
        skip: (page - 1) * limit,
        take: limit,
    });

    return {
        transactions,
        total,
    };
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