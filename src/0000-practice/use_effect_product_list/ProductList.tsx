import { useEffect, useState } from "react";

function ProductList({category}:{category:string}) {
  const [products] = useState<string[]>([]);

  useEffect(() => {
    console.log("fetching products in", category);

    return ()=>{
      console.log("cleaning up and disconnecting stuff");
      
    }
  },[category]);

  return <div>
    {products.map(
        (products)=><h3>{products}</h3>
    )}
  </div>;
}

export default ProductList;
