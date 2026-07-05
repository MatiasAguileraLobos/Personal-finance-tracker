import { PrismaClient, CategoryType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      // Ingresos
      { name: "Salario", type: CategoryType.INCOME },
      { name: "Horas extra", type: CategoryType.INCOME },
      { name: "Bonos", type: CategoryType.INCOME },
      { name: "Freelance", type: CategoryType.INCOME },
      { name: "Inversiones", type: CategoryType.INCOME },
      { name: "Otros ingresos", type: CategoryType.INCOME },

      // Gastos
      { name: "Alimentación", type: CategoryType.EXPENSE },
      { name: "Transporte", type: CategoryType.EXPENSE },
      { name: "Vivienda", type: CategoryType.EXPENSE },
      { name: "Salud", type: CategoryType.EXPENSE },
      { name: "Educación", type: CategoryType.EXPENSE },
      { name: "Entretenimiento", type: CategoryType.EXPENSE },
      { name: "Compras", type: CategoryType.EXPENSE },
      { name: "Servicios", type: CategoryType.EXPENSE },
      { name: "Suscripciones", type: CategoryType.EXPENSE },
      { name: "Otros gastos", type: CategoryType.EXPENSE },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Categorías creadas");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });