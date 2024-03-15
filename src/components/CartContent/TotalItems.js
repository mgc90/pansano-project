import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const TotalItems = () => {
    const { cart } = useContext(dataContext);

    const itemsQuanty = cart.reduce((acc, elem) => acc + elem.quanty, 0);
    
  return (
    <div className="cartItemsTotal">{itemsQuanty}</div>
  )
}

export default TotalItems