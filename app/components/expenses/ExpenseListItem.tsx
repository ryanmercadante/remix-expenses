import { Expense } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

type ExpenseListItemProps = Omit<Expense, "date" | "createdAt" | "updatedAt">;

export function ExpenseListItem({ id, title, amount }: ExpenseListItemProps) {
  function deleteExpenseItemHandler() {
    // tbd
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        {/* <button onClick={deleteExpenseItemHandler}>Delete</button> */}
        <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}
