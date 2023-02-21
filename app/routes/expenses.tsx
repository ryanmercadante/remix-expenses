import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { ExpensesList } from "~/components/expenses/ExpensesList";

import styles from "~/styles/expenses.css";

export type Expense = {
  id: string;
  title: string;
  amount: number;
  date: string;
};

export const DUMMY_EXPENSES: Array<Expense> = [
  {
    id: "1",
    title: "First Expense",
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Second Expense",
    amount: 16.99,
    date: new Date().toISOString(),
  },
];

export default function ExpensesLayout() {
  return (
    <>
      <Outlet />
      <main>
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
