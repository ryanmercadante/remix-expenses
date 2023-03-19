import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { FaDownload, FaPlus } from "react-icons/fa";
import { ExpensesList } from "~/components/expenses/ExpensesList";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

type LoaderData = {
  expenses: Awaited<ReturnType<typeof getExpenses>>;
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);
  return json<LoaderData>(
    { expenses },
    { headers: { "Cache-Control": "max-age=3" } },
  );
}

export default function ExpensesLayout() {
  const { expenses } = useLoaderData() as unknown as LoaderData;

  const hasExpenses = useMemo(
    () => expenses && expenses.length > 0,
    [expenses.length],
  );

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
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export function headers({ loaderHeaders }: { loaderHeaders: Headers }) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"),
  };
}
