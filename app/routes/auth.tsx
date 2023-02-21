import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/auth.css";

export default function AuthPage() {
  return <h1>AuthPage</h1>;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
