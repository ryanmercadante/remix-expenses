import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { MainHeader } from "~/components/navigation/MainHeader";

import styles from "~/styles/marketing.css";

export default function MarkingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  );
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
