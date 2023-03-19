import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ExpenseForm } from "~/components/expenses/ExpenseForm";
import { Modal } from "~/components/util/Modal";
import { deleteExpense, updatedExpense } from "~/data/expenses.server";
import {
  validateExpenseInput,
  ValidationErrors,
} from "~/data/validation.server";
import { ExpenseFormActionData } from "./add";
import { Expense } from "@prisma/client";

type DeleteAction = {
  expenseId: string;
};

async function handlePostOrPatch(expenseId: string, request: Request) {
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

  await updatedExpense(expenseId, {
    title,
    amount: Number(amount),
    date: new Date(date),
  });
}

export async function action({ params, request }: ActionArgs) {
  if (!params.id) {
    throw new Response("Id not found", { status: 404 });
  }

  switch (request.method) {
    case "POST":
      await handlePostOrPatch(params.id, request);
      break;
    case "PATCH":
      await handlePostOrPatch(params.id, request);
      break;
    case "DELETE":
      await deleteExpense(params.id);
      return json<DeleteAction>({ expenseId: params.id });
    default:
      console.log("How did you get here?!");
  }

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

export const meta: MetaFunction = ({ params, parentsData }) => {
  const expense: Expense | undefined = parentsData[
    "routes/__app/expenses"
  ]?.expenses?.find((e: Expense) => e.id === params.id);

  return {
    title: `Expense - ${expense?.title}` || "Expense not found",
    description: "Update expense.",
  };
};
