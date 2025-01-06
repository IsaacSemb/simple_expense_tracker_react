interface tableProps {
  expensesList: [
    {
      description: string;
      amount: number;
      category: string;
    }
  ];
  filterItems: (item:string) => void;
}

function Table({ expensesList, filterItems }: tableProps) {
  return (
    <>
      <h3 className="mt-5">Summary of Expenses</h3>
      <div className="mb-3">
        <label htmlFor="category" className="form-label"></label>
        <select
          onChange={(evt)=>(filterItems(evt.target.value))}
          id="category"
          className="form-select"
          defaultValue="full"
        >
          <option value="full" >
            All
          </option>
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
              <th scope="row">{index+1}</th>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>delete Item</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
