// import categories from "../categories"


interface ExpenseFilterProps{
    onSelectCategory: (category:string)=> void
}

function ExpenseFilter({onSelectCategory}:ExpenseFilterProps) {
  return (
    <select onChange={(event)=>onSelectCategory(event.target.value)} className="form-select">
        <option value="">All Categories</option>
        <option value="Groceries">Groceries</option>
        <option value="Utitlies">Utilities</option>
        <option value="Entertainment">Entertainment</option>
    </select>
  )
}

export default ExpenseFilter