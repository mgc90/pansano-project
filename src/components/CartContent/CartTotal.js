import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

import stylesy from "./CartContent.module.css"
import { Button } from 'primereact/button';

import useConfirmDialog from "../../hooks/useConfirmDialog";

const CartTotal = () => {
    const { cart, setCart } = useContext(dataContext);
    const { displayConfirmDialog } = useConfirmDialog()

    const total = cart.reduce((acc, elem) => acc + elem.price * elem.quanty, 0);

    const accept = () => {
      setCart([]);
    }
    
    const confirm1 = () => {
      displayConfirmDialog({
          message: 'Desea eliminar el carrito?',
          header: 'Confirmación',
          icon: 'pi pi-exclamation-triangle',
          defaultFocus: 'accept',
          accept: accept,
          acceptLabel: "Si" 
      });
  };
  
    const resetCartbutton = () => {
      return (
      <Button label="Borrar Carrito" onClick={confirm1} 
      className={stylesy["resetCart"]} />
    )
    }
  

  return (
    <div className={stylesy["cartTotal"]}>
        <div> </div>
        <h3 title="Total a pagar en Pesos Argentinos" >Total: ${total},00 </h3>
        {resetCartbutton()}   
    </div>
  ) 
}

export default CartTotal