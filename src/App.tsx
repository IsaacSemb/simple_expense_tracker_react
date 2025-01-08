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
  const [filterCategory, setFilterCategory] = useState("full");

  function handleOnSubmitPressed(data: expenseObject) {
    console.log("form submit pressed in form component ");
    console.log(data);

    // add the content to all expenses
    setAllExpenses([...allExpenses, { ...data }]);
    console.log(allExpenses);
  }

  // --------------------

  function handleOnDelete(itemId: string | number) {
    console.log("deleted item", itemId);

    // Update allExpenses and then apply filtering logic based on the updated state
    setAllExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.filter(
        (expense) => expense.itemId !== itemId
      );
      if (filterCategory !== "full") {
        setFilteredExpenses(
          updatedExpenses.filter(
            (expense) => expense.category === filterCategory
          )
        );
      } else {
        setFilteredExpenses(updatedExpenses);
      }
      return updatedExpenses;
    });
  }
  function filterItemsByCategory(category: string) {
    setFilterCategory(category);
    setFiltered(category !== "full");
    setFilteredExpenses(
      allExpenses.filter(
        (expense) => category === "full" || expense.category === category
      )
    );
  }

  // -------------------------------

  // ##################################

  // function filterItemsByCategory(category: string) {
  //   if (category === "full") {
  //     setFiltered(false);
  //     console.log(allExpenses);
  //     setFilterCategory("full");
  //     return;
  //   }
  //   console.log("filter item triggered in table component");
  //   console.log(category);
  //   setFilteredExpenses(
  //     allExpenses.filter((expense) => expense.category === category)
  //   );
  //   console.log(filteredExpenses);
  //   setFiltered(true);
  //   setFilterCategory(category);
  // }

  // function handleOnDelete(itemId: string | number) {
  //   console.log("deleted item", itemId);
  //   setAllExpenses(allExpenses.filter((expense) => expense.itemId !== itemId));
  //   filterItemsByCategory(filterCategory);
  // }

  // ##################################

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
