import type { Expense } from "@prisma/client";
import { prisma } from "./db.server";

type CreateExpenseData = Pick<Expense, "title" | "amount" | "date">;

export async function createExpense(
  userId: string,
  { amount, date, title }: CreateExpenseData,
) {
  try {
    const expense = await prisma.expense.create({
      data: { amount, date, title, User: { connect: { id: userId } } },
    });
    return expense;
  } catch (error) {
    throw new Error(`Failed to add expense`);
  }
}

export async function getExpenses(userId: string) {
  if (!userId) {
    throw new Error(`Failed to get expenses`);
  }

  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    return expenses;
  } catch (error) {
    throw new Error(`Failed to get expenses`);
  }
}

export async function getExpense(id: string) {
  try {
    const expense = await prisma.expense.findUnique({ where: { id } });
    return expense;
  } catch (error) {
    throw new Error(`Failed to get expense with id: ${id}`);
  }
}

export async function updatedExpense(
  id: string,
  { title, amount, date }: Pick<Expense, "title" | "amount" | "date">,
) {
  try {
    const expense = await prisma.expense.update({
      where: { id },
      data: { title, amount, date },
    });
    return expense;
  } catch (error) {
    throw new Error(`Failed to updated expense with id: ${id}`);
  }
}

export async function deleteExpense(id: string) {
  try {
    await prisma.expense.delete({ where: { id } });
  } catch (error) {
    throw new Error(`Failed to delete expense with id: ${id}`);
  }
}
