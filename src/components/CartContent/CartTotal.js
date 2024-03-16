import { useContext } from "react";
import { dataContext } from "../Context/DataContext";


const CartTotal = () => {
    const { cart } = useContext(dataContext);

    const total = cart.reduce((acc, elem) => acc + elem.price * elem.quanty, 0);

  return (
    <div className="cartTotal">
        <h3>Total a Pagar:&nbsp;&nbsp;&nbsp;&nbsp;${total},00 </h3>
    </div>
  ) 
}

export default CartTotal