import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import { ExpensesList } from "~/components/expenses/ExpensesList";
import { getExpenses } from "~/data/expenses.server";

type LoaderData = {
  expenses: Awaited<ReturnType<typeof getExpenses>>;
};

export default function ExpensesLayout() {
  const { expenses } = useLoaderData() as unknown as LoaderData;

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
      </main>
      <main>
        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}

export const loader: LoaderFunction = async () => {
  const expenses = await getExpenses();
  return json<LoaderData>({ expenses });
};
