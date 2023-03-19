import type {
  ErrorBoundaryComponent,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  CatchBoundaryComponent,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import sharedStyles from "~/styles/shared.css";
import { Error } from "./components/util/Error";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Expenses",
  viewport: "width=device-width,initial-scale=1",
});

type DocumentProps = {
  title?: string;
  children?: JSX.Element;
};

function Document({ title, children }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: sharedStyles },
];

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caughtResponse = useCatch();

  return (
    <Document title={caughtResponse.statusText}>
      <main>
        <Error title={caughtResponse.statusText}>
          <>
            <p>
              {caughtResponse.data?.message ||
                "Something went wrong. Please try again later."}
            </p>
            <p>
              Back to <Link to="/">safety</Link>
            </p>
          </>
        </Error>
      </main>
    </Document>
  );
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <Document title="An error occured.">
      <main>
        <Error title="An error occured.">
          <>
            <p>
              {error.message || "Something went wrong. Please try again later."}
            </p>
            <p>
              Back to <Link to="/">safety</Link>
            </p>
          </>
        </Error>
      </main>
    </Document>
  );
};
