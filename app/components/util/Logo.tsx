import { Link } from "@remix-run/react";

export function Logo() {
  return (
    <h1 id="logo">
      <Link to="/">RemixExpenses</Link>
    </h1>
  );
}
