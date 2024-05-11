import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

import CartItemCounter from "./CartItemCounter";

import stylesy from "./CartContent.module.css"

function CartElements() {
  const { cart, setCart } = useContext(dataContext);

  const deleteProduct = (id) => {
    const foundId = cart.find((elem) => elem.id === id);

    const newCart = cart.filter((elem) => {
      return elem !== foundId;
    });

    setCart(newCart);
    
  };

  return cart.map((product) => {
    return (
      <div className={stylesy["cartContent"]} key={product.id}>
        <img src={product.img} alt="productCard" title="Imagen del producto" />
        <h3 className={stylesy["name"]} title="Nombre del producto">{product.name}</h3>
        <h4 className={stylesy["price"]} title="Precio del producto en Pesos Argentinos">${product.price * product.quanty},00</h4>
        <CartItemCounter product={product} />
        <h3 className={stylesy["cartDeleteButton"]} title="Eliminar del Carrito" onClick={() => deleteProduct(product.id)}>
          ❌
          </h3>
      </div>
    );
  });
};

export default CartElements