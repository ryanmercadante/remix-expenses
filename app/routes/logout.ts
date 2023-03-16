import { ActionArgs, json } from "@remix-run/node";
import { destroyUserSession } from "~/data/auth.server";

export function action({ request }: ActionArgs) {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, { status: 405 });
  }

  return destroyUserSession(request);
}
