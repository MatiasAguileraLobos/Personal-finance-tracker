import { Request, Response } from "express";
import { getDashboardSummary } from "../services/dashboard.service";

export async function getDashboard(req: Request, res: Response) {
    try {
        const userId = req.user.userId;

        const currentDate = new Date();

        const month = req.query.month
            ? Number(req.query.month)
            : currentDate.getMonth() + 1;

        const year = req.query.year
            ? Number(req.query.year)
            : currentDate.getFullYear();

        const summary = await getDashboardSummary(
            userId,
            month,
            year
        );

        res.status(200).json(summary);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error retrieving dashboard",
        });
    }
}