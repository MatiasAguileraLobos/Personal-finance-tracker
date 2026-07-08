import prisma from "../lib/prisma";

export async function findAllCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function findCategoryById(id: string) {
  return prisma.category.findUnique({
    where: {
      id,
    },
  });
}