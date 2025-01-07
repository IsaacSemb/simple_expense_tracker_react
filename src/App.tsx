import { useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import { expenseObject } from "./components/interfaces/expenseObject";



function App() {
  const [allExpenses, setAllExpenses] = useState<expenseObject[]>([
    {
      itemId: 1,
      description: "posho",
      amount: 5,
      category: "groceries",
    },
    {
      itemId: 2,
      description: "kara",
      amount: 15,
      category: "bills",
    },
    {
      itemId: 3,
      description: "rice",
      amount: 10,
      category: "groceries",
    },
    {
      itemId: 4,
      description: "electricity",
      amount: 50,
      category: "bills",
    },
    {
      itemId: 5,
      description: "water",
      amount: 20,
      category: "utilities",
    },
    {
      itemId: 6,
      description: "movie ticket",
      amount: 12,
      category: "entertainment",
    },
    {
      itemId: 7,
      description: "bus fare",
      amount: 3,
      category: "bills",
    },
  ]);

  const [filteredExpenses, setFilteredExpenses] = useState<expenseObject[]>([]);
  const [filtered, setFiltered] = useState(false);

  function handleOnSubmitPressed(data:expenseObject) {
    console.log("form submit pressed in form component ");
    console.log(data);

    // add the content to all expenses
    setAllExpenses([...allExpenses, { ...data }]);
    console.log(allExpenses);
  }

  function filterItemsByCategory(category: string) {
    if (category === "full") {
      setFiltered(false);
      console.log(allExpenses);
      return;
    }
    console.log("filter item triggered in table component");
    console.log(category);
    setFilteredExpenses(
      allExpenses.filter((expense) => expense.category === category)
    );
    console.log(filteredExpenses);
    setFiltered(true);
  }

  function handleOnDelete(itemIndex: number) {
    console.log("deleted item", itemIndex);
  }

  return (
    <div className="p-2">
      <Form
        expensesList={allExpenses}
        onSubmitPressed={handleOnSubmitPressed}
      />
      <Table
        onDelete={handleOnDelete}
        expensesList={filtered ? filteredExpenses : allExpenses}
        filterItems={filterItemsByCategory}
      />
    </div>
  );
}

export default App;
