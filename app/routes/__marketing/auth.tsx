import { ActionArgs, LinksFunction, json } from "@remix-run/node";
import { AuthForm } from "~/components/auth/AuthForm";
import {
  ValidationErrors,
  validateCredentials,
} from "~/data/validation.server";
import styles from "~/styles/auth.css";

export type AuthActionData = {
  errors?: ValidationErrors;
};

export async function action({ request }: ActionArgs) {
  const { searchParams } = new URL(request.url);
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // validate user input
  try {
    validateCredentials({ email, password });
  } catch (error) {
    return json<AuthActionData>(
      { errors: error as ValidationErrors },
      { status: 400 },
    );
  }

  if (authMode === "login") {
    // login logic
  } else {
    // signup logic (create user)
  }
}

export default function AuthPage() {
  return <AuthForm />;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
