import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

import CartElements from "./CartElements";
import CartTotal from "./CartTotal";
import Navbar from "../Navbar/Navbar";

import "./CartContent.css"


const CartContent = () => {
  const { cart } = useContext(dataContext);

  return (
    <div>
      <Navbar />
      {cart.length > 0 ? (
        <div className="cartContainer">
          <CartElements />
          <CartTotal />
        </div>
      ) : (
        <h2 className="cartMessageEmpty"> Tu carrito está vacío! </h2>
      )}
    </div>
  );
}

export default CartContent;

