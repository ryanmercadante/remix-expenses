import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ExpenseForm } from "~/components/expenses/ExpenseForm";
import { Modal } from "~/components/util/Modal";
import { createExpense } from "~/data/expenses.server";

type ActionData = {
  errors?: {
    title?: string;
    amount?: string;
    date?: string;
  };
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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const amount = formData.get("amount");
  const date = formData.get("date");

  if (typeof title !== "string" || title.length < 3) {
    return json<ActionData>(
      { errors: { title: "Title must be at least 3 characters" } },
      { status: 400 },
    );
  }
  if (isNaN(Number(amount))) {
    return json<ActionData>(
      { errors: { amount: "Amount must be a number" } },
      { status: 400 },
    );
  }
  if (typeof date !== "string" || isNaN(new Date(date).getTime())) {
    return json<ActionData>(
      { errors: { date: "Invalid date" } },
      { status: 400 },
    );
  }

  await createExpense({ title, amount: Number(amount), date: new Date(date) });
  return redirect("/expenses");
};
