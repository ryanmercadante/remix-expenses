import type { Expense } from "@prisma/client";
import { json, LoaderArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ExpenseForm } from "~/components/expenses/ExpenseForm";
import { Modal } from "~/components/util/Modal";
import { getExpense } from "~/data/expenses.server";

export type ExpenseLoaderData = {
  expense: Expense;
};

export async function loader({ params }: LoaderArgs) {
  if (!params.id) {
    throw new Response("Id not found", { status: 404 });
  }
  const expense = await getExpense(params.id);
  if (!expense) {
    throw new Response("Expense not found", { status: 404 });
  }
  return json<ExpenseLoaderData>({ expense });
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
