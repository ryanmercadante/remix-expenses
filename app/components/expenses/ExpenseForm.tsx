import type { Expense } from "@prisma/client";
import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";
import type { ExpenseFormActionData } from "~/routes/__app/expenses/add";

export function ExpenseForm() {
  const validationErrors = useActionData() as ExpenseFormActionData;
  const params = useParams();
  const matches = useMatches();
  const expense: Expense | Pick<Expense, "title" | "amount" | "date"> = matches
    .find((match) => match.id === "routes/__app/expenses")
    ?.data?.expenses.find((e: Expense) => e.id === params.id) || {
    title: "",
    amount: "",
    date: "",
  };
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={expense.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={expense.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              expense.date ? expense.date.toString().slice(0, 10) : ""
            }
          />
        </p>
      </div>
      {validationErrors?.errors && (
        <ul>
          {Object.values(validationErrors.errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}
