import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

import stylesy from "./CartContent.module.css"


const CartTotal = () => {
    const { cart } = useContext(dataContext);

    const total = cart.reduce((acc, elem) => acc + elem.price * elem.quanty, 0);

  return (
    <div className={stylesy["cartTotal"]}>
        <h3 title="Total a pagar en Pesos Argentinos">Total: ${total},00 </h3>
    </div>
  ) 
}

export default CartTotal