import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ExpenseForm } from "~/components/expenses/ExpenseForm";
import { Modal } from "~/components/util/Modal";
import { createExpense } from "~/data/expenses.server";
import {
  validateExpenseInput,
  ValidationErrors,
} from "~/data/validation.server";

export type AddFormActionData = {
  errors?: ValidationErrors;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const amount = formData.get("amount") as string;
  const date = formData.get("date") as string;

  try {
    validateExpenseInput({ title, amount, date });
  } catch (error) {
    return json<AddFormActionData>(
      { errors: error as ValidationErrors },
      { status: 400 },
    );
  }

  await createExpense({ title, amount: Number(amount), date: new Date(date) });
  return redirect("/expenses");
};

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
