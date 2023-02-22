import { Chart } from "~/components/expenses/Chart";
import { ExpenseStatistics } from "~/components/expenses/ExpenseStatistics";
import { DUMMY_EXPENSES } from "./expenses";

export default function ExpenseAnalysisPage() {
  return (
    <main>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
    </main>
  );
}
