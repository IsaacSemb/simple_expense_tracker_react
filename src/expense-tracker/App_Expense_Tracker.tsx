import { useState } from "react";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";

function App_Expense_Tracker() {
  const [allExpenses, setAllExpenses] = useState([
    { expenseId: 1, description: "posho", amount: 5, category: "Groceries" },
    { expenseId: 2, description: "beans", amount: 2, category: "Groceries" },
    { expenseId: 3, description: "movie", amount: 7, category: "Entertainment" },
    { expenseId: 4, description: "dstv", amount: 8, category: "Entertainment" },
    { expenseId: 5, description: "umeme", amount: 22, category: "Utitlies" },
    { expenseId: 6, description: "water", amount: 7, category: "Utitlies" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>();

  const visibleExpenses = selectedCategory
    ? allExpenses.filter(
        (expensesListObject) => expensesListObject.category === selectedCategory
      )
    : allExpenses;


  return (
    <>
      <ExpenseForm onSubmitPressed={
        (expense)=>setAllExpenses([...allExpenses, { ...expense, expenseId: allExpenses.length+1  }])} />

      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>

      <ExpenseTable
        expensesList={visibleExpenses}
        onItemDelete={(expenseId) =>
          setAllExpenses(
            allExpenses.filter(
              (expensesListObject) => expensesListObject.expenseId !== expenseId
            )
          )
        }
      />
    </>
  );
}
export default App_Expense_Tracker;
