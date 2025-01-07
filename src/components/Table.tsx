import { expenseObject } from "./interfaces/expenseObject";

interface tableProps {
  expensesList: expenseObject[];
  filterItems: (item: string) => void;
  onDelete: (itemId: number) => void;
}

function Table({ expensesList, filterItems, onDelete }: tableProps) {
  return (
    <>
      <h3 className="mt-5">Summary of Expenses</h3>
      <div className="mb-3">
        <label htmlFor="category" className="form-label"></label>
        <select
          onChange={(evt) => filterItems(evt.target.value)}
          id="category"
          className="form-select"
          defaultValue="full"
        >
          <option value="full">All</option>
          <option value="groceries">Groceries</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option>
          <option value="bills">bills</option>
        </select>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Categories</th>
            <th scope="col">Manage</th>
          </tr>
        </thead>
        <tbody>
          {expensesList.map((expense, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{expense.description}</td>
              <td>£ {expense.amount}</td>
              <td>{expense.category}</td>
              <td className="text-center align-middle">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(expense.itemId)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {" "}
          <tr>
            <th scope="col" colSpan={2} className="text-center">
              Total
            </th>
            <th scope="col" colSpan={3} className="text-center">
              £{" "}
              {expensesList.reduce((accumulator, expense) => {
                return accumulator + expense.amount;
              }, 0)}
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default Table;
