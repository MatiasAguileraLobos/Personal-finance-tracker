import { findAllCategories } from "../repositories/category.repository";

export async function getAllCategories() {
  return findAllCategories();
}