import type { Expense } from "~/routes/__app/expenses";
import { ExpenseListItem } from "./ExpenseListItem";

type ExpensesListProps = {
  expenses: Array<Expense>;
};

export function ExpensesList({ expenses }: ExpensesListProps) {
  return (
    <ol id="expenses-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  );
}
