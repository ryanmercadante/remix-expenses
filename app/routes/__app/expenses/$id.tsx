import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ExpenseForm } from "~/components/expenses/ExpenseForm";
import { Modal } from "~/components/util/Modal";
import { updatedExpense } from "~/data/expenses.server";
import {
  validateExpenseInput,
  ValidationErrors,
} from "~/data/validation.server";
import { ExpenseFormActionData } from "./add";

export async function action({ params, request }: ActionArgs) {
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

  if (!params.id) {
    throw new Response("Id not found", { status: 404 });
  }

  await updatedExpense(params.id, {
    title,
    amount: Number(amount),
    date: new Date(date),
  });
  return redirect("/expenses");
}

export default function UpdateExpensesPage() {
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
