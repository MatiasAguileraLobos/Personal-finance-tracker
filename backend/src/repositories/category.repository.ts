import prisma from "../lib/prisma";

export async function findAllCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}