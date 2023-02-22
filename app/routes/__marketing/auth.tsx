import type { LinksFunction } from "@remix-run/node";
import { AuthForm } from "~/components/auth/AuthForm";
import styles from "~/styles/auth.css";

export default function AuthPage() {
  return <AuthForm />;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
