import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { MainHeader } from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";

import styles from "~/styles/marketing.css";

export function loader({ request }: LoaderArgs) {
  return getUserFromSession(request);
}

export default function MarkingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  );
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export function headers() {
  return {
    "Cache-Control": "max-age=3600",
  };
}
