import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";

import styles from "~/styles/expenses.css";

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />;
    </>
  );
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
