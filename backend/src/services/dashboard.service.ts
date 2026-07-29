import {
    findBudgetsByMonth,
    findTransactionsByMonth,
} from "../repositories/dashboard.repository";

export async function getDashboardSummary(
    userId: string,
    month: number,
    year: number
) {
    const transactions = await findTransactionsByMonth(
        userId,
        month,
        year
    );

    const budgets = await findBudgetsByMonth(
        userId,
        month,
        year
    );

    let income = 0;
    let expense = 0;

    let highestIncome = 0;
    let highestExpense = 0;

    const transactionCount = transactions.length;

    for (const transaction of transactions) {
        const amount = Number(transaction.amount);

        if (transaction.category.type === "INCOME") {
            income += amount;

            if (amount > highestIncome) {
                highestIncome = amount;
            }

        } else {
            expense += amount;

            if (amount > highestExpense) {
                highestExpense = amount;
            }
        }
    }

    const recentTransactions = transactions.slice(0, 5);

    const budgetSummary = budgets.map((budget) => {
        const spent = transactions
            .filter(
                (transaction) =>
                    transaction.categoryId === budget.categoryId &&
                    transaction.category.type === "EXPENSE"
            )
            .reduce(
                (total, transaction) =>
                    total + Number(transaction.amount),
                0
            );

        return {
            category: budget.category.name,
            budget: Number(budget.amount),
            spent,
            remaining: Number(budget.amount) - spent,
        };
    });

    const expensesByCategory = budgetSummary.map((budget) => ({
        category: budget.category,
        amount: budget.spent,
    }));

    return {
        income,
        expense,
        balance: income - expense,

        transactionCount,
        highestIncome,
        highestExpense,

        recentTransactions,

        budgets: budgetSummary,

        expensesByCategory,
    };
}