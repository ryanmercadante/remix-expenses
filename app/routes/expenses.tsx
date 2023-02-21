import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import styles from "~/styles/expenses.css";

export default function ExpensesLayout() {
  return (
    <main>
      <h1>ExpensesLayout</h1>
      <Outlet />
    </main>
  );
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
