import { Request, Response } from "express";
import { getAllCategories } from "../services/category.service";

export async function getCategories(
  req: Request,
  res: Response
) {
  try {
    // Solo para comprobar que el middleware funciona
    console.log(req.user);

    const categories = await getAllCategories();

    return res.json(categories);

  } catch (error) {

    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}