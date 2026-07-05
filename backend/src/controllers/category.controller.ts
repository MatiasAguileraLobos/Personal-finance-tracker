import { Request, Response } from "express";
import { getAllCategories } from "../services/category.service";

export async function getCategories(
  req: Request,
  res: Response
) {
  try {
    const categories = await getAllCategories();

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}