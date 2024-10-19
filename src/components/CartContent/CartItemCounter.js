import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

import stylesy from "./CartContent.module.css"

const CartItemCounter = ({ inCartProduct }) => {
  const { cart, setCart, buyProducts } = useContext(dataContext);

  const productQuantity = inCartProduct?.quanty ?? 1;

  const decrease = () => {
    const repeatedProduct = cart.find((item) => item.id === inCartProduct.id);

    repeatedProduct.quanty !== 1 && 
    setCart(cart.map((item) => (item.id === inCartProduct.id ? {...inCartProduct, quanty:
    repeatedProduct.quanty - 1} : item)));
  };

  const deleteProduct = (id) => {
    const foundId = cart.find((elem) => elem.id === id);
    const newCart = cart.filter((elem) => {
      return elem !== foundId;
    });
    setCart(newCart);
  };

  return (
    <div className={stylesy["quantyCounter"]}>
      {productQuantity !== 1 ? 
      <button className={stylesy['counterButton']} title="Restar una unidad" onClick={decrease}>-</button> :
      <button className={stylesy["deleteButton"]} title="Eliminar del Carrito" onClick={() => deleteProduct(inCartProduct.id)}>
      ❌
      </button>
      }

        <p className={stylesy["quanty"]} title="Cantidad de unidades del producto"> {productQuantity}u</p>
        <button className={stylesy['counterButton']} title="Sumar una unidad" onClick={() => buyProducts(inCartProduct)}>+</button>
    </div>
  )
}

export default CartItemCounter