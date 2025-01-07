import singleExpenseObject from "../interfaces/singleExpenseObject"


interface ExpenseTableProps{
  expensesList: singleExpenseObject[]
  onItemDelete: (expenseId:number)=>void
}


function ExpenseTable({expensesList, onItemDelete}:ExpenseTableProps) {
  if (expensesList.length===0) return <h1 className="text-center">No Available Expenses</h1>

  return (
    <>
    
    <table className="table table-bordered">
    <thead>
      <tr>
        <th>Description</th>
        <th>Amount</th>
        <th>Category</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        expensesList.map(
          (expensesListObject)=>
          <tr>
            <td>{expensesListObject.description}</td>
            <td>{expensesListObject.amount}</td>
            <td>{expensesListObject.category}</td>
            <td>
              <button onClick={()=>onItemDelete(expensesListObject.expenseId)} className="btn btn-outline-danger">Delete</button>
            </td>
          </tr>
        )
      }
    </tbody>
    <tfoot>
      <tr>
        <td>Total</td>
        <td>
          {
            expensesList.reduce(
              (accumulator, expensesListObject)=> expensesListObject.amount+accumulator,0
            ).toFixed(2)
          }
        </td>
        <td></td>
        <td></td>
      </tr>
    </tfoot>
    </table>
    </>
  )
}

export default ExpenseTable