import type { Expense } from "@prisma/client";
import { prisma } from "./db.server";

export async function createExpense({
  title,
  amount,
  date,
}: Pick<Expense, "title" | "amount" | "date">) {
  try {
    return prisma.expense.create({ data: { title, amount, date } });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpenses() {
  try {
    return prisma.expense.findMany({ orderBy: { date: "desc" } });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
