import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import { Link } from "react-router-dom";

import CartElements from "./CartElements";
import CartTotal from "./CartTotal";
import Navbar from "../Navbar/Navbar";

import stylesy from "./CartContent.module.css"
import { Button } from 'primereact/button';


const CartContent = () => {
  const { cart } = useContext(dataContext);

  return (
    <div>
      <Navbar />
      {cart.length > 0 ? (
        <div className={stylesy["cartContainer"]}>
          <CartElements />
          <CartTotal />
          <Link to={"/BuyForm"} title="Concretar Compra">
            <Button label="Confirmar Compra" className={stylesy["confirmBtn"]} />
          </Link>
          
             
        </div>
      ) : (
        <h2 className={stylesy["cartMessageEmpty"]}> Tu carrito está vacío! </h2>
      )}
    </div>
  );
}

export default CartContent;
