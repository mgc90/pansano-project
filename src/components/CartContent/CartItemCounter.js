import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

import useToast from '../../hooks/useToast';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

import stylesy from "./CartContent.module.css"

const CartItemCounter = ({ inCartProduct }) => {
  const { cart, setCart, buyProducts, deleteProduct } = useContext(dataContext);
  const { displayToast } = useToast();

  const productQuantity = inCartProduct?.quanty ?? 1;

  const accept = () => {
    deleteProduct(inCartProduct);
    displayToast({ severity: 'info', summary: 'Producto Eliminado!', life: 3000 });
  
  };

  const confirm = (event) => {
    confirmPopup({
        target: event.currentTarget,
        message: 'Eliminar producto del carrito?',
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        acceptLabel: "Si", 
        accept
    });
  };

  const decrease = () => {
    const repeatedProduct = cart.find((item) => item.id === inCartProduct.id);
    repeatedProduct.quanty !== 1 && 
    setCart(cart.map((item) => (item.id === inCartProduct.id ? {...inCartProduct, quanty:
    repeatedProduct.quanty - 1} : item)));
  };

  
  return (
    <div className={stylesy["quantyCounter"]}>
      {productQuantity !== 1 ? 
      <button className={stylesy['counterButton']} title="Restar una unidad" onClick={decrease}>-</button> :
      <button className={stylesy["deleteButton"]} title="Eliminar del Carrito" onClick={confirm}>❌</button>
      }
        <p className={stylesy["quanty"]} title="Cantidad de unidades del producto"> {productQuantity}u</p>
        <button className={stylesy['counterButton']} title="Sumar una unidad" onClick={() => buyProducts(inCartProduct)}>+</button>

        
    </div>
  )
}

export default CartItemCounter