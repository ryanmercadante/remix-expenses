import { json, type LoaderArgs } from "@remix-run/node";
import {
  CatchBoundaryComponent,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import { Chart } from "~/components/expenses/Chart";
import { ExpenseStatistics } from "~/components/expenses/ExpenseStatistics";
import { Error } from "~/components/util/Error";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

type LoaderError = {
  message: string;
};

type LoaderData = {
  expenses: Awaited<ReturnType<typeof getExpenses>>;
};

export async function loader({ request }: LoaderArgs) {
  await requireUserSession(request);
  const expenses = await getExpenses();
  if (!expenses || expenses.length === 0) {
    throw json<LoaderError>(
      { message: "Could not load expenses for the requested analysis." },
      { status: 404, statusText: "Expenses not found" },
    );
  }
  return json<LoaderData>({ expenses });
}

export default function ExpenseAnalysisPage() {
  const { expenses } = useLoaderData() as unknown as LoaderData;

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caughtResponse = useCatch();

  return (
    <main>
      <Error title={caughtResponse.statusText}>
        <p>
          {caughtResponse.data?.message ||
            "Something went wrong - could not load expenses."}
        </p>
      </Error>
    </main>
  );
};
