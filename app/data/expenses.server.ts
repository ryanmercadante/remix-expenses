import type { Expense } from "@prisma/client";
import { prisma } from "./db.server";

export async function createExpense({
  title,
  amount,
  date,
}: Pick<Expense, "title" | "amount" | "date" | "createdAt" | "id">) {
  prisma.expense.create({ data: { title, amount, date } });
}
