import type { Expense } from "@prisma/client";
import { prisma } from "./db.server";

export async function createExpense({
  title,
  amount,
  date,
}: Pick<Expense, "title" | "amount" | "date">) {
  try {
    return await prisma.expense.create({ data: { title, amount, date } });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
