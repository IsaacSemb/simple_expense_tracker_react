import { useState } from "react";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseFilter from "./components/ExpenseFilter";
import Form from "./components/Form";
import singleExpenseObject from "./interfaces/singleExpenseObject";

function App_Expense_Tracker() {
  const [allExpenses, setAllExpenses] = useState([
    { expenseId: 1, description: "posho", amount: 5, category: "Groceries" },
    { expenseId: 2, description: "kara", amount: 15, category: "Groceries" },
    { expenseId: 3, description: "kara", amount: 7, category: "Entertainment" },
    { expenseId: 4, description: "kara", amount: 8, category: "Entertainment" },
    { expenseId: 5, description: "kara", amount: 20, category: "Utitlies" },
    { expenseId: 6, description: "kara", amount: 30, category: "Utitlies" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>();

  const visibleExpenses = selectedCategory
    ? allExpenses.filter(
        (expensesListObject) => expensesListObject.category === selectedCategory
      )
    : allExpenses;

  function handleOnSubmitPressed(data: singleExpenseObject) {
    console.log("form submit pressed in form component ");
    console.log(data);

    // add the content to all expenses
    setAllExpenses([...allExpenses, { ...data, expenseId: 1 }]);
    console.log(allExpenses);
  }

  return (
    <>
      <Form onSubmitPressed={handleOnSubmitPressed} />

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
