import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export function loader({ params }: LoaderArgs) {
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }
  throw new Response("Not found", { status: 404 });
}
