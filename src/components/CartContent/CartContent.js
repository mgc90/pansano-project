import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

import CartElements from "./CartElements";
import CartTotal from "./CartTotal";
import Navbar from "../Navbar/Navbar";

import stylesy from "./CartContent.module.css"


const CartContent = () => {
  const { cart } = useContext(dataContext);

  return (
    <div>
      <Navbar />
      {cart.length > 0 ? (
        <div className={stylesy["cartContainer"]}>
          <CartElements />
          <CartTotal />
        </div>
      ) : (
        <h2 className={stylesy["cartMessageEmpty"]}> Tu carrito está vacío! </h2>
      )}
    </div>
  );
}

export default CartContent;

