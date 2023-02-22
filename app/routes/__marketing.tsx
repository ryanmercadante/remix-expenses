import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import styles from "~/styles/marketing.css";

export default function MarkingLayout() {
  return <Outlet />;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
