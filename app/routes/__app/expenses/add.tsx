import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ExpenseForm } from "~/components/expenses/ExpenseForm";
import { Modal } from "~/components/util/Modal";
import { requireUserSession } from "~/data/auth.server";
import { createExpense } from "~/data/expenses.server";
import {
  validateExpenseInput,
  ValidationErrors,
} from "~/data/validation.server";

export type ExpenseFormActionData = {
  errors?: ValidationErrors;
};

export async function action({ request }: ActionArgs) {
  const userId = await requireUserSession(request);

  const formData = await request.formData();

  const title = formData.get("title") as string;
  const amount = formData.get("amount") as string;
  const date = formData.get("date") as string;

  try {
    validateExpenseInput({ title, amount, date });
  } catch (error) {
    return json<ExpenseFormActionData>(
      { errors: error as ValidationErrors },
      { status: 400 },
    );
  }

  await createExpense(userId, {
    title,
    amount: Number(amount),
    date: new Date(date),
  });
  return redirect("/expenses");
}

export default function AddExpensesPage() {
  const navigate = useNavigate();

  function onClose() {
    navigate("..");
  }

  return (
    <Modal onClose={onClose}>
      <ExpenseForm />
    </Modal>
  );
}
