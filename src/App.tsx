import { useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
// import { FieldValues } from "react-hook-form";




function App() {
  const [allExpenses, setAllExpenses] = useState<object[]>([
    {
      description: "posho",
      amount: 5,
      category: "groceries",
    },
    {
      description: "kara",
      amount: 15,
      category: "bills",
    },{
      description: "rice",
      amount: 10,
      category: "groceries",
    },
    {
      description: "electricity",
      amount: 50,
      category: "bills",
    },
    {
      description: "water",
      amount: 20,
      category: "utilities",
    },
    {
      description: "movie ticket",
      amount: 12,
      category: "entertainment",
    },
    {
      description: "bus fare",
      amount: 3,
      category: "bills",
    }
    
  ]);

  const [filteredExpenses, setFilteredExpenses] = useState<object[]>([]);
  const [filtered, setFiltered] = useState(false);

  function handleOnSubmitPressed(data) {
    console.log("form submit pressed in form component ");
    console.log(data);

    // add the content to all expenses
    setAllExpenses([...allExpenses, {...data}]);
    console.log(allExpenses);
    
  }

  function filterItemsByCategory(category: string) {
    if (category==='full') {
      setFiltered(false)
      console.log(allExpenses);
      return
    }
    console.log("filter item triggered in table component");
    console.log(category);
    setFilteredExpenses(
      allExpenses.filter((expense) => expense.category === category)
    );
    console.log(filteredExpenses);
    setFiltered(true)
    
    
    
  }

  return (
    <div className="p-2">
      <Form
        expensesList={allExpenses}
        onSubmitPressed={handleOnSubmitPressed}
      />
      <Table expensesList={filtered?filteredExpenses:allExpenses} filterItems={filterItemsByCategory} />
    </div>
  );
}

export default App;
