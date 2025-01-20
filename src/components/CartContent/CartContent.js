import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import { Link } from "react-router-dom";

import CartElements from "./CartElements";
import CartTotal from "./CartTotal";
import Navbar from "../Navbar/Navbar";

import stylesy from "./CartContent.module.css"
import { Button } from 'primereact/button';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const CartContent = () => {
  const { cart, setCart } = useContext(dataContext);

  const accept = () => {
    setCart([]);
  }
  
  const confirm1 = () => {
    confirmDialog({
        message: 'Desea eliminar el carrito?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        accept,
        acceptLabel: "Si",
        reject: null
    });
};

  const resetCartbutton = () => {
    return (
    <Button label="Borrar Carrito" onClick={confirm1} 
    className={stylesy["confirmBtn"]} />
  )
  }


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
          {resetCartbutton()}
          <ConfirmDialog />
        </div>
      ) : (
        <h2 className={stylesy["cartMessageEmpty"]}> Tu carrito está vacío! </h2>
      )}
    </div>
  );
}

export default CartContent;
