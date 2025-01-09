import { useState } from "react";
import ProductList from "./ProductList";
function App1() {
    const [category, setCategory] = useState("")
    return (
    <div>
      
      <select onChange={(evt)=>setCategory(evt.target.value)} className='form-select' name="" id="">

        <option value=""></option>
        <option value="food">Food</option>
        <option value="clothes">Clothes</option>
        <option value="bills">Bills</option>
      </select>

      <ProductList category={category} />
    </div>

    
    
  );
}


export default App1;
